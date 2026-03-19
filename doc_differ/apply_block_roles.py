#!/usr/bin/env python3
"""
Post-process dwdiff markers to apply inline roles.
With dwdiff -R flag, each line has its own complete markers: __INS_START__text__INS_END__
Convert these to AsciiDoc inline role syntax: [.inserted]##text##
Skip structural elements that shouldn't be highlighted:
- Headings (lines starting with =, ==, ===, etc.)
- Block attributes (lines starting with [)
- Empty/whitespace-only lines
"""

import sys
import re

def extract_leading_syntax(text):
    """
    Extract leading AsciiDoc syntax from a line.
    Returns (leading_syntax, remaining_content) tuple.
    
    Examples:
      "* bullet" → ("*", "bullet")
      "=== Heading" → ("===", "Heading")
      "** bold text" → ("", "** bold text")
      ": term" → ("", ": term")
    """
    stripped = text.lstrip()
    
    # Match leading markers followed by space
    # Headings: = == === etc with space
    heading_match = re.match(r'^(=+)\s+', stripped)
    if heading_match:
        marker = heading_match.group(1)
        remainder = stripped[len(marker):].lstrip()
        return marker + ' ', remainder
    
    # List items: * + - followed by space
    list_match = re.match(r'^([\*\+\-])\s+', stripped)
    if list_match:
        marker = list_match.group(1)
        remainder = stripped[len(marker):].lstrip()
        return marker + ' ', remainder
    
    # No leading syntax
    return '', stripped

def should_skip_role(text):
    """Check if this line should skip role markers due to AsciiDoc syntax."""
    stripped = text.strip()
    
    # Skip empty lines
    if not stripped:
        return True
    
    # Skip comments (lines starting with //)
    if stripped.startswith('//'):
        return True
    
    # Skip block attributes/macros (e.g., [.role], [source], [#id])
    if stripped.startswith('['):
        return True
    
    # Skip document attributes (e.g., :title-page:, :toc:, :doctype: book)
    if stripped.startswith(':') and stripped.endswith(':'):
        return True
    
    # Skip include directives - these break if wrapped
    if 'include::' in stripped:
        return True
    
    # Skip labeled lists (term::)
    if re.match(r'^.+::$', stripped):
        return True
    
    # Skip horizontal rules
    if re.match(r'^-{3,}$|^\*{3,}$|^_{3,}$', stripped):
        return True
    
    # Skip that <<< thing
    if '<<<' in stripped:
        return True
    
    return False

def apply_inline_roles(content):
    """
    Convert dwdiff markers to AsciiDoc inline roles.
    - __INS_START__...content...__INS_END__ → [.inserted]##...content...##
    - __DEL_START__...content...__DEL_END__ → [.removed]##...content...##
    Skip empty lines and AsciiDoc structural elements.
    Preserve leading AsciiDoc syntax (headings, lists) outside role markers.
    """
    # First pass: handle insertions
    def replace_insert(match):
        text = match.group(1)
        if should_skip_role(text):
            # Remove markers but don't apply role
            return text
        
        # Extract leading syntax to keep it outside the role
        leading_syntax, content_part = extract_leading_syntax(text)
        
        if leading_syntax and content_part:
            # Preserve syntax outside role: "* [.inserted]#bullet#"
            return f'{leading_syntax}[.inserted]#{content_part}#'
        else:
            # No leading syntax, wrap entire line
            return f'[.inserted]#{text}#'
    
    content = re.sub(
        r'__INS_START__(.*?)__INS_END__',
        replace_insert,
        content,
        flags=re.DOTALL
    )
    
    # Second pass: handle deletions
    def replace_delete(match):
        text = match.group(1)
        if should_skip_role(text):
            # Remove markers but don't apply role
            return text
        
        # Extract leading syntax to keep it outside the role
        leading_syntax, content_part = extract_leading_syntax(text)
        
        if leading_syntax and content_part:
            # Preserve syntax outside role: "* [.removed]#bullet#"
            return f'{leading_syntax}[.removed]#{content_part}#'
        else:
            # No leading syntax, wrap entire line
            return f'[.removed]#{text}#'
    
    content = re.sub(
        r'__DEL_START__(.*?)__DEL_END__',
        replace_delete,
        content,
        flags=re.DOTALL
    )
    
    return content

if __name__ == "__main__":
    if len(sys.argv) > 1:
        with open(sys.argv[1], 'r') as f:
            content = f.read()
    else:
        content = sys.stdin.read()
    
    result = apply_inline_roles(content)
    sys.stdout.write(result)
