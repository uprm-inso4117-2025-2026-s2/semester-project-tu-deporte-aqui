#!/usr/bin/env python3
import sys
import re

DEBUG = False

def debug_print(*args):
    if DEBUG:
        print(*args, file=sys.stderr)

def wrap_asciidoc_formatting_outside_roles(text):
    # Keep common AsciiDoc formatting markers outside role wrappers.
    # This is intentionally conservative and only handles list bullets at the
    # start of a wrapped span.
    text = re.sub(r'(?m)^([ \t]*)\[\.inserted\]#\*#(\s+\S.*)$', r'\1* [.inserted]#\2#', text)
    text = re.sub(r'(?m)^([ \t]*)\[\.removed\]#\*#(\s+\S.*)$', r'\1* [.removed]#\2#', text)
    text = re.sub(r'\[\.inserted\]#(\s*\*\s+)(.*?)#', r'\1[.inserted]#\2#', text)
    text = re.sub(r'\[\.removed\]#(\s*\*\s+)(.*?)#', r'\1[.removed]#\2#', text)
    text = re.sub(r'(?m)^([ \t]*)\[\.inserted\]#(-\s+)(.*?)#', r'\1- [.inserted]#\3#', text)
    text = re.sub(r'(?m)^([ \t]*)\[\.removed\]#(-\s+)(.*?)#', r'\1- [.removed]#\3#', text)
    text = re.sub(r'\[\.inserted\]#(.*?)\[\.inserted\]#(.*?)##', r'[.inserted]#\1\2#', text)
    text = re.sub(r'\[\.inserted\]#(.*?)\[\.removed\]#.*?##', r'[.inserted]#\1#', text)
    text = re.sub(r'\[\.removed\]#(.*?)\[\.inserted\]#(.*?)##', r'[.removed]#\1#', text)
    text = re.sub(r'\[\.removed\]#(.*?)\[\.removed\]#.*?##', r'[.removed]#\1#', text)
    text = re.sub(r'\[\.(inserted|removed)\]#\s+', r'[.\1]#', text)
    text = re.sub(r'\s+#', r'#', text)
    return text

def normalize_bullet_spacing(text):
    lines = text.splitlines()
    normalized = []
    for line in lines:
        stripped = line.lstrip()
        is_bullet = stripped.startswith('- ') or stripped.startswith('* ')
        if is_bullet and normalized:
            prev = normalized[-1]
            prev_stripped = prev.strip()
            prev_is_bullet = prev_stripped.startswith('- ') or prev_stripped.startswith('* ')
            if prev != '' and not prev_is_bullet:
                normalized.append('')
        normalized.append(line)
    return '\n'.join(normalized)

def strip_roles_keep_inserted_drop_removed(text):
    text = re.sub(r'\[\.removed\]#.*?#', '', text)
    text = re.sub(r'\[\.inserted\]#(.*?)#', r'\1', text)
    text = text.replace('[.removed]##', '')
    text = text.replace('[.inserted]##', '')
    return text

def strip_roles_keep_text(text):
    return re.sub(r'\[\.(inserted|removed)\]#(.*?)#', r'\2', text)

def move_double_colons_outside_roles(text):
    """Move :: from inside roles to outside (for definition list items)."""
    # Pattern: [.role]#text::# -> [.role]#text#::
    text = re.sub(r'\[\.(inserted|removed)\]#(.*?)::#+', r'[.\1]#\2#::', text)
    return text

def move_table_pipes_outside_roles(text):
    def split_role_pipes(match):
        role = match.group(1)
        content = match.group(2)
        parts = [part.strip() for part in content.split('|')]
        wrapped = [f'[.{role}]#{part}#' for part in parts if part != '']
        return '|'.join(wrapped)

    def trim_table_role_spaces(line):
        return re.sub(r'\[\.(inserted|removed)\]#(.*?)#',
                      lambda m: f"[.{m.group(1)}]#{m.group(2).strip()}#",
                      line)

    def normalize_table_line(line):
        line = re.sub(r'\[\.inserted\]#\|(.*?)#', r'|[.inserted]#\1#', line)
        line = re.sub(r'\[\.removed\]#\|(.*?)#', r'|[.removed]#\1#', line)
        line = re.sub(r'\[\.inserted\]#(.*?)\|#', r'[.inserted]#\1#|', line)
        line = re.sub(r'\[\.removed\]#(.*?)\|#', r'[.removed]#\1#|', line)
        line = re.sub(r'\[\.(inserted|removed)\]#(.*?)#', split_role_pipes, line)
        return trim_table_role_spaces(line)

    lines = text.splitlines()
    normalized = []
    for line in lines:
        if '|' in line:
            normalized.append(normalize_table_line(line))
        else:
            normalized.append(line)
    return '\n'.join(normalized)

def main():
    if len(sys.argv) > 1:
        with open(sys.argv[1], 'r', encoding='utf-8') as f:
            content = f.read()
    else:
        content = sys.stdin.read()

    # Convert insertions and deletions conservatively - don't try to analyze
    # AsciiDoc structure. Keep content intact and simply replace markers.
    content = re.sub(r'__INS_START__(.*?)__INS_END__', r'[.inserted]#\1#', content, flags=re.DOTALL)
    content = re.sub(r'__DEL_START__(.*?)__DEL_END__', r'[.removed]#\1#', content, flags=re.DOTALL)
    content = wrap_asciidoc_formatting_outside_roles(content)
    content = move_double_colons_outside_roles(content)
    content = move_table_pipes_outside_roles(content)
    content = normalize_bullet_spacing(content)

    # Post-process by line: if a line looks like a heading (starts with '=')
    # after stripping role wrappers, remove any [.removed]#...# blocks from
    # that line (drop the removed text entirely) to avoid corrupting heading
    # delimiters or introducing stray fragments.
    out_lines = []
    in_code_block = False
    in_code_block_end_marker = False
    for line in content.splitlines():
        # create a simplified version removing role wrappers to test heading
        simplified = re.sub(r'\[\.inserted\]#|\[\.removed\]#|#', '', line)
        is_fence = '----' in simplified.strip()  # == is too strict
        if is_fence:
            if in_code_block:
                in_code_block_end_marker = True
            else:
                in_code_block = True
        if simplified.strip() == '':
            out_lines.append('')
            continue
        if simplified.lstrip().startswith('include::'):
            line = strip_roles_keep_inserted_drop_removed(line)
            if in_code_block and DEBUG:
                line = f'{line} // DEBUG:code-block'
            out_lines.append(line)
            continue
        if simplified.lstrip().startswith('[cols=') or simplified.lstrip().startswith('[options='):
            line = strip_roles_keep_text(line)
            out_lines.append(line)
            continue
        if simplified.lstrip().startswith('image::'):
            line = strip_roles_keep_inserted_drop_removed(line)
            out_lines.append(line)
            continue
        if simplified.lstrip().startswith('|==='):
            line = strip_roles_keep_text(line)
            out_lines.append(line)
            continue
        if in_code_block:
            line = strip_roles_keep_inserted_drop_removed(line)
        if simplified.lstrip().startswith('='):
            # remove any removed-role blocks from original line (drop the text)
            line = strip_roles_keep_inserted_drop_removed(line)
            # normalize heading indentation only when the heading already has text
            if re.search(r'=\S', line.lstrip()):
                line = line.lstrip()
        if in_code_block and DEBUG:
            line = f'{line} // DEBUG:code-block'
        if in_code_block_end_marker:
            line = line.lstrip()
            in_code_block = False
            in_code_block_end_marker = False
        out_lines.append(line)

    content = '\n'.join(out_lines)

    # Remove any stray unmatched markers
    content = content.replace('__INS_START__', '').replace('__INS_END__', '')
    content = content.replace('__DEL_START__', '').replace('__DEL_END__', '')

    # Merge a heading marker line with the next indented text line when the
    # heading has no text of its own.
    lines = content.splitlines()
    merged_lines = []
    i = 0
    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        if re.fullmatch(r'=+', stripped):
            i += 1
            continue

        if re.fullmatch(r'=+', stripped):
            if i + 1 < len(lines) and re.match(r'^\s+\S', lines[i + 1]):
                next_text = lines[i + 1].lstrip()
                merged_line = f'{stripped} {next_text}'
                debug_print('merge heading:', repr(line), 'next:', repr(lines[i + 1]), 'trimmed:', repr(next_text), '=>', repr(merged_line))
                merged_lines.append(merged_line)
                i += 2
                continue

        merged_lines.append(line)
        i += 1

    content = '\n'.join(merged_lines)

    sys.stdout.write(content)

if __name__ == '__main__':
    main()