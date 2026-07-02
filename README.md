# Dungeon Typer — 8-Bit Retro Word Battle

Dungeon Typer is a story-driven, vibrant 8-bit retro web typing game built entirely with HTML, CSS, and Vanilla JavaScript. 

Follow Arjun, a student who wanders off during a school field trip near the Crystal Cave, collapses into the depths, and must battle his way out of 5 floors of a terrifying dungeon by typing falling words.

## 🎮 Play the Game
To run the game locally, open the entry file in any modern web browser:
👉 **[index.html](index.html)** (or serve it using a local HTTP server).

---

## 🚀 Features

- **Story-Rich Cutscene**: A 5-panel interactive prologue with retro typewriter text effects and canvas-cropped pixel art panels detailing Arjun's fall.
- **5 Progressive Floors**:
  - **Floor 1**: Slime Sprout (Easy 3–4 letter words)
  - **Floor 2**: Skeleton Sentry (Medium 5–6 letter words + speed increase)
  - **Floor 3**: Crypt Ghoul (Challenging 6–8 letter words + speed increase)
  - **Floor 4**: Vampire Bat (Complex 8–10 letter words + speed increase)
  - **Floor 5**: The Ancient Overlord (Boss 10–12 letter words + boss speeds!)
- **Dynamic Speed & Color Themes**: Words fall progressively faster starting from Floor 2. Dungeon backgrounds shift colors dramatically using canvas filters (72° hue-rotation per level).
- **Hero Progress & Auras**: Arjun levels up upon clearing each floor, gaining health and power-ups. High floors unlock visual legendary outline auras for Arjun and the bosses.
- **Audio Synthesizer & Chiptunes**: Real-time sound effects (clicks, hurts, hits, victories) and a looping retro background music track built entirely on the Web Audio API (no external audio files required!).
- **Arcade Bezel & CRT Effects**: Styling features curved glass overlays, subtle screen flicker, and retro scanline animations.
- **Pause System**: Toggle pause at any time by pressing **`Escape`** or clicking the **`PAUSE [ESC]`** HUD button.

---

## 🕹️ Controls

- **Type Falling Letters**: Matches and locks onto target words.
- **Space / Enter**: Advances through cutscene slides or level-clear stats.
- **Escape Key / PAUSE button**: Toggles game pause.
- **Click anywhere during pause**: Resumes gameplay.

---

## 📂 Project Structure

- `index.html` - Entry point and retro arcade cabinet layout.
- `style.css` - CRT filter screen overlay and cabin styles.
- `game.js` - Main loop, rendering pipeline, and word logic.
- `audio.js` - Synthesizers and chiptune background music player.
- `assets/` - Image folders (prologue scenes, hero sprite, and monster sprites).
