# 🎮 Dungeon Typer — 8-Bit Retro Word Battle

<p align="center">
  <a href="https://dungeon-word-warrior.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/Vercel-Live_Demo-brightgreen?style=for-the-badge&logo=vercel" alt="Vercel Live Demo" />
  </a>
</p>

<p align="center">
  <a href="https://github.com/SaiVardhan337/Dungeon-Word-Warrior-/actions/workflows/ci.yml">
    <img src="https://github.com/SaiVardhan337/Dungeon-Word-Warrior-/actions/workflows/ci.yml/badge.svg" alt="CI Status" />
  </a>
  <img src="https://img.shields.io/badge/JavaScript-ES6+-yellow?style=flat-square&logo=javascript" alt="JavaScript" />
  <img src="https://img.shields.io/badge/HTML5-Canvas_&_DOM-orange?style=flat-square&logo=html5" alt="HTML5 Canvas" />
  <img src="https://img.shields.io/badge/CSS3-Retro_CRT_Cabinet-blue?style=flat-square&logo=css3" alt="CSS3 Styling" />
  <img src="https://img.shields.io/badge/Web_Audio-Procedural_Synth-red?style=flat-square" alt="Web Audio API" />
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="MIT License" />
  </a>
</p>

---

## 📖 Prologue
During a school field trip near the mysterious *Crystal Cave*, a modern student named **Arjun** wanders off. After a sudden slip, he collapses deep into the subterranean depths. Armed with nothing but his quick fingers, he must type his way out of **5 floors of a terrifying, monster-ridden dungeon**!

---

## ⚡ Key Features

### 🔀 Roguelike Branching Pathways
Between levels, Arjun can select between two randomized paths (*Lava Forge*, *Frozen Sanctum*, *Mystic Alcove*, *Chrono Vault*). Each path grants special perks (item scrolls, max HP boosts) alongside tactical challenges (speed increases, longer words).

### ⚔️ Active Item Magic Scrolls
Manage your resources and use inventory hotkeys or tap slots to escape dangerous situations:
*   **❄️ Freeze Scroll (`Key 1`)**: Dilates time, slowing all active falling words by 50% for 5 seconds with a frosted border glow.
*   **🔥 Fireball Scroll (`Key 2`)**: Detonates the lowest word on the screen in a particle explosion, dealing direct damage to the floor's monster.
*   **🛡️ Shield Potion (`Key 3`)**: Wraps Arjun in a glowing protective shield bubble, absorbing the next word collision (saving 20 HP).

### 📱 In-Game Retro Arcade Virtual Keyboard
Designed specifically for mobile web browsers to overcome native touch keyboard layout issues:
*   **Touch Optimization**: Displays a themed retro QWERTY arcade deck below the cabinet bezel.
*   **Raw Key Hooking**: Virtual button clicks pipe directly into main game loops without pulling up native software keyboards.

### 🎵 Dynamic & Melodic Web Audio Engine
*   **Zero Audio Files**: No network requests or MP3 files needed! Sound effects and chiptunes are synthesized on the fly.
*   **Melodic Typing Scale**: Keystrokes synthesize a rising pentatonic scale arpeggio (C4 to A5) for satisfying auditory feedback.
*   **Adaptive Tempo**: Background music tempo speeds up procedurally when words approach the danger line.

### 📈 Typing Performance & Analytics
*   **Real-time WPM Calculation**: Standardized Words Per Minute (`WPM = (correctKeys / 5) / (minutes)`).
*   **Accuracy Logging**: Tallies total keypresses against typos for accuracy percentages on level-clear overlays.

---

## 🕹️ Game Controls

| Control | Action |
| :--- | :--- |
| **Keyboard Keys** | Target and type letters in falling words |
| **`Space` / `Enter`** | Skip Cutscene panels / Advance screens |
| **`1`**, **`2`**, **`3`** | Use Freeze, Fireball, and Shield items |
| **`L` / `R` or Arrows** | Select Left or Right Path on Branch Choice screens |
| **`Escape` Key** | Pause / Resume gameplay |

---

## 🛠️ Tech Stack & Architecture

*   **HTML5 Canvas**: Handles character animations, word positioning, projectiles, dynamic lighting, and particle physics.
*   **Vanilla CSS**: Implements cabinet layouts, media queries, scanline screen animations, and mobile responsiveness.
*   **Vanilla JS**: Manages game state architecture:
    *   `audio.js` - Procedural sound synthesizers and adaptive tempo audio engine.
    *   `game.js` - Collision checks, roguelike branching, state machines, and typing mechanics.

---

## 📂 Project Structure & Examples

```
├── .github/workflows/ci.yml  # GitHub Actions CI Workflow
├── assets/                   # Pixel art sprites and cutscene images
├── examples/                 # Code snippets and standalone demos
│   ├── custom-wordlist.js    # How to inject custom vocabulary tiers
│   └── audio-synth-standalone.html # Standalone Web Audio synth demo
├── audio.js                  # Web Audio synthesizer engine
├── game.js                   # Main game state loop and canvas renderer
├── index.html                # Entry point and arcade cabinet UI
├── style.css                 # Retro CRT scanline styles & responsive rules
├── CONTRIBUTING.md           # Contribution guidelines & good first issues
└── LICENSE                   # MIT License
```

Check out the [`examples/`](examples/) directory for standalone usage examples and modular snippets.

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

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check out [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines and entry-level task ideas.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

### 📌 Recommended Repository Metadata for GitHub

* **Short Description**: 🎮 A story-driven 8-bit retro web typing game built with HTML5 Canvas, Vanilla JS, and Web Audio API. Features active magic scrolls, roguelike branching paths, adaptive music tempo, and a mobile arcade keyboard.
* **Topics/Tags**: `javascript` `game-development` `html5-canvas` `web-audio-api` `typing-game` `arcade` `retro-game` `mobile-friendly` `roguelike`
