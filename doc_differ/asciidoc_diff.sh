#!/bin/bash

# Script to compare docs and docs_m1 directories and generate diff output
# Creates a new directory with asciidoc files showing word-level differences

DIR1="${1:-./docs}"
DIR2="${2:-./docs_m1}"
OUTPUT_DIR="${3:-./docs-diff}"

# Validate directories exist
if [[ ! -d "$DIR1" ]]; then
    echo "Error: Directory $DIR1 does not exist" >&2
    exit 1
fi

if [[ ! -d "$DIR2" ]]; then
    echo "Error: Directory $DIR2 does not exist" >&2
    exit 1
fi

# Check if dwdiff is available
if ! command -v dwdiff &> /dev/null; then
    echo "Warning: dwdiff not found. Install with: brew install dwdiff"
    USE_DWDIFF=0
else
    USE_DWDIFF=1
fi

echo "Comparing: $DIR1 vs $DIR2"
echo "Output directory: $OUTPUT_DIR"
echo "=========================================="
echo ""

# Create output directory
rm -rf "$OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR"

# Copy theme file for PDF rendering
if [[ -f "theme.yml" ]]; then
    cp theme.yml "$OUTPUT_DIR/"
fi

# Create temporary files to store file lists
DIR1_LIST=$(mktemp)
DIR2_LIST=$(mktemp)
trap "rm -f $DIR1_LIST $DIR2_LIST" EXIT

# Get sorted lists of .adoc files (relative paths)
find "$DIR1" -name "*.adoc" -type f | sed "s|^$DIR1/||" | sort > "$DIR1_LIST"
find "$DIR2" -name "*.adoc" -type f | sed "s|^$DIR2/||" | sort > "$DIR2_LIST"

# Function to convert dwdiff output markers to inline asciidoc roles
# Marks inserted/deleted content with [.inserted]## ## and [.removed]## ## roles
convert_dwdiff_to_roles() {
    local text="$1"
    # Replace inserted markers with inline role: __INS_START__....__INS_END__ -> [.inserted]##...##
    text=$(echo "$text" | sed 's/__INS_START__/[.inserted]##/g; s/__INS_END__/##/g')
    # Replace deleted markers with inline role: __DEL_START__....__DEL_END__ -> [.removed]##...##
    text=$(echo "$text" | sed 's/__DEL_START__/[.removed]##/g; s/__DEL_END__/##/g')
    echo "$text"
}

# Function to create directory structure
create_dir_structure() {
    local file="$1"
    local dirname=$(dirname "$file")
    if [[ "$dirname" != "." ]]; then
        mkdir -p "$OUTPUT_DIR/$dirname"
    fi
}

# Function to process new file (highlight all content as inserted)
process_new_file() {
    local file="$1"
    local source="$2"
    create_dir_structure "$file"
    
    # Wrap each line with markers and process through role converter
    {
        while IFS= read -r line || [[ -n "$line" ]]; do
            echo "__INS_START__${line}__INS_END__"
        done < "$source"
    } | python3 apply_block_roles.py > "$OUTPUT_DIR/$file"
}

# Function to process removed file (highlight all content as removed)
process_removed_file() {
    local file="$1"
    local source="$2"
    create_dir_structure "$file"
    
    # Wrap each line with markers and process through role converter
    {
        while IFS= read -r line || [[ -n "$line" ]]; do
            echo "__DEL_START__${line}__DEL_END__"
        done < "$source"
    } | python3 apply_block_roles.py > "$OUTPUT_DIR/$file"
}

# Function to process modified file with dwdiff
# Applies block-level roles to all changed content
process_modified_file() {
    local file="$1"
    local file1="$2"
    local file2="$3"
    create_dir_structure "$file"
    
    if [[ $USE_DWDIFF -eq 1 ]]; then
        # Use simple markers with -R to repeat at line boundaries for each line's own role markers
        dwdiff -R -w '__DEL_START__' -x '__DEL_END__' \
               -y '__INS_START__' -z '__INS_END__' \
               "$file2" "$file1" > /tmp/dwdiff_output.tmp
        
        # Post-process to apply roles to each block
        python3 apply_block_roles.py /tmp/dwdiff_output.tmp > "$OUTPUT_DIR/$file"
        rm -f /tmp/dwdiff_output.tmp
    else
        # Fallback: copy newer version
        cp "$file1" "$OUTPUT_DIR/$file"
    fi
}

# Process NEW files (in DIR1 but not in DIR2)
echo "NEW FILES (in $DIR1 only - added in newer version):"
echo "--------"
NEW_COUNT=0
while IFS= read -r file; do
    if ! grep -Fxq "$file" "$DIR2_LIST"; then
        echo "  + $file"
        process_new_file "$file" "$DIR1/$file"
        ((NEW_COUNT++))
    fi
done < "$DIR1_LIST"
[ $NEW_COUNT -eq 0 ] && echo "  (none)"
echo ""

# Process REMOVED files (in DIR2 but not in DIR1)
echo "REMOVED FILES (in $DIR2 only - removed in newer version):"
echo "--------"
REMOVED_COUNT=0
while IFS= read -r file; do
    if ! grep -Fxq "$file" "$DIR1_LIST"; then
        echo "  - $file"
        process_removed_file "$file" "$DIR2/$file"
        ((REMOVED_COUNT++))
    fi
done < "$DIR2_LIST"
[ $REMOVED_COUNT -eq 0 ] && echo "  (none)"
echo ""

# Process MODIFIED files (differ between versions)
echo "MODIFIED FILES (content differs):"
echo "--------"
MODIFIED_COUNT=0
while IFS= read -r file; do
    if grep -Fxq "$file" "$DIR2_LIST"; then
        if ! diff -q "$DIR1/$file" "$DIR2/$file" > /dev/null 2>&1; then
            echo "  ~ $file"
            process_modified_file "$file" "$DIR1/$file" "$DIR2/$file"
            ((MODIFIED_COUNT++))
        fi
    fi
done < "$DIR1_LIST"
[ $MODIFIED_COUNT -eq 0 ] && echo "  (none)"
echo ""

# Process UNCHANGED files (copy as-is)
echo "UNCHANGED FILES (identical):"
echo "--------"
UNCHANGED_COUNT=0
while IFS= read -r file; do
    if grep -Fxq "$file" "$DIR2_LIST"; then
        if diff -q "$DIR1/$file" "$DIR2/$file" > /dev/null 2>&1; then
            echo "  = $file"
            create_dir_structure "$file"
            cp "$DIR1/$file" "$OUTPUT_DIR/$file"
            ((UNCHANGED_COUNT++))
        fi
    fi
done < "$DIR1_LIST"
[ $UNCHANGED_COUNT -eq 0 ] && echo "  (none)"
echo ""

# Summary
echo "=========================================="
echo "SUMMARY:"
echo "  New:       $NEW_COUNT"
echo "  Removed:   $REMOVED_COUNT"
echo "  Modified:  $MODIFIED_COUNT"
echo "  Unchanged: $UNCHANGED_COUNT"
echo ""
echo "Output saved to: $OUTPUT_DIR"
echo "=========================================="
