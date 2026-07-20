# 🤝 Contributing to Dungeon Typer

Thank you for considering contributing to **Dungeon Typer**! We welcome bug reports, feature suggestions, documentation updates, and pull requests to help make this project even better.

---

## 🚀 Getting Started

1. **Fork the Repository**: Click the **Fork** button at the top-right of this repository.
2. **Clone your Fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Dungeon-Word-Warrior-.git
   cd Dungeon-Word-Warrior-
   ```
3. **Run Locally**:
   No installation or npm dependencies are required! Simply open `index.html` in your browser or run a local HTTP server:
   ```bash
   python3 -m http.server 8000
   ```
   Navigate to `http://localhost:8000`.

---

## 🛠️ Code Conventions

*   **Pure Vanilla Stack**: Keep code modular using ES6+ JavaScript, clean HTML5 Canvas API calls, and modern Vanilla CSS. Avoid unnecessary npm dependencies or heavy build frameworks.
*   **Web Audio Standard**: All audio sound effects must be procedurally synthesized using `AudioContext` in `audio.js` without relying on external `.mp3` or `.wav` media files.
*   **Performance**: Ensure high FPS on HTML5 Canvas by avoiding layout thrashing inside rendering loops.

---

## 🎯 Good First Issue Ideas

Looking for a place to start? Here are great entry-level ideas for new contributors:

- [ ] **Custom Word Tiers**: Add new thematic word banks (e.g., Space Exploration, Cyberpunk, Mythology).
- [ ] **Particle Effects**: Add new visual particle burst colors or trail shapes when casting spells.
- [ ] **Sound Synthesizers**: Add a new synthesized sound effect for level transitions or critical hits.
- [ ] **Accessibility (A11y)**: Improve keyboard navigation or high-contrast mode toggles.
- [ ] **UI Polish**: Add new CRT monitor bezel color themes or toggleable scanline intensity.

---

## 📬 Submitting a Pull Request (PR)

1. Create a descriptive feature branch:
   ```bash
   git checkout -b feature/awesome-new-tier
   ```
2. Commit your changes with clear commit messages:
   ```bash
   git commit -m "Add Cyberpunk word bank tier to LEVEL_TIERS"
   ```
3. Push to your branch and submit a Pull Request to `main`.
4. GitHub Actions CI will automatically run syntax checks on your PR.

---

## 📄 License
By contributing to Dungeon Typer, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).
