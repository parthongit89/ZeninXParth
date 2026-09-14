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

// Initialize Application
function initApp() {
  renderExploreCards(gamesData);
  renderMarketplace();
  renderUpcoming();
  setupNavigation();
  setupSearch();
  setupRatings();
  setupComments();
  setupAuth();
  setupMobileToggle();
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
  if (viewName === "explore" && viewExplore) {
    viewExplore.classList.add("active-view");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else if (viewName === "game-detail" && viewGameDetail) {
    viewGameDetail.classList.add("active-view");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else if (viewName === "marketplace" && viewMarketplace) {
    viewMarketplace.classList.add("active-view");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else if (viewName === "newgame" && viewNewGame) {
    viewNewGame.classList.add("active-view");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else if (viewName === "contact" && viewContact) {
    viewContact.classList.add("active-view");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else if (viewName === "about" && viewAbout) {
    viewAbout.classList.add("active-view");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else if (viewName === "upcoming" && viewUpcoming) {
    viewUpcoming.classList.add("active-view");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Close mobile sidebar if open
  if (sidebar && sidebar.classList.contains("open")) {
    sidebar.classList.remove("open");
  }
}

// --------------------------------------------------------------------------
// Render View 1: Explore Latest Release Cards
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
      <div class="card-image-wrap">
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
    getBtn.addEventListener("click", () => {
      openGameDetail(game.id);
    });

    // Click on cover image also opens detail view
    const imgWrap = card.querySelector(".card-image-wrap");
    imgWrap.style.cursor = "pointer";
    imgWrap.addEventListener("click", () => {
      openGameDetail(game.id);
    });

    gamesGrid.appendChild(card);
  });
}

// --------------------------------------------------------------------------
// Render View 2: Game Detail Page
// --------------------------------------------------------------------------
export function openGameDetail(gameId) {
  const game = gamesData.find((g) => g.id === gameId);
  if (!game) return;

  currentGameId = gameId;

  // Set Back Navigation Title
  if (detailBackTitle) {
    detailBackTitle.textContent = game.title;
  }

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
  if (detailAbout) {
    detailAbout.textContent = game.about;
  }

  // Set Feature Highlights from README
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
  if (detailGithubLink) {
    detailGithubLink.href = game.links.github;
  }
  if (detailItchLink) {
    detailItchLink.href = game.links.itch;
  }

  // Refresh Ratings & Comments for this game
  loadGameRating(gameId);
  loadGameComments(gameId);

  // Navigate to Detail View
  navigateTo("game-detail");
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
    });

    btn.addEventListener("mouseenter", () => {
      highlightStars(i);
    });

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
      } catch (err) {
        console.error("Login trigger failed:", err);
      }
    });
  }

  if (btnSignOut) {
    btnSignOut.addEventListener("click", async () => {
      await logoutUser();
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
// Secondary Views Rendering
// --------------------------------------------------------------------------
function renderMarketplace() {
  const container = document.getElementById("marketplace-grid");
  if (!container) return;

  container.innerHTML = marketplaceItems.map((item) => `
    <div class="market-item-card">
      <div class="market-img-wrap">
        <img src="${item.image}" alt="${item.title}" />
      </div>
      <div>
        <span style="font-size: 12px; color: var(--accent-red); font-weight: 600;">${item.category}</span>
        <h4 style="font-size: 18px; margin: 4px 0 8px; color: var(--text-white);">${item.title}</h4>
        <p style="font-size: 13px; color: var(--text-white-55);">${item.description}</p>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto;">
        <span style="font-size: 16px; font-weight: 700; color: #10B981;">${item.price}</span>
        <button class="btn-sidebar-auth" style="width: auto; padding: 6px 14px; font-size: 13px;" onclick="alert('Asset Pack acquired! Added to your game inventory.')">Acquire</button>
      </div>
    </div>
  `).join("");
}

function renderUpcoming() {
  const container = document.getElementById("upcoming-grid");
  if (!container) return;

  container.innerHTML = upcomingGames.map((game) => `
    <div class="market-item-card">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 12px; color: var(--accent-red); font-weight: 600;">${game.genre}</span>
        <span style="font-size: 12px; color: #F59E0B; background: rgba(245, 158, 11, 0.1); padding: 3px 8px; border-radius: 4px;">${game.status}</span>
      </div>
      <h4 style="font-size: 22px; color: var(--text-white); margin-top: 6px;">${game.title}</h4>
      <p style="font-size: 14px; color: var(--text-white-55); line-height: 1.5;">${game.description}</p>
      <div style="margin-top: 10px; font-size: 13px; color: var(--text-white-35);">
        Expected Release: <strong style="color: var(--text-white);">${game.eta}</strong>
      </div>
    </div>
  `).join("");
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
