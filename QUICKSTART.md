# Quick Start Guide - Tic Tac Toe Desktop App

## Run the Game
```bash
npm start
```

## File Overview

| File | Purpose |
|------|---------|
| `main.js` | Electron entry point - creates app window |
| `game.js` | Game logic class - board state, win detection |
| `ai.js` | AI class - Minimax algorithm implementation |
| `renderer.js` | UI controller - handles user interaction |
| `index.html` | HTML structure |
| `styles.css` | Modern styling and animations |

## Key Features

✅ **2-Player Mode** - Play with a friend  
✅ **AI Mode** - Unbeatable AI opponent  
✅ **Modern UI** - Dark theme with neon accents  
✅ **Smooth Animations** - Professional feel  
✅ **Win/Draw Detection** - Automatic game end  
✅ **Reset Function** - Start new games easily  

## Game Modes

### Switch Modes
- Click **"2 Players"** button for local multiplayer
- Click **"vs AI"** button to play against computer

### Gameplay
1. Player X always starts
2. Click empty cells to make moves
3. Win by getting 3 in a row (horizontal, vertical, or diagonal)
4. Click "Reset Game" to play again

## Architecture

```
User Interface (renderer.js)
        ↓
Game Logic (game.js) ← → AI Logic (ai.js)
        ↓
Electron Window (main.js)
```

## Customization Tips

**Change colors**: Edit CSS variables in `styles.css`  
**Adjust window size**: Modify dimensions in `main.js`  
**Modify AI difficulty**: Adjust minimax depth in `ai.js` (currently optimal)

---

For detailed documentation, see **INSTRUCTIONS.md**
