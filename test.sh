#!/bin/bash

# API Testing Script for Chat Application

# Configuration
API_URL="http://localhost:8081"  # Default URL, can be overridden
AUTH_TOKEN=""                    # Default empty token
VERBOSE=false                    # Verbose output flag

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Parse command line arguments
while [[ "$#" -gt 0 ]]; do
    case $1 in
        --url) API_URL="$2"; shift ;;
        --token) AUTH_TOKEN="$2"; shift ;;
        --verbose) VERBOSE=true ;;
        *) echo "Unknown parameter: $1"; exit 1 ;;
    esac
    shift
done

# Print configuration
echo -e "${BLUE}API Testing Configuration:${NC}"
echo -e "API URL: ${API_URL}"
echo -e "Auth Token: ${AUTH_TOKEN:-(none)}"
echo -e "Verbose mode: ${VERBOSE}"
echo ""

# Helper function to make API calls
call_api() {
    local method=$1
    local endpoint=$2
    local payload=$3
    local description=$4

    echo -e "${YELLOW}Testing: ${description}${NC}"
    echo -e "Endpoint: ${method} ${endpoint}"

    if [[ -n "$payload" && "$VERBOSE" == true ]]; then
        echo -e "Payload: ${payload}"
    fi

    local headers="-H 'Content-Type: application/json'"
    if [[ -n "$AUTH_TOKEN" ]]; then
        headers+=" -H 'Authorization: Bearer ${AUTH_TOKEN}'"
    fi

    local cmd=""
    if [[ "$method" == "GET" ]]; then
        cmd="curl -s -X GET ${headers} '${API_URL}${endpoint}'"
    else
        cmd="curl -s -X ${method} ${headers} -d '${payload}' '${API_URL}${endpoint}'"
    fi

    if [[ "$VERBOSE" == true ]]; then
        echo -e "Command: ${cmd}"
    fi

    # Execute the command
    local result=$(eval $cmd)
    local status=$?

    if [ $status -eq 0 ]; then
        echo -e "${GREEN}Success!${NC}"
        if [[ "$VERBOSE" == true ]]; then
            echo "Response:"
            echo $result | jq '.' 2>/dev/null || echo $result
        fi
    else
        echo -e "${RED}Failed with status: ${status}${NC}"
        echo "Response:"
        echo $result
    fi
    echo -e "----------------------------------------\n"
}

# Test 1: Get Chat Histories
call_api "GET" "/api/v1/chats" "" "Get chat histories"

# Test 2: Send Message
payload='{
  "messages": [
    {
      "content": "Hello, how can you help me today?",
      "isUser": true
    }
  ],
  "model": "default-model",
  "options": {}
}'
call_api "POST" "/ask" "$payload" "Send message"

# Test 3: Get Chat History (needs a valid chat ID)
# Replace 'example-chat-id' with a real chat ID if available
call_api "GET" "/api/v1/chats/example-chat-id" "" "Load chat history"

# Test 4: Stream Chat (Note: This is harder to test with curl in a simple way)
payload='{
  "messages": [
    {
      "content": "Tell me about streaming APIs",
      "isUser": true
    }
  ],
  "model": "default-model",
  "options": {}
}'
echo -e "${YELLOW}Testing: Send streaming message${NC}"
echo -e "Note: Streaming endpoints are better tested with interactive tools that can handle HTTP streaming"
echo -e "To manually test with curl:"
echo -e "curl -N -X POST -H 'Content-Type: application/json' -H 'Authorization: Bearer ${AUTH_TOKEN}' -d '${payload}' '${API_URL}/api/v1/chats/stream'"
echo -e "----------------------------------------\n"

# Test 5: Get LLM Providers
call_api "GET" "/api/v1/llm-providers" "" "Get LLM providers"

# Test 6: Get Tools
call_api "GET" "/api/v1/tools" "" "Get tools"

echo -e "${BLUE}All tests completed!${NC}"