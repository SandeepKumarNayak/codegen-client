# AI Code Generator Frontend

Welcome to the AI Code Generator frontend application! This project provides a stunning, interactive user interface for generating, transpiling, and previewing React code in real-time using advanced AI models.

## User Interface

The UI is built with a modern, glassmorphic design focusing on user experience.
## Dashboard:

<img width="1919" height="888" alt="image" src="https://github.com/user-attachments/assets/18965b4c-6841-45f8-b4f3-3b5293b27b84" />

## Editor screen
<img width="1916" height="895" alt="image" src="https://github.com/user-attachments/assets/08d437b3-326d-4845-94e0-872cc36a8d9c" />

## Editor and live preview:
<img width="1918" height="951" alt="image" src="https://github.com/user-attachments/assets/d627d749-79a2-4b07-be03-67b10ee49e8f" />

## Expanded view
<img width="1919" height="892" alt="image" src="https://github.com/user-attachments/assets/11ac6c9b-ad4d-44d7-bde7-bf69e099d130" />

## Application Flow

The user journey is streamlined to provide immediate visual feedback.

![Flow Diagram](./public/flow_diagram.png)


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
