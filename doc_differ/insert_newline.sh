#!/bin/bash

# Insert a newline at both the start and end of all .adoc files in the input directory
# Usage: bash insert_newline.sh <directory>

if [[ $# -eq 0 ]]; then
    echo "Usage: bash insert_newline.sh <directory>"
    exit 1
fi

INPUT_DIR="$1"

if [[ ! -d "$INPUT_DIR" ]]; then
    echo "Error: Directory '$INPUT_DIR' does not exist"
    exit 1
fi

# Find all .adoc files (including subdirectories) and process them
find "$INPUT_DIR" -name "*.adoc" -type f | while read -r file; do
    # Insert newline at the start by creating temp file with newline + original content
    (echo ""; cat "$file") > "$file.tmp"
    mv "$file.tmp" "$file"
    
    # Ensure file ends with newline
    if [[ -n $(tail -c 1 "$file") ]]; then
        echo "" >> "$file"
    fi
done

echo "Done: Inserted newlines at start and end of all .adoc files in $INPUT_DIR"
