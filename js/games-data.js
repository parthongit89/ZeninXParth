// Extracted Game Data & Metadata from Repositories and READMEs
export const gamesData = [
  {
    id: "blockrush",
    title: "BlockRush",
    subtitle: "2048 Advanced Python Game developed for Mathematics And Calculative Coders.",
    tags: ["PUZZLE", "BLOCK GAME", "MATH"],
    cardImage: "BLOCKRUSH_GAME_INFO/Rectangle 2.png",
    bannerImage: "BLOCKRUSH_GAME_INFO/Untitled design (1) 1.png",
    downloads: "1.4k+",
    views: "12.8k+",
    ratingVal: 4.9,
    ratingCount: 142,
    about: "BlockRush 2048 reimagines the classic mathematical sliding tile puzzle into an exhilarating, competitive cyber-arcade experience. Featuring dark glassmorphism aesthetics, dynamic board scaling from 2x2 up to 12x12, real-time Firebase Authentication, cross-platform cloud score persistence via Neon PostgreSQL, and competitive tier rankings.",
    features: [
      "Dynamic Grid Sizes (2x2 up to 12x12) with adaptive tile fonts and responsive spacing",
      "Sleek Cyberpunk UI / Glassmorphism with neon accents (#6366F1, #EC4899, #10B981)",
      "Competitive Progression & Rank Tiers from Bronze (0-999) to Immortal (50,000+)",
      "Dual Auth (Google & Email/Password) via Firebase Authentication",
      "Robust Cloud Sync powered by Neon Serverless PostgreSQL with local JSON fallback",
      "Fluid 60 FPS animations and synthesized dynamic SFX engine",
      "Cross-platform support: WebGL/HTML5 browser client and standalone Windows .exe"
    ],
    controls: [
      { key: "↑ ↓ ← → or W A S D", action: "Slide numbered tiles across the matrix" },
      { key: "Swipe (Mobile / Tablet)", action: "Slide tiles in touch direction" },
      { key: "R", action: "Trigger instant New Game restart" }
    ],
    techStack: [
      "Python 3.11", "Pygame Engine", "Flask 3.0 WSGI", "Neon PostgreSQL", "Firebase Auth v10", "Render Cloud", "itch.io WebGL"
    ],
    links: {
      download: "https://zeninxparth.itch.io/blockrush-2048",
      browser: "https://blockrush-2048.onrender.com/",
      github: "https://github.com/Ghostofzenin08/BlockRush_2048",
      itch: "https://zeninxparth.itch.io/blockrush-2048"
    },
    releaseDate: "14 Sept 2026"
  },
  {
    id: "meteor-dodge",
    title: "Meteor dodge",
    subtitle: "Meteor Space Dodge is a 2D arcade survival game built with Python and Pygame.",
    tags: ["ARCADE", "SPACE", "SURVIVAL"],
    cardImage: "METEOR_DODGE_info/Rectangle 7.png",
    bannerImage: "METEOR_DODGE_info/Untitled design (2).png",
    downloads: "920+",
    views: "8.4k+",
    ratingVal: 4.8,
    ratingCount: 98,
    about: "Meteor Space Dodge is a high-octane 2D arcade survival game built with Python and Pygame. Take control of your combat spaceship through a lethal asteroid sector, evade accelerating meteors, and compete for global leaderboard supremacy. Focused on instantaneous reflexes, precision collision dynamics, and escalating survival difficulty.",
    features: [
      "Responsive pilot-controlled spaceship with dynamic acceleration physics",
      "Procedurally generated incoming meteor clusters with increasing velocities",
      "Pixel-precise collision detection and multi-life shield endurance",
      "Dynamic high-score tracking and global leaderboard integration",
      "Increasing difficulty curve scaling with pilot survival duration",
      "Custom audio synthesizer, spatial laser SFX, and atmospheric soundtrack",
      "Deterministic 60 FPS gameplay engine optimized for low-latency reactions"
    ],
    controls: [
      { key: "W / ↑", action: "Thrust Forward / Move Up" },
      { key: "S / ↓", action: "Retrograde Thruster / Move Down" },
      { key: "A / ←", action: "Bank Left / Move Left" },
      { key: "D / →", action: "Bank Right / Move Right" },
      { key: "Space", action: "Engage / Restart Flight Loop" },
      { key: "Esc", action: "Exit Flight Simulator" }
    ],
    techStack: [
      "Python 3", "Pygame", "Flask & Flask-CORS", "Neon PostgreSQL", "Firebase Authentication", "JSON Local Cache"
    ],
    links: {
      download: "https://github.com/Ghostofzenin08/Meteor-Space-Dodge/releases",
      browser: "https://zeninxparth.itch.io/",
      github: "https://github.com/Ghostofzenin08/Meteor-Space-Dodge",
      itch: "https://zeninxparth.itch.io/"
    },
    releaseDate: "14 Sept 2026"
  }
];

export const marketplaceItems = [
  {
    id: "cyber-skin-pack",
    title: "Cyberpunk Neon Skin Pack",
    category: "SKIN PACK",
    game: "BlockRush 2048",
    price: "FREE",
    badge: "POPULAR",
    image: "BLOCKRUSH_GAME_INFO/Rectangle 2.png",
    tags: ["2048", "NEON", "THEME"],
    description: "Exclusive glowing dark glassmorphism theme for 2048 tile sets with reactive particle trails."
  },
  {
    id: "space-cruiser-v2",
    title: "Vortex Interceptor Hull",
    category: "SPACESHIP MODEL",
    game: "Meteor Space Dodge",
    price: "FREE",
    badge: "LEGENDARY",
    image: "METEOR_DODGE_info/Rectangle 7.png",
    tags: ["SPACESHIP", "SPRITE", "VFX"],
    description: "High-mobility interceptor sprite sheet with reactive engine glow and plasma exhaust effects."
  },
  {
    id: "retro-synth-ost",
    title: "Arcade Synthwave OST",
    category: "AUDIO / SFX",
    game: "ZeninXParth Collective",
    price: "FREE",
    badge: "EXCLUSIVE",
    image: "images/image 1.png",
    tags: ["AUDIO", "SYNTH", "LOSSLESS"],
    description: "Complete 8-track lossless synthesized game soundtrack and responsive UI sound kit."
  },
  {
    id: "crt-shader-pack",
    title: "Retro CRT Shader Overlay",
    category: "VISUAL FX",
    game: "All Releases",
    price: "FREE",
    badge: "NEW",
    image: "BLOCKRUSH_GAME_INFO/Untitled design (1) 1.png",
    tags: ["SHADER", "RETRO", "ARCADE"],
    description: "Scanline distortion and chromatic aberration filters built for Pygame and WebGL canvas."
  }
];

export const upcomingGames = [
  {
    id: "neon-drift",
    title: "Neon Drift: Cyber Odyssey",
    genre: "CYBER RACING / ACTION",
    eta: "Q4 2026",
    status: "IN DEVELOPMENT",
    image: "METEOR_DODGE_info/Untitled design (2).png",
    tags: ["RACING", "SYNTHWAVE", "DRIFT"],
    description: "High-speed synthwave physics racer with multiplayer drift rooms and modular vehicle tuning."
  },
  {
    id: "quantum-forge",
    title: "Quantum Forge",
    genre: "TACTICAL PUZZLE / ROGUELITE",
    eta: "Q1 2027",
    status: "PROTOTYPING",
    image: "BLOCKRUSH_GAME_INFO/Untitled design (1) 1.png",
    tags: ["PUZZLE", "QUANTUM", "STRATEGY"],
    description: "Turn-based quantum computation puzzle game pitting human intuition against recursive AI grids."
  }
];
