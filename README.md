# Smooth Scroll Controller

A JavaScript library for smooth scrolling control in web applications.

[![npm version](https://badge.fury.io/js/smooth-scroll-controller.svg)](https://badge.fury.io/js/smooth-scroll-controller)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- Smooth scrolling to specific positions or elements
- Support for both immediate and animated scrolling
- TypeScript support with type definitions
- No external dependencies
- Works with any scrollable container

## Installation

```bash
# npm
npm install smooth-scroll-controller

# pnpm
pnpm add smooth-scroll-controller

# yarn
yarn add smooth-scroll-controller
```

## Usage

### ES Module

```javascript
import SmoothScrollController from "smooth-scroll-controller";

const scrollController = new SmoothScrollController({
  container: document.getElementById("chat-messages"),
});

// Scroll to bottom
scrollController.settleDown();
```

### CommonJS

```javascript
const SmoothScrollController = require("smooth-scroll-controller");

const scrollController = new SmoothScrollController({
  container: document.getElementById("chat-messages"),
});
```

## API Reference

### Constructor

```typescript
new SmoothScrollController(options: ScrollControllerOptions)
```

### Options

```typescript
interface ScrollControllerOptions {
  container: HTMLElement; // The scrollable container element
  behavior?: "smooth" | "auto"; // Scroll behavior, default 'smooth'
  duration?: number; // Animation duration in milliseconds, default 300
  easing?: string; // Easing function, default 'ease-out'
}
```

### Methods

#### `settleDown()`

Smoothly scroll to the bottom of the container. **This method is designed for continuous smooth scrolling when called multiple times in succession** - each call will smoothly transition to the new bottom position, making it ideal for chat applications or live content feeds where new content is continuously added.

```javascript
scrollController.settleDown();
```

#### `scrollTo(position: number)`

Scroll to a specific position.

```javascript
scrollController.scrollTo(100);
```

#### `scrollToElement(element: HTMLElement)`

Scroll to a specific element.

```javascript
const targetElement = document.getElementById("target");
scrollController.scrollToElement(targetElement);
```

#### `scrollBottomImmediate()`

Immediately scroll to bottom without animation.

```javascript
scrollController.scrollBottomImmediate();
```

## Examples

### Chat Application

```javascript
const chatContainer = document.getElementById("chat-messages");
const scrollController = new SmoothScrollController({
  container: chatContainer,
});

// Auto-scroll when new message arrives
// Multiple rapid calls to settleDown() will create smooth continuous scrolling
function addMessage(message) {
  const messageElement = createMessageElement(message);
  chatContainer.appendChild(messageElement);
  // Each call smoothly transitions to the new bottom position
  scrollController.settleDown();
}

// Example: Adding multiple messages rapidly
function addMultipleMessages(messages) {
  messages.forEach((message) => {
    addMessage(message); // Each call will smoothly scroll down
  });
}
```

### Live Content Updates

```javascript
const contentContainer = document.getElementById("live-content");
const scrollController = new SmoothScrollController({
  container: contentContainer,
  duration: 500,
});

// Maintain scroll position during content updates
function updateContent(newContent) {
  contentContainer.innerHTML = newContent;
  scrollController.settleDown();
}
```

## Development

### Setup

```bash
pnpm install
```

### Build Commands

```bash
# Build the project
pnpm run build

# Watch for changes and rebuild
pnpm run start

# Run tests
pnpm run test

# Type checking
pnpm run typecheck
```

### Project Structure

```
smooth-scroll-controller/
├── src/                  # Source code
├── dist/                 # Build output
├── index.html           # Demo page
├── package.json
├── tsconfig.json
└── README.md
```

## Demo

Open the `index.html` file in your browser to see the demo. The demo includes:

- Real-time chat scrolling
- Markdown content rendering
- Streaming text output
- Responsive design

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## Changelog

### v0.0.0

- Initial release
- Basic scroll control functionality
- TypeScript support

## License

This project is licensed under the MIT License.

## Author

**Alex Reinforce**

- GitHub: [@alex-reinfoce](https://github.com/alex-reinfoce)
- Repository: [https://github.com/alex-reinfoce/smooth-scroll-controller](https://github.com/alex-reinfoce/smooth-scroll-controller)

## Issues

Report bugs and feature requests at [GitHub Issues](https://github.com/alex-reinfoce/smooth-scroll-controller/issues).
