# Tic Tac Toe Desktop Application

A modern, high-quality Tic Tac Toe game built with ElectronJS.

## Features
- **Modern UI**: Sleek dark theme with neon accents and animations.
- **Two Game Modes**:
  - **2 Players**: Play against a friend on the same computer.
  - **vs AI**: Play against an unbeatable AI (Minimax algorithm).
- **Responsive Design**: Clean layout and smooth interactions.

## Prerequisites
- Node.js and npm installed.

## Installation

1. Clone the repository or download the source code.
2. Open a terminal in the project directory.
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Game

To start the application, run:

```bash
npm start
```

## Project Structure

- `main.js`: Main process for Electron, handles window creation.
- `renderer.js`: Renderer process, handles UI logic and game interaction.
- `game.js`: Game logic (state, win detection).
- `ai.js`: AI logic (Minimax algorithm).
- `styles.css`: Styling and animations.
- `index.html`: Main HTML structure.