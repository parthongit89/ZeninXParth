// ZeninXParth Cyber-Arcade Main Application Controller
import { gamesData, marketplaceItems, upcomingGames } from "./games-data.js";
import { 
  loginWithGoogle, 
  logoutUser, 
  onUserChange, 
  getCurrentUser 
} from "./firebase-auth.js";

// State Management
let currentGameId = "blockrush";
let activeView = "explore";
let currentSearchTerm = "";

// DOM Elements
const viewExplore = document.getElementById("view-explore");
const viewGameDetail = document.getElementById("view-game-detail");
const viewMarketplace = document.getElementById("view-marketplace");
const viewNewGame = document.getElementById("view-newgame");
const viewContact = document.getElementById("view-contact");
const viewAbout = document.getElementById("view-about");
const viewUpcoming = document.getElementById("view-upcoming");

const gamesGrid = document.getElementById("games-grid");
const searchInput = document.getElementById("search-input");
const navItems = document.querySelectorAll(".nav-item");

// Detail Page Elements
const detailBackBtn = document.getElementById("detail-back-btn");
const detailBackTitle = document.getElementById("detail-back-title");
const detailBanner = document.getElementById("detail-banner-img");
const detailTags = document.getElementById("detail-tags");
const detailAbout = document.getElementById("detail-about");
const detailFeaturesList = document.getElementById("detail-features-list");
const detailDownloadBtn = document.getElementById("detail-download-btn");
const detailPlayBtn = document.getElementById("detail-play-btn");
const detailGithubLink = document.getElementById("detail-github-link");
const detailItchLink = document.getElementById("detail-itch-link");
const detailStatDownloads = document.getElementById("stat-downloads-val");
const detailStatViews = document.getElementById("stat-views-val");
const detailStatRatings = document.getElementById("stat-ratings-val");

// Rating & Comments
const starsContainer = document.getElementById("ratings-stars-container");
const ratingFeedback = document.getElementById("ratings-feedback");
const commentInput = document.getElementById("comment-input");
const addCommentBtn = document.getElementById("add-comment-btn");
const commentsFeed = document.getElementById("comments-feed");

// Auth Elements
const authCard = document.getElementById("auth-card");
const authAvatar = document.getElementById("auth-avatar");
const authName = document.getElementById("auth-name");
const btnSignIn = document.getElementById("btn-sign-in");
const btnSignOut = document.getElementById("btn-sign-out");
const mobileNavToggle = document.getElementById("mobile-nav-toggle");
const sidebar = document.querySelector(".sidebar");

// Global Toast System
export function showToast(message) {
  let container = document.getElementById("cyber-toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "cyber-toast-container";
    container.className = "cyber-toast-container";
    document.body.appendChild(container);
  }
  const toast = document.createElement("div");
  toast.className = "cyber-toast";
  toast.innerHTML = `
    <span class="toast-dot"></span>
    <span class="toast-msg">${message}</span>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("fade-out");
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}
window.showToast = showToast;

// Initialize Application
function initApp() {
  renderExploreCards(gamesData);
  renderMarketplaceCards();
  renderUpcomingCards();
  setupNavigation();
  setupSearch();
  setupRatings();
  setupComments();
  setupAuth();
  setupMobileToggle();
  setupSubmissionForm();
  setupContactForm();
}

// --------------------------------------------------------------------------
// Navigation & Routing
// --------------------------------------------------------------------------
function setupNavigation() {
  navItems.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetView = btn.getAttribute("data-view");
      navigateTo(targetView);
    });
  });

  if (detailBackBtn) {
    detailBackBtn.addEventListener("click", () => {
      navigateTo("explore");
    });
  }

  // Brand logo click returns to explore
  const brandLogos = document.querySelectorAll(".brand-container, .top-center-emblem");
  brandLogos.forEach((el) => {
    el.addEventListener("click", () => navigateTo("explore"));
  });
}

export function navigateTo(viewName) {
  activeView = viewName;

  // Update nav active styling
  navItems.forEach((btn) => {
    if (btn.getAttribute("data-view") === viewName) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Hide all views
  const allViews = [
    viewExplore, 
    viewGameDetail, 
    viewMarketplace, 
    viewNewGame, 
    viewContact, 
    viewAbout, 
    viewUpcoming
  ];
  allViews.forEach((v) => {
    if (v) v.classList.remove("active-view");
  });

  // Show target view
  const targetMap = {
    "explore": viewExplore,
    "game-detail": viewGameDetail,
    "marketplace": viewMarketplace,
    "newgame": viewNewGame,
    "contact": viewContact,
    "about": viewAbout,
    "upcoming": viewUpcoming
  };

  if (targetMap[viewName]) {
    targetMap[viewName].classList.add("active-view");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Close mobile sidebar if open
  if (sidebar && sidebar.classList.contains("open")) {
    sidebar.classList.remove("open");
  }
}
window.navigateTo = navigateTo;

// --------------------------------------------------------------------------
// Render View 1: Explore Latest Release Cards (Figma Frame 1)
// --------------------------------------------------------------------------
function renderExploreCards(games) {
  if (!gamesGrid) return;
  gamesGrid.innerHTML = "";

  if (games.length === 0) {
    gamesGrid.innerHTML = `
      <div style="grid-column: 1/-1; padding: 40px; text-align: center; color: var(--text-white-55);">
        No releases found matching "${currentSearchTerm}".
      </div>
    `;
    return;
  }

  games.forEach((game) => {
    const card = document.createElement("article");
    card.className = "game-card";
    card.setAttribute("data-id", game.id);

    const tagsHtml = game.tags.map((t) => `<span>${t}</span>`).join(" ");

    card.innerHTML = `
      <div class="card-image-wrap" style="cursor: pointer;">
        <span class="card-status-badge">LIVE RELEASE</span>
        <img src="${game.cardImage}" alt="${game.title}" class="card-image" loading="lazy" />
      </div>
      <div class="card-body">
        <h3 class="card-title">${game.title}</h3>
        <p class="card-desc">${game.subtitle}</p>
      </div>
      <div class="card-tags">
        ${tagsHtml}
      </div>
      <button class="btn-get" data-game-id="${game.id}">
        Get
      </button>
      <div class="card-platform-badges">
        <div class="badge-item" title="Ghostofzenin Native">
          <img src="images/image 6.png" alt="Ghostofzenin" onerror="this.src='images/image 1.png'" />
        </div>
        <div class="badge-item" title="itch.io Release">
          <img src="images/image 7.png" alt="itch.io" onerror="this.src='images/image 4.png'" />
        </div>
        <div class="badge-item" title="Render Cloud Production">
          <img src="images/image 8.png" alt="Render" onerror="this.src='images/image 1.png'" />
        </div>
      </div>
    `;

    // Click on "Get" button opens detail view
    const getBtn = card.querySelector(".btn-get");
    getBtn.addEventListener("click", () => openGameDetail(game.id));

    // Click on cover image opens detail view
    const imgWrap = card.querySelector(".card-image-wrap");
    imgWrap.addEventListener("click", () => openGameDetail(game.id));

    gamesGrid.appendChild(card);
  });
}

// --------------------------------------------------------------------------
// Render View 2: Game Detail Page (Figma Frame 2)
// --------------------------------------------------------------------------
export function openGameDetail(gameId) {
  const game = gamesData.find((g) => g.id === gameId);
  if (!game) return;

  currentGameId = gameId;

  // Set Back Navigation Title
  if (detailBackTitle) detailBackTitle.textContent = game.title;

  // Set Hero Banner
  if (detailBanner) {
    detailBanner.src = game.bannerImage;
    detailBanner.alt = game.title;
  }

  // Set Stats
  if (detailStatDownloads) detailStatDownloads.textContent = game.downloads;
  if (detailStatViews) detailStatViews.textContent = game.views;
  if (detailStatRatings) detailStatRatings.textContent = game.ratingVal.toFixed(1);

  // Set Tags
  if (detailTags) {
    detailTags.innerHTML = game.tags.map((t) => `<span>${t}</span>`).join(" &nbsp; ");
  }

  // Set About Description
  if (detailAbout) detailAbout.textContent = game.about;

  // Set Features List
  if (detailFeaturesList) {
    detailFeaturesList.innerHTML = game.features.map((f) => `<li>${f}</li>`).join("");
  }

  // Set Action Buttons
  if (detailDownloadBtn) {
    detailDownloadBtn.href = game.links.download;
    detailDownloadBtn.target = "_blank";
  }
  if (detailPlayBtn) {
    detailPlayBtn.href = game.links.browser;
    detailPlayBtn.target = "_blank";
  }

  // Set Release Link Cards
  if (detailGithubLink) detailGithubLink.href = game.links.github;
  if (detailItchLink) detailItchLink.href = game.links.itch;

  // Refresh Ratings & Comments
  loadGameRating(gameId);
  loadGameComments(gameId);

  // Navigate
  navigateTo("game-detail");
}
window.openGameDetail = openGameDetail;

// --------------------------------------------------------------------------
// Render Market Place Cards (Same Unified Gaming Card Theme)
// --------------------------------------------------------------------------
function renderMarketplaceCards() {
  const container = document.getElementById("marketplace-grid");
  if (!container) return;
  container.innerHTML = "";

  marketplaceItems.forEach((item) => {
    const card = document.createElement("article");
    card.className = "game-card";

    const tagsHtml = item.tags.map((t) => `<span>${t}</span>`).join(" ");

    card.innerHTML = `
      <div class="card-image-wrap">
        <span class="card-status-badge">${item.badge}</span>
        <img src="${item.image}" alt="${item.title}" class="card-image" loading="lazy" />
      </div>
      <div class="card-body">
        <span style="font-size: 13px; color: var(--accent-red); font-weight: 700; text-transform: uppercase;">${item.category}</span>
        <h3 class="card-title" style="margin-top: 4px;">${item.title}</h3>
        <p class="card-desc">${item.description}</p>
      </div>
      <div class="card-tags">
        ${tagsHtml}
      </div>
      <button class="btn-get" onclick="showToast('Asset Pack &quot;${item.title}&quot; acquired! Added to your game inventory.')">
        Acquire &bull; ${item.price}
      </button>
      <div class="card-platform-badges">
        <div class="badge-item" title="Ghostofzenin Verified">
          <img src="images/image 6.png" alt="Ghostofzenin" onerror="this.src='images/image 1.png'" />
        </div>
        <div class="badge-item" title="itch.io Ready">
          <img src="images/image 7.png" alt="itch.io" onerror="this.src='images/image 4.png'" />
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

// --------------------------------------------------------------------------
// Render Upcoming Games Cards (Same Unified Gaming Card Theme)
// --------------------------------------------------------------------------
function renderUpcomingCards() {
  const container = document.getElementById("upcoming-grid");
  if (!container) return;
  container.innerHTML = "";

  upcomingGames.forEach((game) => {
    const card = document.createElement("article");
    card.className = "game-card";

    const tagsHtml = game.tags.map((t) => `<span>${t}</span>`).join(" ");

    card.innerHTML = `
      <div class="card-image-wrap">
        <span class="card-status-badge">${game.status}</span>
        <img src="${game.image}" alt="${game.title}" class="card-image" loading="lazy" />
      </div>
      <div class="card-body">
        <span style="font-size: 13px; color: var(--accent-red); font-weight: 700;">ETA: ${game.eta}</span>
        <h3 class="card-title" style="margin-top: 4px;">${game.title}</h3>
        <p class="card-desc">${game.description}</p>
      </div>
      <div class="card-tags">
        ${tagsHtml}
      </div>
      <button class="btn-get" onclick="showToast('Subscribed! You will receive launch alerts for ${game.title}.')">
        Pre-Register Now
      </button>
      <div class="card-platform-badges">
        <div class="badge-item" title="Ghostofzenin Next-Gen">
          <img src="images/image 6.png" alt="Ghostofzenin" onerror="this.src='images/image 1.png'" />
        </div>
        <div class="badge-item" title="Multiplatform">
          <img src="images/image 8.png" alt="Render" onerror="this.src='images/image 1.png'" />
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

// --------------------------------------------------------------------------
// Search Functionality
// --------------------------------------------------------------------------
function setupSearch() {
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    currentSearchTerm = e.target.value.trim().toLowerCase();
    if (!currentSearchTerm) {
      renderExploreCards(gamesData);
      return;
    }

    const filtered = gamesData.filter((g) => {
      const matchTitle = g.title.toLowerCase().includes(currentSearchTerm);
      const matchDesc = g.subtitle.toLowerCase().includes(currentSearchTerm);
      const matchTags = g.tags.some((t) => t.toLowerCase().includes(currentSearchTerm));
      return matchTitle || matchDesc || matchTags;
    });

    renderExploreCards(filtered);
    if (activeView !== "explore") {
      navigateTo("explore");
    }
  });
}

// --------------------------------------------------------------------------
// Ratings System (5 Interactive Stars)
// --------------------------------------------------------------------------
function setupRatings() {
  if (!starsContainer) return;

  starsContainer.innerHTML = "";
  for (let i = 1; i <= 5; i++) {
    const btn = document.createElement("button");
    btn.className = "star-btn";
    btn.setAttribute("data-star", i);
    btn.setAttribute("aria-label", `Rate ${i} Stars`);
    btn.innerHTML = `
      <svg viewBox="0 0 24 24">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    `;

    btn.addEventListener("click", () => {
      saveRating(currentGameId, i);
      showToast(`Rating of ${i} / 5 stars recorded!`);
    });

    btn.addEventListener("mouseenter", () => highlightStars(i));
    starsContainer.appendChild(btn);
  }

  starsContainer.addEventListener("mouseleave", () => {
    const saved = getSavedRating(currentGameId);
    highlightStars(saved || 0);
  });
}

function highlightStars(score) {
  if (!starsContainer) return;
  const starButtons = starsContainer.querySelectorAll(".star-btn");
  starButtons.forEach((btn, index) => {
    if (index < score) {
      btn.classList.add("filled");
    } else {
      btn.classList.remove("filled");
    }
  });
}

function saveRating(gameId, score) {
  localStorage.setItem(`zenin_rating_${gameId}`, score);
  highlightStars(score);
  if (ratingFeedback) {
    ratingFeedback.textContent = `Thanks! You gave this game a rating of ${score} / 5 stars.`;
  }
}

function getSavedRating(gameId) {
  const val = localStorage.getItem(`zenin_rating_${gameId}`);
  return val ? parseInt(val, 10) : 0;
}

function loadGameRating(gameId) {
  const saved = getSavedRating(gameId);
  highlightStars(saved);
  if (ratingFeedback) {
    if (saved) {
      ratingFeedback.textContent = `Your rating: ${saved} / 5 stars`;
    } else {
      ratingFeedback.textContent = "Rate your satisfaction (1 to 5 stars)";
    }
  }
}

// --------------------------------------------------------------------------
// Comments Section
// --------------------------------------------------------------------------
const defaultComments = {
  "blockrush": [
    {
      id: "c1",
      author: "Harshal Sonawane (Ghostofzenin08)",
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Ghostofzenin08",
      text: "Welcome to BlockRush 2048! Try the 12x12 grid mode if you dare. Real-time Neon PostgreSQL leaderboards are active.",
      time: "14 Sept 2026, 12:00"
    },
    {
      id: "c2",
      author: "Parth Sonavane (Parthongit89)",
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Parthongit89",
      text: "Render production backend with WSGI and Google Firebase auth is running at full speed.",
      time: "14 Sept 2026, 14:30"
    }
  ],
  "meteor-dodge": [
    {
      id: "c3",
      author: "Harshal Sonawane (Ghostofzenin08)",
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Ghostofzenin08",
      text: "Meteor clusters increase in velocity after 45 seconds of survival time. Keep your thrusters active!",
      time: "14 Sept 2026, 13:15"
    }
  ]
};

function setupComments() {
  if (addCommentBtn && commentInput) {
    addCommentBtn.addEventListener("click", handleAddComment);
    commentInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleAddComment();
      }
    });
  }
}

function handleAddComment() {
  const text = commentInput.value.trim();
  if (!text) return;

  const user = getCurrentUser();
  const authorName = user ? user.displayName : "Anonymous Pilot";
  const avatar = user ? user.photoURL : "https://api.dicebear.com/7.x/bottts/svg?seed=Pilot";

  const newComment = {
    id: "c_" + Date.now(),
    author: authorName,
    avatar: avatar,
    text: text,
    time: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })
  };

  const key = `zenin_comments_${currentGameId}`;
  const existing = JSON.parse(localStorage.getItem(key) || "[]");
  existing.unshift(newComment);
  localStorage.setItem(key, JSON.stringify(existing));

  commentInput.value = "";
  loadGameComments(currentGameId);
  showToast("Comment transmitted successfully!");
}

function loadGameComments(gameId) {
  if (!commentsFeed) return;
  const key = `zenin_comments_${gameId}`;
  let userComments = JSON.parse(localStorage.getItem(key) || "[]");
  const defaults = defaultComments[gameId] || [];

  const allComments = [...userComments, ...defaults];

  if (allComments.length === 0) {
    commentsFeed.innerHTML = `
      <div style="color: var(--text-white-35); font-size: 14px; padding: 12px 0;">
        No comments yet. Be the first to share your review!
      </div>
    `;
    return;
  }

  commentsFeed.innerHTML = allComments.map((c) => `
    <div class="comment-card">
      <img src="${c.avatar}" alt="${c.author}" class="comment-user-img" />
      <div class="comment-content">
        <div class="comment-header">
          <span class="comment-author">${c.author}</span>
          <span class="comment-time">${c.time}</span>
        </div>
        <p class="comment-body-text">${escapeHtml(c.text)}</p>
      </div>
    </div>
  `).join("");
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// --------------------------------------------------------------------------
// Firebase Authentication HUD
// --------------------------------------------------------------------------
function setupAuth() {
  if (btnSignIn) {
    btnSignIn.addEventListener("click", async () => {
      try {
        await loginWithGoogle();
        showToast("Signed in via Google successfully!");
      } catch (err) {
        console.error("Login trigger failed:", err);
      }
    });
  }

  if (btnSignOut) {
    btnSignOut.addEventListener("click", async () => {
      await logoutUser();
      showToast("Signed out of session.");
    });
  }

  onUserChange((user) => {
    if (user) {
      if (authCard) authCard.style.display = "flex";
      if (authAvatar) authAvatar.src = user.photoURL;
      if (authName) authName.textContent = user.displayName;
      if (btnSignIn) btnSignIn.style.display = "none";
      if (btnSignOut) btnSignOut.style.display = "flex";
    } else {
      if (authCard) authCard.style.display = "none";
      if (btnSignIn) btnSignIn.style.display = "flex";
      if (btnSignOut) btnSignOut.style.display = "none";
    }
  });
}

// --------------------------------------------------------------------------
// Submission & Contact Form Handlers
// --------------------------------------------------------------------------
function setupSubmissionForm() {
  const form = document.getElementById("submission-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    showToast("Game build submitted! Our engineering team will review it within 24 hours.");
    form.reset();
  });
}

function setupContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    showToast("Transmission dispatched! We will reply to your flight console shortly.");
    form.reset();
  });
}

// --------------------------------------------------------------------------
// Mobile Navigation Toggle
// --------------------------------------------------------------------------
function setupMobileToggle() {
  if (mobileNavToggle && sidebar) {
    mobileNavToggle.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  }
}

// Boot
document.addEventListener("DOMContentLoaded", initApp);
