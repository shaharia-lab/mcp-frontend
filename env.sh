#!/bin/sh
# Generate sed script file
sed_script="/tmp/sed_script.sed"
> "$sed_script"

# Ensure the sed script file is cleaned up on exit
trap 'rm -f "$sed_script"' EXIT

# Extract VITE_MCP_ environment variables and build the sed expression
env | grep '^VITE_MCP_' | while IFS='=' read -r key value; do
   # Escape slashes and other special characters in key and value
   escaped_key=$(printf '%s' "$key" | sed 's/[\/&]/\\&/g')
   escaped_value=$(printf '%s' "$value" | sed 's/[\/&]/\\&/g')
   # Append to sed script file
   echo "s|${escaped_key}|${escaped_value}|g;" >> "$sed_script"
done

# Check if the sed script file was created and is not empty
if [ ! -s "$sed_script" ]; then
   echo "No VITE_MCP_ environment variables found. Exiting with error."
   exit 1
fi

# sed All files
find /usr/share/nginx/html -type f -exec sed -i -f "$sed_script" '{}' +

# sed JS and CSS only
# find /usr/share/nginx/html -type f \( -name '*.js' -o -name '*.css' \) -exec sed -i -f "$sed_script" '{}' +