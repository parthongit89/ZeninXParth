# ZeninXParth

<div align="center">

![ZeninXParth Logo](images/image%201.png)
hi
### *Cyber-Arcade Gaming Platform & High-Performance Indie Development Lab*

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Firebase](https://img.shields.io/badge/Firebase-Google_Auth-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Render](https://img.shields.io/badge/Render-Live_Production-46E3B7?style=for-the-badge&logo=render&logoColor=black)](https://blockrush-2048.onrender.com)
[![itch.io](https://img.shields.io/badge/itch.io-Playable_Releases-FA5C5C?style=for-the-badge&logo=itch.io&logoColor=white)](https://zeninxparth.itch.io/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

---

### 🎮 **[Live Web Platform](http://localhost:8080)** &nbsp; | &nbsp; 🕹️ **[itch.io Collective](https://zeninxparth.itch.io/)** &nbsp; | &nbsp; 🎨 **[Figma Design System](https://www.figma.com/design/I0MbnU8Xks35mLwtkTcAKI/Projects?node-id=750-2&m=dev)**
</div>

---

## 📖 Overview

**ZeninXParth** is the official showcase, distribution network, and community platform for indie games developed by **Harshal Sonawane (`Ghostofzenin08`)** and **Parth Sonavane (`Parthongit89`)**. Built with dark obsidian glassmorphism, responsive cyber-red accents, and `Instrument Sans` typography, the platform brings together playable web builds, standalone desktop clients, live cloud score persistence, and Google Firebase Authentication.

---

## 🎨 Figma Design System & Specification

Developed in strict compliance with the official Figma Dev Mode specifications:
- **Explore / Latest Release**: [Figma Frame 1 (Node `750:3`)](https://www.figma.com/design/I0MbnU8Xks35mLwtkTcAKI/Projects?node-id=750-2&m=dev)
- **Game Details View**: [Figma Frame 2 (Node `761:211`)](https://www.figma.com/design/I0MbnU8Xks35mLwtkTcAKI/Projects?node-id=761-211&m=dev)

### Visual Tokens
- **Background**: `#000000` (Obsidian Black)
- **Primary Accent**: `#ff0207` (Ghostofzenin Signature Red)
- **Typography**: Google Font `Instrument Sans` (Weights: 400 Regular, 500 Medium, 600 SemiBold, 700 Bold)
- **Text Opacity Stops**:
  - `0.85` — Headings, Dev Names, and Primary Labels
  - `0.55` — Subtitles, Search Placeholder, and Dates
  - `0.25` — Game Category Tags and Capsule Borders
- **Sidebar Dimensions**: `330px` width, single `#ff0207` vertical border divider on right.

---

## 🕹️ Featured Games & Repositories

### 1. BlockRush 2048
> *Cyberpunk-Themed Competitive 2048 with Dynamic Grids, Progression Tiers, and Real-Time Cloud Sync*

- **Repository**: [Ghostofzenin08/BlockRush_2048](https://github.com/Ghostofzenin08/BlockRush_2048)
- **Live Play (Render WebGL)**: [https://blockrush-2048.onrender.com](https://blockrush-2048.onrender.com)
- **itch.io Release**: [https://zeninxparth.itch.io/blockrush-2048](https://zeninxparth.itch.io/blockrush-2048)
- **Core Features**:
  - **Dynamic Board Dimensions**: 2x2, 3x3, classic 4x4, up to massive 12x12 boards with adaptive font scaling.
  - **Progression Tiers**: Bronze, Silver, Gold, Platinum, Diamond, Master, and Immortal (50,000+ pts).
  - **Dual Auth & Cloud Sync**: Firebase Authentication paired with Neon Serverless PostgreSQL and local JSON fallback.
  - **Sound Synthesizer**: Procedural tile sliding, merging, and game-over SFX.
  - **Controls**: Arrow Keys, WASD, Touch Swipe on mobile, <kbd>R</kbd> to restart.

---

### 2. Meteor Space Dodge
> *High-Velocity 2D Arcade Space Survival Simulator*

- **Repository**: [Ghostofzenin08/Meteor-Space-Dodge](https://github.com/Ghostofzenin08/Meteor-Space-Dodge)
- **itch.io & Releases**: [https://zeninxparth.itch.io/](https://zeninxparth.itch.io/)
- **Core Features**:
  - **Dynamic Asteroid Field**: Procedurally generated meteor clusters with escalating velocities.
  - **Responsive Flight Loop**: Pilot-controlled spaceship with acceleration physics and multi-life shields.
  - **Deterministic 60 FPS**: Low-latency collision detection powered by Pygame.
  - **Controls**: <kbd>W</kbd>/<kbd>S</kbd>/<kbd>A</kbd>/<kbd>D</kbd> or Arrow Keys, <kbd>Space</kbd> to engage/restart, <kbd>Esc</kbd> to exit.

---

## 👥 Developers & Team Credits

### **ZeninXParth Teams**

#### **Ghostofzenin08 — Harshal Sonawane**
- GitHub: [@Ghostofzenin08](https://github.com/Ghostofzenin08)
- Specialized Roles:
  - `Game Developer`
  - `Game Graphics`
  - `Game Logistic`
  - `Game Analytics`

#### **Parthongit89 — Parth Sonavane**
- GitHub: [@parthongit89](https://github.com/parthongit89)
- Specialized Roles:
  - `Frontend Developer`
  - `Backend Developer`
  - `Deployment`

---

## 🛠️ Technology Stack & Strategy

Crafted in alignment with the [Project Strategies Prompt Engineering Specification](https://github.com/parthongit89/Project-Strategies-Prompt-engineering-):

```
                                  ┌───────────────────────────────┐
                                  │      ZeninXParth Platform     │
                                  └───────────────┬───────────────┘
                                                  │
                      ┌───────────────────────────┴───────────────────────────┐
                      ▼                                                       ▼
         ┌─────────────────────────┐                             ┌─────────────────────────┐
         │   Frontend Web Client   │                             │  Desktop Python/Pygame  │
         │   (HTML5 / CSS3 / JS)   │                             │   (Windows Standalone)  │
         └────────────┬────────────┘                             └────────────┬────────────┘
                      │                                                       │
                      │ (Firebase Google Auth & REST)                         │ (Local JSON & Sync)
                      ▼                                                       ▼
         ┌─────────────────────────────────────────────────────────────────────────────────┐
         │                    Cloud Backend & Serverless Persistence                       │
         │               (Render WSGI / Flask 3.0 / Neon PostgreSQL)                       │
         └─────────────────────────────────────────────────────────────────────────────────┘
```

| Layer | Technologies | Role |
| :--- | :--- | :--- |
| **Frontend Platform** | Semantic HTML5, Custom CSS3, Vanilla ES6+ JS | Zero-dependency, lightweight, ultra-fast client |
| **Authentication** | Google Firebase Auth v10+ (Google OAuth) | Pilot session management, persistent identity, reviews |
| **Cloud Database** | Neon Serverless PostgreSQL | High-availability cross-platform cloud score persistence |
| **Indie Game Engines** | Python 3.11, Pygame Engine | 60 FPS desktop arcade and WebGL game binaries |
| **Backend Services** | Flask 3.0 WSGI, Gunicorn, Flask-CORS | Production APIs hosted on Render |
| **Distribution** | itch.io, GitHub Releases, Render | Web and native Windows `.exe` downloads |


---

## 🚀 Running the Platform Locally

No build tools or heavy dependencies required. You can serve the project using any standard HTTP server:

```bash
# Clone the repository
git clone https://github.com/parthongit89/ZeninXParth.git
cd ZeninXParth

# Serve with Python:
python -m http.server 8080
```

Then visit **`http://localhost:8080`** in your browser.

---

## 📜 License

Distributed under the **MIT License**.
Crafted with passion by the **ZeninXParth** collective.