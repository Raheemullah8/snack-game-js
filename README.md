# Snake Game JS

Simple Snake Game built with HTML, CSS, and JavaScript.

## Project Files
- `index.html` - Game layout and HUD (Score, High-Score, Time)
- `style.css` - Styling for board, HUD, and modals
- `script.js` - Game logic (movement, food, timer, score, restart, localStorage)

## How to Run
1. Open the project folder.
2. Open `index.html` in your browser.
3. Click **Start Game**.

## Controls
- Arrow Left: Move left
- Arrow Right: Move right
- Arrow Up: Move up
- Arrow Down: Move down

## Game Rules
- Snake moves every 400ms.
- Eat food to gain **10 points**.
- If snake hits wall, game over modal appears.
- Click **Restart Game** to reset and start again.

## Score System
- **Score** increases by 10 per food.
- **High-Score** is saved in browser localStorage.
- High-score updates immediately when current score is greater than stored high-score.

## Time System
- Timer starts when game starts.
- Timer updates every 1 second in `m:ss` format (for example `0:07`, `1:25`).
- Timer resets to `0:00` on restart.

## Restart Behavior
On restart:
- Existing movement and timer intervals are cleared.
- Board state is cleaned.
- Snake resets to initial position.
- New food position is generated.
- Score and time reset.
- Game loops start again.

## Notes
- High-score is read from localStorage key `highScore` (legacy key `high-score` is also supported).
- If high-score does not appear, clear browser cache/localStorage once and start a new game.
