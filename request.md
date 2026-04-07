```shell
curl 'http://localhost:8081/api/v1/chats' \
  -H 'Authorization: Bearer xxxxxxxxx' \
  -H 'Content-Type: application/json'

{"chats":[{"uuid":"9316b085-cdef-4588-86a8-098cf7c50c3a","messages":[{"Role":"user","Text":"Hi","generated_at":"2025-03-18T23:43:38.06207668+01:00"},{"Role":"assistant","Text":"Hello there! How can I assist you today? I'm ready to help with any questions or tasks you might have.","generated_at":"2025-03-18T23:43:38.785651831+01:00"}],"created_at":"2025-03-18T23:43:38.061359628+01:00"},{"uuid":"47d56853-afc7-4a12-bad4-501c358ffed1","messages":[{"Role":"user","Text":"Hi","generated_at":"2025-03-19T00:04:59.457248818+01:00"},{"Role":"assistant","Text":"Hello! How can I assist you today? I'm ready to help with any questions or tasks you may have.","generated_at":"2025-03-19T00:05:00.589087926+01:00"}],"created_at":"2025-03-19T00:04:59.456650668+01:00"},{"uuid":"bc94f885-8c3d-4471-a133-47dca86eafeb","messages":[{"Role":"user","Text":"Hi","generated_at":"2025-03-19T00:06:40.248494512+01:00"},{"Role":"assistant","Text":"Hello! How can I help you today? I'm ready to assist you with any questions or tasks you might have.","generated_at":"2025-03-19T00:06:41.041832359+01:00"}],"created_at":"2025-03-19T00:06:40.247155342+01:00"}]}
```

```shell
curl 'http://localhost:8081/api/v1/tools' \
  -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IllVOHc2XzFWTjJtc0l1Wi00SzlZVSJ9.eyJpc3MiOiJodHRwczovL3NoYWhhcmlhLWxhYi1iZXRhLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwODcyMTgxMTM2NzE4OTkzODM1NSIsImF1ZCI6WyJtY3Ata2l0LWJhY2tlbmQiLCJodHRwczovL3NoYWhhcmlhLWxhYi1iZXRhLmV1LmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE3NDIzNDE1MDQsImV4cCI6MTc0MjQyNzkwNCwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImF6cCI6IlRNcFRMU05KRWNPU0lTV3ZIbUVXN0dKUzZtYXdjWFFSIn0.AhvkMjMtvPLLvflvi7DQum061PrL-fuQEb8J-NPRKACCmLzC7oo6KeUWyJpL6cu1WfWqxF2IkUiYZtwcD4TPf-fblsiLYCzX-g5Yq5ZzoVOV9MJsg_RavXP1uAU9Pu44OMfIb2VRKQ9LTuS_Vro9m1c3T5WjDCmCvogN75ijtQe5QWSIHoC6HFHw7N90IrG_ZGsaC6_6m1mhGmVDQtaGW2v_PxZj9PnYYfNshDiqPO-VTi2OynhYYSbvGOQ0N_-ipROUJvOvzI3nzPsr6vv-FXTfi_Yv2qnAmYJ9m5UAEtTHa8fSeGmYb-_IyG3OQ_MSCXXg46kYfYIyNnaE2WZv9Q' \
  -H 'Content-Type: application/json'
  
[{"name":"bash","description":"Execute bash commands with specified script or command"},{"name":"curl","description":"Perform any HTTP request with specified method, URL, headers, and data"},{"name":"docker","description":"Execute Docker commands with specified arguments"},{"name":"filesystem","description":"Performs filesystem operations like list, read, write, create, delete files and directories"},{"name":"get_weather","description":"Get the current weather for a given location."},{"name":"git","description":"Performs any Git operation based on the provided command"},{"name":"github_issues","description":"Manages GitHub issues - create, list, update, comment"},{"name":"github_pull_requests","description":"Manages GitHub pull requests - create, review, merge"},{"name":"github_repository","description":"Manages GitHub repositories - create, delete, update, fork"},{"name":"github_search","description":"Performs GitHub search operations across repositories, code, issues, and users"},{"name":"gmail","description":"Performs Gmail operations such as list, send, read messages"},{"name":"grep","description":"Execute grep commands with specified pattern and options"},{"name":"postgresql","description":"Performs PostgreSQL operations including querying, explaining queries, and retrieving schema information"},{"name":"sed","description":"Stream editor for filtering and transforming text"}]
```

```shell
curl 'http://localhost:8081/api/v1/llm-providers' \
-H 'Authorization: Bearer xxxx' \
-H 'Content-Type: application/json'

{
  "providers": [
    {
      "name": "Anthropic",
      "models": [
        {
          "name": "Claude 2.0",
          "description": "Advanced language model optimized for reliability and thoughtful responses",
          "modelId": "claude-2.0"
        }
      ]
    },
    {
      "name": "OpenAI",
      "models": [
        {
          "name": "GPT-4o Latest",
          "description": "Latest GPT-4o model",
          "modelId": "chatgpt-4o-latest"
        }
      ]
    }
  ]
}
```

```shell
curl 'http://localhost:8081/ask' \
  -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IllVOHc2XzFWTjJtc0l1Wi00SzlZVSJ9.eyJpc3MiOiJodHRwczovL3NoYWhhcmlhLWxhYi1iZXRhLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwODcyMTgxMTM2NzE4OTkzODM1NSIsImF1ZCI6WyJtY3Ata2l0LWJhY2tlbmQiLCJodHRwczovL3NoYWhhcmlhLWxhYi1iZXRhLmV1LmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE3NDIzNDE1MDQsImV4cCI6MTc0MjQyNzkwNCwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImF6cCI6IlRNcFRMU05KRWNPU0lTV3ZIbUVXN0dKUzZtYXdjWFFSIn0.AhvkMjMtvPLLvflvi7DQum061PrL-fuQEb8J-NPRKACCmLzC7oo6KeUWyJpL6cu1WfWqxF2IkUiYZtwcD4TPf-fblsiLYCzX-g5Yq5ZzoVOV9MJsg_RavXP1uAU9Pu44OMfIb2VRKQ9LTuS_Vro9m1c3T5WjDCmCvogN75ijtQe5QWSIHoC6HFHw7N90IrG_ZGsaC6_6m1mhGmVDQtaGW2v_PxZj9PnYYfNshDiqPO-VTi2OynhYYSbvGOQ0N_-ipROUJvOvzI3nzPsr6vv-FXTfi_Yv2qnAmYJ9m5UAEtTHa8fSeGmYb-_IyG3OQ_MSCXXg46kYfYIyNnaE2WZv9Q' \
  -H 'Content-Type: application/json' \
  --data-raw '{"question":"Hi","selectedTools":["get_weather"],"modelSettings":{"temperature":0.5,"maxTokens":2000,"topP":0.5,"topK":50},"llmProvider":{"provider":"Anthropic","modelId":"claude-3-5-haiku-latest"}}'
  
{"chat_uuid":"9461ba91-86b0-496c-ab90-9995803507dc","answer":"Hello! How can I assist you today? I'm ready to help with any questions or tasks you might have.","input_token":129,"output_token":26}
```

```shell
# Get the chat streaming way with the response

curl 'http://localhost:8081/api/v1/chats/stream' \
  -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IllVOHc2XzFWTjJtc0l1Wi00SzlZVSJ9.eyJpc3MiOiJodHRwczovL3NoYWhhcmlhLWxhYi1iZXRhLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwODcyMTgxMTM2NzE4OTkzODM1NSIsImF1ZCI6WyJtY3Ata2l0LWJhY2tlbmQiLCJodHRwczovL3NoYWhhcmlhLWxhYi1iZXRhLmV1LmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE3NDIzNDE1MDQsImV4cCI6MTc0MjQyNzkwNCwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImF6cCI6IlRNcFRMU05KRWNPU0lTV3ZIbUVXN0dKUzZtYXdjWFFSIn0.AhvkMjMtvPLLvflvi7DQum061PrL-fuQEb8J-NPRKACCmLzC7oo6KeUWyJpL6cu1WfWqxF2IkUiYZtwcD4TPf-fblsiLYCzX-g5Yq5ZzoVOV9MJsg_RavXP1uAU9Pu44OMfIb2VRKQ9LTuS_Vro9m1c3T5WjDCmCvogN75ijtQe5QWSIHoC6HFHw7N90IrG_ZGsaC6_6m1mhGmVDQtaGW2v_PxZj9PnYYfNshDiqPO-VTi2OynhYYSbvGOQ0N_-ipROUJvOvzI3nzPsr6vv-FXTfi_Yv2qnAmYJ9m5UAEtTHa8fSeGmYb-_IyG3OQ_MSCXXg46kYfYIyNnaE2WZv9Q' \
  -H 'Connection: keep-alive' \
  -H 'Content-Type: application/json' \
  --data-raw $'{"question":"Hi, what\'s the weather in Berlin, Germany?","selectedTools":["get_weather"],"modelSettings":{"temperature":0.5,"maxTokens":2000,"topP":0.5,"topK":50},"stream_settings":{"chunk_size":1,"delay_ms":10},"llmProvider":{"provider":"Anthropic","modelId":"claude-3-5-haiku-latest"}}'
  
  
{"content":"I"}
{"content":"'ll"}
{"content":" check"}
{"content":" the current"}
{"content":" weather for"}
{"content":" Berlin right"}
{"content":" away"}
{"content":"."}
{"content":""}
{"content":"The weather in Berlin"}
{"content":", Germany is currently"}
{"content":" sunny with a temperature"}
{"content":" of 72°F"}
{"content":" ("}
{"content":"22°C)["}
{"content":"^1].\n\n["}
{"content":"^1]: Weather"}
{"content":" information retrieve"}
{"content":"d using get"}
{"content":"_weather tool for"}
{"content":" Berlin, Germany"}
{"content":"","done":true}
```

```shell
curl 'http://localhost:8081/api/v1/chats/1fe34a33-5b1e-4dcb-8db3-c7f453b36958' \
  -H 'Authorization: Bearer xxxxx' \
  -H 'Content-Type: application/json'
  
{"uuid":"1fe34a33-5b1e-4dcb-8db3-c7f453b36958","messages":[{"Role":"user","Text":"Hi","generated_at":"2025-03-19T00:51:40.374365967+01:00"},{"Role":"assistant","Text":"Hello! How can I help you today? I'm ready to assist you with any questions or tasks you might have.","generated_at":"2025-03-19T00:51:44.833602571+01:00"},{"Role":"user","Text":"what's the weather","generated_at":"2025-03-19T00:53:05.520386438+01:00"},{"Role":"assistant","Text":"I apologize, but I'll need a specific location to check the weather for you. Could you please provide me with a city and state (or country)? For example, \"New York, NY\" or \"London, UK\". Once you give me a location, I'll be happy to retrieve the current weather conditions for you.","generated_at":"2025-03-19T00:53:08.594731033+01:00"}],"created_at":"2025-03-19T00:51:40.373540584+01:00"}
```