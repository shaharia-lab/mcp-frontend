# MCP (Model Context Protocol) Frontend

This repository is part of [mcp-kit](https://github.com/shaharia-lab/mcp-kit).
It is the frontend part of the MCP (Model Context Protocol) Kit written in Golang. 
This frontend is a single page application built with Vite, React, Typescript.

# Demo

Let's chat with LLM by providing additional capabilities (tools) coming from MCP server.

<video src="https://github.com/user-attachments/assets/81804a29-e896-4f65-a929-05ac6a6aa92a" controls title="MCP Kit in action"></video>

## Installation

### Prerequisites

- Node.js 20.x
- NPM 7.x

### Setup Environment Variables

```shell
cp .env.example .env
```

Update the `.env` file with your own values.

| env_key                     | Default                 | Required | Description                           |
|-----------------------------|-------------------------|----------|---------------------------------------|
| `VITE_BACKEND_API_ENDPOINT` | `http://localhost:8081` | Yes      | The base URL for the MCP backend API. |


### Run the frontend

```shell
npm install
npm run dev
```

To build the frontend for production, run:

```shell
npm run build
```

For more details, please check the [Vite documentation](https://vite.dev/guide/).

## MCP-Kit Backend

Feel free to check out the main backend [here](https://github.com/shaharia-lab/mcp-kit).

## Disclaimer

We are actively improving this frontend. Not recommended for production-use yet.
