# MCP (Model Context Protocol) Frontend

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A frontend application for the Model Context Protocol (MCP) Kit that enables enhanced interactions with Large Language Models through tool-based capabilities.

This repository is part of [mcp-kit](https://github.com/shaharia-lab/mcp-kit) and serves as the user interface layer built with modern web technologies.

## 🚀 Features

- Single Page Application architecture
- Real-time chat interface with LLMs
- Tool-based interaction capabilities
- Integration with MCP backend server
- Modern, responsive UI built with React and TypeScript

## 🎥 Demo

Experience MCP Kit in action - chat with LLMs while leveraging additional capabilities provided by the MCP server:

<video src="https://github.com/user-attachments/assets/81804a29-e896-4f65-a929-05ac6a6aa92a" controls title="MCP Kit in action"></video>

## 🛠️ Prerequisites

- Node.js 20.x
- NPM 7.x

## 📦 Installation

### Standard Installation

1. Clone the repository:
```shell
git clone https://github.com/shaharia-lab/mcp-frontend.git
cd mcp-frontend
```

[Rest of standard installation steps...]

### 🐳 Docker Installation

You can run MCP Frontend using our official Docker image:

```shell
docker pull ghcr.io/shaharia-lab/mcp-frontend:<version>
```

Replace `<version>` with the specific version you want to use (e.g., `latest`, `1.0.0`).

#### Running with Docker

docker run \
    -p 3000:3000 \
    -e VITE_MCP_BACKEND_API_ENDPOINT=http://localhost:8081 \
    ghcr.io/shaharia-lab/mcp-frontend:<version>

#### Environment Variables

The following environment variables are required to run MCP Frontend:

##### Production Environment Variables (Running with Docker)

| env_key                         | Default | Required | Description                           |
|---------------------------------|---------|----------|---------------------------------------|
| `VITE_MCP_BACKEND_API_ENDPOINT` | -       | Yes      | The base URL for the MCP backend API. |

Simply copy the `.env.example` file to `.env` and update the values as needed.

## 🚀 Usage

### Development

Run the development server:
```shell
npm run dev
```

### Production

Build for production:

```shell
npm run build
```

For detailed configuration options, refer to the [Vite documentation](https://vite.dev/guide/).

## 🏗️ Architecture

MCP Frontend is built with:
- [Vite](https://vite.dev/) - Build tool and development server
- [React](https://reactjs.org/) - UI framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your PRs follow our coding standards and include appropriate tests.

## 🔍 Related Projects

- [MCP-Kit Backend](https://github.com/shaharia-lab/mcp-kit) - The main backend server
- [Documentation](https://github.com/shaharia-lab/mcp-kit) - Full project documentation

## ⚠️ Current Status

This project is under active development. While functional, it's not yet recommended for production use. We're working on:
- Enhanced error handling
- Improved performance
- Additional tool integrations
- Comprehensive testing suite

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤔 Support

- 📧 Email: [hello@shaharialab.com](mailto:hello@shaharialab.com)
- 🐛 [Issue Tracker](https://github.com/shaharia-lab/mcp-frontend/issues)
- 💬 [Discord invite: Community Chat](https://discord.gg/XMDMQ2u7)

## 🙏 Acknowledgments

- The MCP Kit community
- All our contributors and supporters