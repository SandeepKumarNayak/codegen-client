# AI Code Generator Frontend

Welcome to the AI Code Generator frontend application! This project provides a stunning, interactive user interface for generating, transpiling, and previewing React code in real-time using advanced AI models.

## User Interface

The UI is built with a modern, glassmorphic design focusing on user experience.

![UI Screenshot](C:\Users\asus\.gemini\antigravity\brain\582381fa-1ab9-4dee-95c4-dc92e7f23534\ui_screenshot_1777783542616.png)

## Application Flow

The user journey is streamlined to provide immediate visual feedback.

![Flow Diagram](C:\Users\asus\.gemini\antigravity\brain\582381fa-1ab9-4dee-95c4-dc92e7f23534\flow_diagram_1777783558040.png)

### Steps
1. **Prompt Input**: The user enters a natural language description of the desired UI component.
2. **AI Code Generation**: The request is sent to the backend where the AI streams the generated React/Tailwind code back to the client.
3. **Transpilation & Sandboxing**: The generated code is transpiled using Babel directly in the browser and executed within a secure, isolated iframe.
4. **Live Preview**: The resulting component is rendered instantly in the preview panel, allowing the user to iterate on the design.

## Tech Stack
- **Framework**: React with Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: TanStack Router
- **Icons**: Lucide React
