# Pointr Graph Editor

**Pointr Graph Editor** is a sub-project of **Pointr**, an open-source, indoor navigating AR solution. Pointr detects anchor tags placed across an area to show users the direction to their destination in real-time, providing a scalable and cost-effective indoor navigation solution without relying on GPS.

Developed as a collective effort by the team from the **GBP CS Club** to solve indoor navigation challenges, this graph editor allows users to drop in any indoor map, generate a path graph on top of it, and export the result into a Neo4j-ready format.

Built with React, TypeScript, and Vite, the application features a modern, interactive canvas where users can create, connect, and manage nodes and edges, utilizing advanced interaction modes and a robust command-based architecture.

## Features

- **Interactive Canvas**: Pan, zoom, and interact with graph elements seamlessly.
- **Multiple Modes**: Support for selecting elements, creating nodes, and drawing connections.
- **Undo/Redo Support**: Full history management powered by the Command pattern.
- **Modern UI**: Styled with Tailwind CSS v4 and enriched with Framer Motion animations and HugeIcons.

## Development Setup

### Prerequisites

- Node.js (v18+ recommended)
- npm (or yarn/pnpm)

### Getting Started

1. Clone the repository and navigate to the project directory:
   ```bash
   cd pointr-graph-editor
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Available Scripts

- `npm run dev` - Starts the Vite development server with Fast Refresh.
- `npm run build` - Compiles TypeScript and builds the production bundle.
- `npm run preview` - Previews the production build locally.
- `npm run lint` - Runs ESLint to identify and report on patterns.
- `npm run test` - Runs the Jest test suite.

## Architecture

The Pointr Graph Editor is structured with scalability and clear separation of concerns in mind:

### 1. UI Components (`src/components/`)
React components handles the presentation layer. It's logically separated into:
- **Canvas (`components/canvas/`)**: Renders the main graph, grids, overlays, and background elements.
- **Controls (`components/controls/`)**: UI controls for switching modes, managing workspaces, undo/redo, and other toolbars.
- **Common & UI**: Reusable generic UI components like popups and inputs.

### 2. State Management (`src/stores/`)
The application uses Zustand for global state management:
- **`commandStore`**: Maintains the history stack for undo/redo functionality.
- **`modeStore`**: Tracks the current interaction mode (Select, Create, Connect).
- **`selectionStore`**: Manages the currently selected nodes and edges.
- Other module-specific stores (e.g., canvas state, graph data).

### 3. Domain Logic (`src/domain/`)
Business logic and entities that represent the app's core concepts:
- **Graph (`domain/graph/`)**: Core data structures for `graphNode` and `graphEdge`.
- **Modes (`domain/modes/`)**: Defines the specific behavior for different user interactions under `SelectMode`, `ConnectMode`, `CreateNodeMode`, etc.

### 4. Core Commands (`src/core/commands/`)
The project utilizes the **Command Pattern** (`ICommand.ts`) for all mutating actions. This ensures that actions like creating nodes, moving them, or connecting them:
- Have a unified `execute()` and `undo()` interface.
- Keep the domain and UI decoupled from the specific mutation logic.
- Easily integrate with the `commandStore` to provide robust undo/redo capabilities.

## Tech Stack
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: @hugeicons/react
- **Testing**: Jest + React Testing Library
