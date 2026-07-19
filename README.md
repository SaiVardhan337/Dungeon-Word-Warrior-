# 🎮 Dungeon Typer — 8-Bit Retro Word Battle

<p align="center">
  <a href="https://dungeon-word-warrior.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/Vercel-Live_Demo-brightgreen?style=for-the-badge&logo=vercel" alt="Vercel Live Demo" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-ES6+-yellow?style=flat-square&logo=javascript" alt="JavaScript" />
  <img src="https://img.shields.io/badge/HTML5-Canvas_&_DOM-orange?style=flat-square&logo=html5" alt="HTML5 Canvas" />
  <img src="https://img.shields.io/badge/CSS3-Retro_CRT_Cabinet-blue?style=flat-square&logo=css3" alt="CSS3 Styling" />
  <img src="https://img.shields.io/badge/Web_Audio-Procedural_Synth-red?style=flat-square" alt="Web Audio API" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="MIT License" />
</p>

---

## 📖 Prologue
During a school field trip near the mysterious *Crystal Cave*, a modern student named **Arjun** wanders off. After a sudden slip, he collapses deep into the subterranean depths. Armed with nothing but his quick fingers, he must type his way out of **5 floors of a terrifying, monster-ridden dungeon**!

---

## ⚡ Key Features

### ⚔️ Active Item Magic Scrolls
Manage your resources and use inventory hotkeys to escape dangerous situations:
*   **❄️ Freeze Scroll (`Key 1`)**: Dilates time, slowing all active falling words by 50% for 5 seconds. Emits an animated frosty border overlay and custom countdown timer.
*   **🔥 Fireball Scroll (`Key 2`)**: Detonates the lowest word on the screen in a burst of particles, dealing direct damage to the floor's monster.
*   **🛡️ Shield Potion (`Key 3`)**: Wraps Arjun in a glowing, pulsing protective shield bubble, absorbing the next word collision (saving 20 HP).

### 📱 In-Game Retro Arcade Virtual Keyboard
Designed specifically for mobile web browsers to overcome the native keyboard layout issues:
*   **Touch Optimization**: Displays a themed retro QWERTY arcade deck below the cabinet bezel.
*   **Raw Key Hooking**: Virtual button clicks are piped directly into the main game loops, allowing full typing mechanics and cutscene advancement without pulling up the native mobile keyboard (which would otherwise block the canvas).
*   **Tappable Hotbar**: Slots can be tapped directly to use inventory items on touch devices.

### 🎵 100% Procedural Synthesizers (Web Audio API)
*   **Zero Audio Files**: No network requests or MP3 files needed! The game synthesizes all sound effects and chiptunes on-the-fly.
*   **Chiptune Music Loop**: A looping sequencer plays background tracks that shift and pitch up dynamically as Arjun descends further into the cave.
*   **Custom Sound Effects**: Programmable synthesis curves for typing clicks, sword hits, shield activation, explosion rumbles, and chiptune fanfare.

### 📈 Typing Performance & Analytics
*   **Real-time WPM Calculation**: Tracks raw key inputs to calculate standardized Words Per Minute (`WPM = (correctKeys / 5) / (minutes)`).
*   **Accuracy Logging**: Tallies total keyboard keypresses against errors to show accuracy percentage.
*   **Summary Overlay**: Displays clean stats on every level-clear overlay.

### 📺 Visual Arcade Styling & CRT Filters
*   **CRT Scanlines**: Overlay layers with scanlines and glowing curved glass borders to simulate a classic arcade console screen.
*   **Dynamic Hue-Rotation**: Background visuals shift color palettes dynamically using high-performance CSS canvas filters.

---

## 🕹️ Game Controls

| Control | Action |
| :--- | :--- |
| **Keyboard Keys** | Target and type letters in the falling words |
| **`Space` / `Enter`** | Skip Cutscene panels / Advance screens |
| **`1`**, **`2`**, **`3`** | Use Freeze, Fireball, and Shield items |
| **`Escape` Key** | Pause / Resume gameplay |

---

## 🛠️ Tech Stack & Architecture

*   **HTML5 Canvas**: Handles character animations, word positioning, projectiles, and particle physics.
*   **Vanilla CSS**: Implements cabinet layouts, media queries, scanline screen animations, and mobile responsiveness.
*   **Vanilla JS**: Manages game state architecture:
    *   `audio.js` - Procedural sound synthesizers.
    *   `game.js` - Collision checks, state machines, and typing mechanics.

---

## 🚀 Running Locally

No complex package installation or build steps required. Simply serve the directory:

### Option A: Python HTTP Server (Built-in)
```bash
python3 -m http.server 8000
```
Then visit: `http://localhost:8000`

### Option B: Node Static Server
```bash
---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
