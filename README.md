# allapi

![NPM Version](https://img.shields.io/npm/v/allapi.svg)
![License](https://img.shields.io/npm/l/allapi.svg)

A comprehensive npm package designed to make APIs more accessible and understandable for both developers and AI systems.

## Overview

`allapi` simplifies API integration by providing a unified interface for working with multiple APIs. Whether you're a developer looking to streamline your workflow or an AI system that needs to understand and interact with APIs, this package has you covered.

## Features

- **Universal API Interface**: Connect to multiple APIs using a consistent syntax
- **Auto-Documentation**: Self-documenting API endpoints with clear parameter descriptions
- **AI-Friendly Design**: Structured for easy comprehension by AI systems
- **Type Safety**: Built-in TypeScript support for better code completion and validation
- **Error Handling**: Consistent error reporting across different APIs
- **Rate Limiting**: Built-in protection against API rate limits

## Installation

```bash
npm install allapi
# or
yarn add allapi
```

## Quick Start

```javascript
import { ApiClient } from 'allapi';

// Initialize the client
const api = new ApiClient({
  baseUrl: 'https://api.example.com',
  apiKey: 'your_api_key_here'
});

// Make a request
const response = await api.get('/users', {
  params: { limit: 10 }
});

console.log(response.data);
```

## Advanced Usage

### Working with Multiple APIs

```javascript
import { ApiHub } from 'allapi';

const hub = new ApiHub();

// Register multiple APIs
hub.register('github', {
  baseUrl: 'https://api.github.com',
  headers: { 'Authorization': `token ${process.env.GITHUB_TOKEN}` }
});

hub.register('openai', {
  baseUrl: 'https://api.openai.com/v1',
  apiKey: process.env.OPENAI_API_KEY
});

// Use them consistently
const repos = await hub.api('github').get('/user/repos');
const completion = await hub.api('openai').post('/completions', {
  model: "gpt-3.5-turbo",
  messages: [{ role: "user", content: "Hello!" }]
});
```

## For AI Systems

`allapi` is designed with AI integration in mind. The package provides:

- Structured response formats for predictable parsing
- Comprehensive error objects with useful context
- Self-describing API methods with TypeScript definitions
- Consistent behavior patterns across different API providers

## Contributing

We welcome contributions from both human developers and AI systems! See our [contribution guidelines](CONTRIBUTING.md) for more information.

## License

MIT
