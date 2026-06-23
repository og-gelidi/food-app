// ==========================================
// PANTRYCHEF APPLICATION LOGIC
// ==========================================

// --- DEFAULT SEED DATA ---
const DEFAULT_KNOWN_INGREDIENTS = {
  "Garlic": 1,
  "Salt": 1,
  "Onions": 2,
  "Rice": 2,
  "Pasta": 2,
  "Eggs": 2,
  "Bread": 2,
  "Potatoes": 2,
  "Carrots": 2,
  "Ginger": 3,
  "Soy Sauce": 3,
  "Butter": 3,
  "Sesame Oil": 4,
  "Cheese": 4,
  "Olive Oil": 2,
  "Black Pepper": 1,
  "Chicken Breast": 6,
  "Minced Beef": 6,
  "Gochujang": 7,
  "Salmon": 8,
  "Milk": 3
};

const DEFAULT_INGREDIENTS = [
  { id: "ing-1", name: "Garlic", category: "Produce", qty: 8, unit: "pcs", expiry: getFutureDate(10) },
  { id: "ing-2", name: "Onions", category: "Produce", qty: 4, unit: "pcs", expiry: getFutureDate(14) },
  { id: "ing-3", name: "Rice", category: "Grains", qty: 1000, unit: "g", expiry: "" },
  { id: "ing-4", name: "Eggs", category: "Dairy", qty: 6, unit: "pcs", expiry: getFutureDate(5) },
  { id: "ing-5", name: "Soy Sauce", category: "Pantry", qty: 250, unit: "ml", expiry: "" },
  { id: "ing-6", name: "Sesame Oil", category: "Pantry", qty: 150, unit: "ml", expiry: "" },
  { id: "ing-7", name: "Salt", category: "Pantry", qty: 500, unit: "g", expiry: "" },
  { id: "ing-8", name: "Ginger", category: "Produce", qty: 1, unit: "pcs", expiry: getFutureDate(7) },
  // Out of stock items to test calculations
  { id: "ing-9", name: "Chicken Breast", category: "Proteins", qty: 0, unit: "g", expiry: "" },
  { id: "ing-10", name: "Gochujang", category: "Pantry", qty: 0, unit: "g", expiry: "" },
  { id: "ing-11", name: "Bread", category: "Grains", qty: 0, unit: "slices", expiry: "" },
  { id: "ing-12", name: "Butter", category: "Dairy", qty: 0, unit: "tbsp", expiry: "" }
];

const DEFAULT_RECIPES = [
  {
    id: "rec-1",
    name: "Simple Egg Fried Rice",
    category: "quick_easy",
    time: 15,
    flavour: 4,
    ease: 5,
    ingredients: [
      { name: "Rice", qty: 200, unit: "g" },
      { name: "Eggs", qty: 2, unit: "pcs" },
      { name: "Garlic", qty: 2, unit: "pcs" },
      { name: "Onions", qty: 0.5, unit: "pcs" },
      { name: "Soy Sauce", qty: 1.5, unit: "tbsp" },
      { name: "Sesame Oil", qty: 1, unit: "tsp" },
      { name: "Salt", qty: 1, unit: "pinch" }
    ],
    instructions: [
      "Finely chop garlic and onions.",
      "Beat eggs in a bowl with a tiny pinch of salt.",
      "Sauté garlic and onions in a hot pan with a splash of oil.",
      "Add cooked rice, stir fry for 3 minutes, then push to the side.",
      "Pour in eggs, scramble until soft, then combine with rice.",
      "Drizzle with soy sauce and sesame oil. Stir fry for another minute and serve."
    ]
  },
  {
    id: "rec-2",
    name: "Soy Garlic Chicken Bowl",
    category: "packed_lunch",
    time: 25,
    flavour: 4.5,
    ease: 4,
    ingredients: [
      { name: "Chicken Breast", qty: 300, unit: "g" },
      { name: "Garlic", qty: 4, unit: "pcs" },
      { name: "Soy Sauce", qty: 3, unit: "tbsp" },
      { name: "Rice", qty: 150, unit: "g" },
      { name: "Sesame Oil", qty: 1, unit: "tbsp" }
    ],
    instructions: [
      "Cube the chicken breast and place in a bowl.",
      "Mince the garlic and mix with soy sauce to marinate the chicken for 10 minutes.",
      "Cook the rice according to your preference.",
      "Heat sesame oil in a pan, sear chicken until cooked through and glaze caramelizes.",
      "Pack chicken over a bed of fluffy rice in your lunch container."
    ]
  },
  {
    id: "rec-3",
    name: "Gochujang Chicken Braise",
    category: "long_multiday",
    time: 60,
    flavour: 5,
    ease: 3,
    ingredients: [
      { name: "Chicken Breast", qty: 500, unit: "g" },
      { name: "Onions", qty: 1, unit: "pcs" },
      { name: "Garlic", qty: 4, unit: "pcs" },
      { name: "Gochujang", qty: 2, unit: "tbsp" },
      { name: "Soy Sauce", qty: 2, unit: "tbsp" },
      { name: "Sesame Oil", qty: 1, unit: "tbsp" },
      { name: "Ginger", qty: 1, unit: "pcs" }
    ],
    instructions: [
      "Cut chicken and onions into bite-sized pieces.",
      "Finely grate the ginger and mince the garlic.",
      "Sauté garlic and ginger in sesame oil in a deep pot.",
      "Add chicken and onions, searing chicken on all sides.",
      "Whisk gochujang, soy sauce, and 1 cup of water together, pour over chicken.",
      "Cover and simmer on low heat for 40 minutes until chicken is extremely tender and sauce is thick."
    ]
  },
  {
    id: "rec-4",
    name: "Scrambled Eggs on Toast",
    category: "breakfast",
    time: 8,
    flavour: 3.5,
    ease: 5,
    ingredients: [
      { name: "Eggs", qty: 3, unit: "pcs" },
      { name: "Bread", qty: 2, unit: "slices" },
      { name: "Butter", qty: 1, unit: "tbsp" },
      { name: "Salt", qty: 1, unit: "pinch" }
    ],
    instructions: [
      "Whisk eggs with salt in a bowl until fully combined.",
      "Melt butter in a non-stick pan over medium-low heat.",
      "Pour in eggs, scramble slowly with a spatula until creamy.",
      "Toast bread and top with the hot scrambled eggs."
    ]
  },
  {
    id: "rec-5",
    name: "Garlic Butter Toast",
    category: "snack",
    time: 5,
    flavour: 3.8,
    ease: 5,
    ingredients: [
      { name: "Bread", qty: 1, unit: "slice" },
      { name: "Garlic", qty: 2, unit: "pcs" },
      { name: "Butter", qty: 1, unit: "tbsp" },
      { name: "Salt", qty: 1, unit: "pinch" }
    ],
    instructions: [
      "Toast the bread until golden and crisp.",
      "Cut garlic clove in half and grate the raw garlic lightly over the toasted bread.",
      "Spread butter generously and sprinkle a tiny pinch of salt."
    ]
  }
];

// --- APP STATE ---
let state = {
  ingredients: [],
  recipes: [],
  knownIngredients: {}
};

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
  initAppState();
  initEventHandlers();
  switchTab("dashboard");
  lucide.createIcons();
});

// Load state from local storage or defaults
function initAppState() {
  const storedIngredients = localStorage.getItem("pc_ingredients");
  const storedRecipes = localStorage.getItem("pc_recipes");
  const storedKnownIngredients = localStorage.getItem("pc_knownIngredients");

  if (storedIngredients && storedRecipes && storedKnownIngredients) {
    state.ingredients = JSON.parse(storedIngredients);
    state.recipes = JSON.parse(storedRecipes);
    state.knownIngredients = JSON.parse(storedKnownIngredients);
  } else {
    state.ingredients = [...DEFAULT_INGREDIENTS];
    state.recipes = [...DEFAULT_RECIPES];
    state.knownIngredients = { ...DEFAULT_KNOWN_INGREDIENTS };
    saveStateToLocalStorage();
  }
  
  // Keep master list of known difficulties updated with any newly added ingredient names
  syncKnownIngredients();
}

function saveStateToLocalStorage() {
  localStorage.setItem("pc_ingredients", JSON.stringify(state.ingredients));
  localStorage.setItem("pc_recipes", JSON.stringify(state.recipes));
  localStorage.setItem("pc_knownIngredients", JSON.stringify(state.knownIngredients));
}

// Add any missing ingredient from current inventory/recipes to the global difficulty register
function syncKnownIngredients() {
  state.ingredients.forEach(ing => {
    const normalized = capitalizeWord(ing.name);
    if (state.knownIngredients[normalized] === undefined) {
      state.knownIngredients[normalized] = ing.difficulty || 5;
    }
  });

  state.recipes.forEach(rec => {
    rec.ingredients.forEach(ing => {
      const normalized = capitalizeWord(ing.name);
      if (state.knownIngredients[normalized] === undefined) {
        state.knownIngredients[normalized] = 5; // Default middle score
      }
    });
  });
  saveStateToLocalStorage();
}

// --- EVENT HANDLERS & NAVIGATION ---
function initEventHandlers() {
  // Tab switching
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const tabId = link.getAttribute("data-tab");
      switchTab(tabId);
    });
  });

  // Search input listeners
  document.getElementById("inventory-search").addEventListener("input", renderInventory);
  document.getElementById("recipes-search").addEventListener("input", renderRecipes);
  document.getElementById("tweaker-search").addEventListener("input", renderTweaker);

  // Category filters
  document.getElementById("inventory-filters").addEventListener("click", (e) => {
    if (e.target.classList.contains("filter-btn")) {
      document.querySelectorAll("#inventory-filters .filter-btn").forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      renderInventory();
    }
  });

  document.getElementById("recipes-filters").addEventListener("click", (e) => {
    if (e.target.classList.contains("filter-btn")) {
      document.querySelectorAll("#recipes-filters .filter-btn").forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      renderRecipes();
    }
  });

  // Header Add Ingredient Button action
  const headerBtn = document.getElementById("header-action-btn");
  headerBtn.addEventListener("click", () => {
    const activeTab = document.querySelector(".nav-link.active").getAttribute("data-tab");
    if (activeTab === "recipes") {
      openRecipeModal();
    } else {
      openIngredientModal();
    }
  });

  document.getElementById("btn-create-recipe-toolbar").addEventListener("click", () => {
    openRecipeModal();
  });
}

function switchTab(tabId) {
  // Hide all sections
  document.querySelectorAll(".tab-pane").forEach(pane => pane.classList.remove("active"));
  document.querySelectorAll(".nav-link").forEach(link => link.classList.remove("active"));

  // Show selected section
  document.getElementById(`tab-${tabId}`).classList.add("active");
  
  // Highlight nav button
  const activeNav = document.querySelector(`.nav-link[data-tab="${tabId}"]`);
  if (activeNav) activeNav.classList.add("active");

  // Customize top header title & button
  const pageTitle = document.getElementById("page-title-text");
  const headerBtn = document.getElementById("header-action-btn");

  if (tabId === "dashboard") {
    pageTitle.textContent = "Dashboard";
    headerBtn.innerHTML = `<i data-lucide="plus"></i><span>Add Ingredient</span>`;
    headerBtn.style.display = "inline-flex";
    renderDashboard();
  } else if (tabId === "inventory") {
    pageTitle.textContent = "My Pantry Inventory";
    headerBtn.innerHTML = `<i data-lucide="plus"></i><span>Add Ingredient</span>`;
    headerBtn.style.display = "inline-flex";
    renderInventory();
  } else if (tabId === "recipes") {
    pageTitle.textContent = "Recipe Directory";
    headerBtn.innerHTML = `<i data-lucide="plus"></i><span>Add Recipe</span>`;
    headerBtn.style.display = "inline-flex";
    renderRecipes();
  } else if (tabId === "difficulty-tweak") {
    pageTitle.textContent = "Acquisition Settings";
    headerBtn.style.display = "none";
    renderTweaker();
  }

  lucide.createIcons();
}

// --- CORE CALCULATIONS (FOOD DISTANCE) ---

/**
 * Calculates recipe match details, including missing ingredients & food distance score.
 */
function calculateRecipeMatch(recipe) {
  let missing = [];
  let totalMissingDifficulty = 0;
  let matchesCount = 0;

  recipe.ingredients.forEach(reqIng => {
    // Find matching ingredient in stock
    const stockIng = state.ingredients.find(
      i => i.name.trim().toLowerCase() === reqIng.name.trim().toLowerCase()
    );

    const reqQty = reqIng.qty;
    const stockQty = stockIng ? stockIng.qty : 0;

    if (stockQty >= reqQty) {
      matchesCount++;
    } else {
      // Calculate how short we are
      const isShort = stockQty > 0;
      const difficulty = state.knownIngredients[capitalizeWord(reqIng.name)] || 5;
      
      missing.push({
        name: reqIng.name,
        required: reqQty,
        available: stockQty,
        unit: reqIng.unit,
        difficulty: difficulty,
        isShort: isShort
      });

      totalMissingDifficulty += difficulty;
    }
  });

  const matchPercent = recipe.ingredients.length > 0 
    ? Math.round((matchesCount / recipe.ingredients.length) * 100) 
    : 100;

  return {
    recipeId: recipe.id,
    missing: missing,
    distance: totalMissingDifficulty, // Food Distance Score
    matchPercent: matchPercent,
    isReady: missing.length === 0
  };
}

// --- RENDERING ROUTINES ---

// 1. DASHBOARD
function renderDashboard() {
  const readyContainer = document.getElementById("rec-ready-list");
  const closestContainer = document.getElementById("rec-closest-list");
  readyContainer.innerHTML = "";
  closestContainer.innerHTML = "";

  let readyHtml = "";
  let closestHtml = "";
  let readyCount = 0;
  let expiringSoonCount = 0;

  // Process expiry dates
  const today = new Date();
  state.ingredients.forEach(ing => {
    if (ing.expiry && ing.qty > 0) {
      const expDate = new Date(ing.expiry);
      const diffTime = expDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays <= 4) expiringSoonCount++;
    }
  });

  // Calculate scores for all recipes
  const scoredRecipes = state.recipes.map(recipe => {
    const scoreInfo = calculateRecipeMatch(recipe);
    return { recipe, scoreInfo };
  });

  // Sort by Food Distance ascending, then preparation time
  scoredRecipes.sort((a, b) => a.scoreInfo.distance - b.scoreInfo.distance || a.recipe.time - b.recipe.time);

  scoredRecipes.forEach(item => {
    const { recipe, scoreInfo } = item;
    const missingCount = scoreInfo.missing.length;

    if (scoreInfo.isReady) {
      readyCount++;
      readyHtml += `
        <div class="rec-item-card" onclick="openRecipeDetailsModal('${recipe.id}')">
          <div class="rec-item-meta">
            <span class="rec-item-title">${recipe.name}</span>
            <div class="rec-item-details">
              <span><i data-lucide="clock"></i> ${recipe.time}m</span>
              <span><i data-lucide="star" class="text-amber"></i> ${recipe.flavour}</span>
              <span class="badge badge-category">${formatCategoryName(recipe.category)}</span>
            </div>
          </div>
          <span class="badge badge-ready">Ready to Cook</span>
        </div>
      `;
    } else {
      const missingNames = scoreInfo.missing.map(m => m.name).join(", ");
      closestHtml += `
        <div class="rec-item-card" onclick="openRecipeDetailsModal('${recipe.id}')">
          <div class="rec-item-meta">
            <span class="rec-item-title">${recipe.name}</span>
            <div class="rec-item-details">
              <span><i data-lucide="clock"></i> ${recipe.time}m</span>
              <span>Missing: <strong class="text-warning">${missingNames}</strong></span>
            </div>
          </div>
          <span class="badge badge-distance">+${scoreInfo.distance} Distance</span>
        </div>
      `;
    }
  });

  // Stats Counters
  document.getElementById("stats-ready-count").textContent = readyCount;
  document.getElementById("stat-total-items").textContent = state.ingredients.filter(i => i.qty > 0).length;
  document.getElementById("stat-cookable-count").textContent = readyCount;
  document.getElementById("stat-expiring-count").textContent = expiringSoonCount;

  readyContainer.innerHTML = readyHtml || `<p class="text-secondary p-1">No recipes fully cookable right now. Try adding items to your pantry!</p>`;
  closestContainer.innerHTML = closestHtml || `<p class="text-secondary p-1">All recipes are ready!</p>`;

  lucide.createIcons();
}

// 2. INVENTORY
function renderInventory() {
  const grid = document.getElementById("inventory-grid-list");
  grid.innerHTML = "";

  const searchVal = document.getElementById("inventory-search").value.toLowerCase();
  const activeCategory = document.querySelector("#inventory-filters .filter-btn.active").getAttribute("data-category");

  state.ingredients.forEach(ing => {
    // Filter logic
    if (searchVal && !ing.name.toLowerCase().includes(searchVal)) return;
    if (activeCategory !== "all" && ing.category !== activeCategory) return;

    // Difficulty Color Code
    const diff = state.knownIngredients[capitalizeWord(ing.name)] || ing.difficulty || 5;
    let diffClass = "diff-5";
    if (diff <= 2) diffClass = "diff-1";
    else if (diff <= 4) diffClass = "diff-3";
    else if (diff <= 6) diffClass = "diff-5";
    else if (diff <= 8) diffClass = "diff-7";
    else diffClass = "diff-9";

    // Expiry evaluation
    let expiryHtml = "";
    if (ing.expiry && ing.qty > 0) {
      const today = new Date();
      const expDate = new Date(ing.expiry);
      const diffDays = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24));

      if (diffDays < 0) {
        expiryHtml = `<span class="ing-expiry-badge expiry-expired"><i data-lucide="alert-octagon"></i> Expired</span>`;
      } else if (diffDays <= 3) {
        expiryHtml = `<span class="ing-expiry-badge expiry-warn"><i data-lucide="alert-triangle"></i> Expiry: ${diffDays}d</span>`;
      } else {
        expiryHtml = `<span class="ing-expiry-badge expiry-good"><i data-lucide="calendar"></i> Expiry: ${diffDays}d</span>`;
      }
    }

    const card = document.createElement("div");
    card.className = "inventory-card";
    card.innerHTML = `
      <div class="ing-header">
        <div>
          <span class="ing-title">${ing.name}</span>
          <br>
          <span class="ing-category">${ing.category}</span>
        </div>
        <div class="difficulty-indicator">
          <span class="badge ${diffClass}">Cost: ${diff}</span>
        </div>
      </div>
      
      ${expiryHtml}

      <div class="ing-details">
        <div class="ing-stock">
          <span class="ing-stock-val">${ing.qty} ${ing.unit}</span>
          <span class="ing-stock-label">IN PANTRY</span>
        </div>
        <div class="ing-controls">
          <button class="btn-ctrl" onclick="adjustQty('${ing.id}', -1)" title="Decrease qty"><i data-lucide="minus"></i></button>
          <button class="btn-ctrl" onclick="adjustQty('${ing.id}', 1)" title="Increase qty"><i data-lucide="plus"></i></button>
          <button class="btn-ctrl" onclick="openIngredientModal('${ing.id}')" title="Edit Item"><i data-lucide="edit-3"></i></button>
          <button class="btn-ctrl" onclick="deleteIngredient('${ing.id}')" title="Delete"><i data-lucide="trash-2"></i></button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  if (grid.children.length === 0) {
    grid.innerHTML = `<div class="card p-2 text-center text-secondary" style="grid-column: 1/-1">No ingredients matching filters found. Click 'Add Ingredient' to seed your pantry.</div>`;
  }

  lucide.createIcons();
}

// 3. RECIPES
function renderRecipes() {
  const grid = document.getElementById("recipes-grid-list");
  grid.innerHTML = "";

  const searchVal = document.getElementById("recipes-search").value.toLowerCase();
  const activeMealType = document.querySelector("#recipes-filters .filter-btn.active").getAttribute("data-meal-type");

  state.recipes.forEach(recipe => {
    // Filter search
    if (searchVal && !recipe.name.toLowerCase().includes(searchVal)) return;
    if (activeMealType !== "all" && recipe.category !== activeMealType) return;

    const scoreInfo = calculateRecipeMatch(recipe);

    // Progress bar class selection
    let progressClass = "fill-emerald";
    if (scoreInfo.matchPercent < 35) progressClass = "fill-red";
    else if (scoreInfo.matchPercent < 75) progressClass = "fill-amber";
    else if (scoreInfo.matchPercent < 100) progressClass = "fill-cyan";

    let distanceBadge = "";
    if (scoreInfo.isReady) {
      distanceBadge = `<span class="badge badge-ready"><i data-lucide="check-check"></i> Ready to cook</span>`;
    } else {
      distanceBadge = `<span class="badge badge-distance"><i data-lucide="shopping-cart"></i> +${scoreInfo.distance} Distance</span>`;
    }

    const card = document.createElement("div");
    card.className = "recipe-card";
    card.innerHTML = `
      <div class="recipe-card-header">
        <div class="recipe-header-title">
          <span class="recipe-type">${formatCategoryName(recipe.category)}</span>
          <span class="recipe-title">${recipe.name}</span>
        </div>
      </div>

      <div class="recipe-card-body">
        <div class="recipe-ratings">
          <div class="rating-item">
            <span class="rating-label">Time</span>
            <span class="rating-val">${recipe.time}m</span>
          </div>
          <div class="rating-item">
            <span class="rating-label">Flavour</span>
            <span class="rating-val">${recipe.flavour}⭐</span>
          </div>
          <div class="rating-item">
            <span class="rating-label">Ease</span>
            <span class="rating-val">${recipe.ease}⭐</span>
          </div>
        </div>

        <div class="recipe-progress-section">
          <div class="progress-header">
            <span>Ingredients match</span>
            <span>${scoreInfo.matchPercent}%</span>
          </div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill ${progressClass}" style="width: ${scoreInfo.matchPercent}%"></div>
          </div>
        </div>
      </div>

      <div class="recipe-card-footer">
        ${distanceBadge}
        <button class="btn btn-secondary btn-sm" onclick="openRecipeDetailsModal('${recipe.id}')">View Recipe</button>
      </div>
    `;
    grid.appendChild(card);
  });

  if (grid.children.length === 0) {
    grid.innerHTML = `<div class="card p-2 text-center text-secondary" style="grid-column: 1/-1">No recipes found matching filters. Click 'Add Recipe' to create a new one!</div>`;
  }

  lucide.createIcons();
}

// 4. DIFFICULTY TWEAKER
function renderTweaker() {
  const container = document.getElementById("tweaker-list-container");
  container.innerHTML = "";

  const searchVal = document.getElementById("tweaker-search").value.toLowerCase();

  // Get unique list of ingredient names from both inventory and recipes
  const allNamesSet = new Set();
  state.ingredients.forEach(i => allNamesSet.add(capitalizeWord(i.name)));
  state.recipes.forEach(r => r.ingredients.forEach(i => allNamesSet.add(capitalizeWord(i.name))));

  // Convert to array and sort alphabetically
  const names = Array.from(allNamesSet).sort();

  names.forEach(name => {
    if (searchVal && !name.toLowerCase().includes(searchVal)) return;

    const currentDiff = state.knownIngredients[name] || 5;

    let colorClass = "diff-5";
    if (currentDiff <= 2) colorClass = "diff-1";
    else if (currentDiff <= 4) colorClass = "diff-3";
    else if (currentDiff <= 6) colorClass = "diff-5";
    else if (currentDiff <= 8) colorClass = "diff-7";
    else colorClass = "diff-9";

    const row = document.createElement("div");
    row.className = "tweaker-row";
    row.innerHTML = `
      <div class="tweaker-row-header">
        <span class="tweaker-row-title">${name}</span>
        <span class="badge ${colorClass}" id="tweaker-badge-${name.replace(/\s+/g, '-')}" style="font-weight: 700; width: 30px; text-align: center;">${currentDiff}</span>
      </div>
      <div class="tweaker-row-input">
        <input type="range" min="1" max="10" value="${currentDiff}" 
          oninput="handleDifficultySliderChange('${name}', this.value)"
          onchange="handleDifficultySliderSave('${name}', this.value)">
      </div>
    `;
    container.appendChild(row);
  });

  if (container.children.length === 0) {
    container.innerHTML = `<p class="text-secondary p-1 text-center">No ingredients found. Add ingredients or recipes to unlock cost settings.</p>`;
  }
}

// --- DYNAMIC SLIDER TWEAK ACTIONS ---
function handleDifficultySliderChange(name, value) {
  const badge = document.getElementById(`tweaker-badge-${name.replace(/\s+/g, '-')}`);
  if (badge) {
    badge.textContent = value;
    // Dynamic color change
    badge.className = "badge";
    const currentDiff = parseInt(value);
    let colorClass = "diff-5";
    if (currentDiff <= 2) colorClass = "diff-1";
    else if (currentDiff <= 4) colorClass = "diff-3";
    else if (currentDiff <= 6) colorClass = "diff-5";
    else if (currentDiff <= 8) colorClass = "diff-7";
    else colorClass = "diff-9";
    badge.classList.add(colorClass);
  }
}

function handleDifficultySliderSave(name, value) {
  state.knownIngredients[name] = parseInt(value);
  
  // Update difficulties inside active inventory objects if names match
  state.ingredients.forEach(ing => {
    if (capitalizeWord(ing.name) === name) {
      ing.difficulty = parseInt(value);
    }
  });

  saveStateToLocalStorage();
  showToast(`Difficulty for ${name} updated to ${value}`, "success");
}

// --- QUANTITY CONTROLLERS ---
function adjustQty(id, offset) {
  const ing = state.ingredients.find(i => i.id === id);
  if (ing) {
    const newQty = Math.max(0, ing.qty + offset);
    if (newQty === ing.qty) return;
    ing.qty = newQty;
    saveStateToLocalStorage();
    renderInventory();
    showToast(`${ing.name} quantity updated to ${ing.qty} ${ing.unit}`, "success");
  }
}

// --- MODAL UTILITIES ---
function openModal(modalId) {
  document.getElementById(modalId).classList.add("active");
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove("active");
}

// --- INGREDIENT FORM ACTIONS ---
function openIngredientModal(ingredientId = null) {
  const modalTitle = document.getElementById("modal-ingredient-title");
  const form = document.getElementById("form-ingredient");
  
  form.reset();
  
  if (ingredientId) {
    // Edit mode
    modalTitle.textContent = "Edit Ingredient";
    const ing = state.ingredients.find(i => i.id === ingredientId);
    if (ing) {
      document.getElementById("edit-ingredient-id").value = ing.id;
      document.getElementById("ing-name").value = ing.name;
      document.getElementById("ing-name").disabled = true; // Protect key name linking
      document.getElementById("ing-category").value = ing.category;
      document.getElementById("ing-qty").value = ing.qty;
      document.getElementById("ing-unit").value = ing.unit;
      document.getElementById("ing-expiry").value = ing.expiry || "";
      document.getElementById("ing-difficulty").value = state.knownIngredients[capitalizeWord(ing.name)] || ing.difficulty || 5;
    }
  } else {
    // Add mode
    modalTitle.textContent = "Add Ingredient";
    document.getElementById("edit-ingredient-id").value = "";
    document.getElementById("ing-name").disabled = false;
  }
  
  openModal("modal-ingredient");
}

function handleIngredientSubmit(event) {
  event.preventDefault();
  
  const id = document.getElementById("edit-ingredient-id").value;
  const name = document.getElementById("ing-name").value.trim();
  const category = document.getElementById("ing-category").value;
  const qty = parseFloat(document.getElementById("ing-qty").value);
  const unit = document.getElementById("ing-unit").value.trim();
  const difficulty = parseInt(document.getElementById("ing-difficulty").value);
  const expiry = document.getElementById("ing-expiry").value;

  const normalizedName = capitalizeWord(name);

  if (id) {
    // Edit existing ingredient
    const ing = state.ingredients.find(i => i.id === id);
    if (ing) {
      ing.category = category;
      ing.qty = qty;
      ing.unit = unit;
      ing.expiry = expiry;
      
      // Update globally
      state.knownIngredients[normalizedName] = difficulty;
      ing.difficulty = difficulty;
      
      showToast(`Ingredient ${name} updated successfully!`, "success");
    }
  } else {
    // Create new ingredient
    // Check if ingredient name already exists
    const duplicate = state.ingredients.find(i => i.name.toLowerCase() === name.toLowerCase());
    if (duplicate) {
      duplicate.qty += qty;
      duplicate.category = category;
      duplicate.expiry = expiry;
      showToast(`${name} already exists. Increased quantity by ${qty} ${unit}`, "warning");
    } else {
      const newIng = {
        id: "ing-" + Date.now(),
        name: name,
        category: category,
        qty: qty,
        unit: unit,
        difficulty: difficulty,
        expiry: expiry
      };
      state.ingredients.push(newIng);
      state.knownIngredients[normalizedName] = difficulty;
      showToast(`Added ${name} to pantry.`, "success");
    }
  }

  saveStateToLocalStorage();
  syncKnownIngredients();
  closeModal("modal-ingredient");
  
  // Re-render whichever tab is currently active
  const activeTab = document.querySelector(".nav-link.active").getAttribute("data-tab");
  switchTab(activeTab);
}

function deleteIngredient(id) {
  const ing = state.ingredients.find(i => i.id === id);
  if (!ing) return;
  
  if (confirm(`Are you sure you want to delete ${ing.name} from your pantry?`)) {
    state.ingredients = state.ingredients.filter(i => i.id !== id);
    saveStateToLocalStorage();
    renderInventory();
    showToast(`Deleted ${ing.name}`, "error");
  }
}

// --- RECIPE FORM ACTIONS ---
let recipeIngredientIndex = 0;

function openRecipeModal(recipeId = null) {
  const modalTitle = document.getElementById("modal-recipe-title");
  const form = document.getElementById("form-recipe");
  const listContainer = document.getElementById("recipe-ingredients-inputs-list");
  
  form.reset();
  listContainer.innerHTML = "";
  recipeIngredientIndex = 0;

  if (recipeId) {
    // Edit mode
    modalTitle.textContent = "Edit Recipe";
    const recipe = state.recipes.find(r => r.id === recipeId);
    if (recipe) {
      document.getElementById("edit-recipe-id").value = recipe.id;
      document.getElementById("recipe-name").value = recipe.name;
      document.getElementById("recipe-category").value = recipe.category;
      document.getElementById("recipe-time").value = recipe.time;
      document.getElementById("recipe-flavour").value = recipe.flavour;
      document.getElementById("recipe-ease").value = recipe.ease;
      document.getElementById("recipe-instructions").value = recipe.instructions.join("\n");
      
      recipe.ingredients.forEach(ing => {
        addRecipeIngredientRow(ing.name, ing.qty, ing.unit);
      });
    }
  } else {
    // Add Mode
    modalTitle.textContent = "Create New Recipe";
    document.getElementById("edit-recipe-id").value = "";
    // Seed with two blank rows
    addRecipeIngredientRow();
    addRecipeIngredientRow();
  }

  openModal("modal-recipe");
}

function addRecipeIngredientRow(name = "", qty = "", unit = "") {
  const container = document.getElementById("recipe-ingredients-inputs-list");
  const index = recipeIngredientIndex++;

  const row = document.createElement("div");
  row.className = "recipe-ingredient-row";
  row.id = `recipe-ing-row-${index}`;

  // Get alphabetical list of known ingredients for dropdown autocomplete helper
  const uniqueNames = Array.from(new Set([
    ...Object.keys(state.knownIngredients),
    ...state.ingredients.map(i => capitalizeWord(i.name))
  ])).sort();

  let selectOptionsHtml = `<option value="">-- Choose or type name --</option>`;
  uniqueNames.forEach(n => {
    const selected = n.toLowerCase() === name.toLowerCase() ? "selected" : "";
    selectOptionsHtml += `<option value="${n}" ${selected}>${n}</option>`;
  });

  row.innerHTML = `
    <!-- Text input overlays list for flexibility -->
    <input type="text" class="flex-2 ingredient-name-input" id="rec-ing-name-${index}" placeholder="Ingredient name" value="${name}" list="ingredient-datalist" required>
    <input type="number" class="flex-1" id="rec-ing-qty-${index}" placeholder="Qty" min="0.01" step="any" value="${qty}" required>
    <input type="text" class="flex-1" id="rec-ing-unit-${index}" placeholder="Unit (g, pcs, tbsp)" value="${unit}" required>
    <button type="button" class="btn-ctrl text-red" onclick="removeRecipeIngredientRow(${index})" title="Remove"><i data-lucide="minus"></i></button>
  `;

  container.appendChild(row);
  
  // Seed datalist if missing
  let datalist = document.getElementById("ingredient-datalist");
  if (!datalist) {
    datalist = document.createElement("datalist");
    datalist.id = "ingredient-datalist";
    document.body.appendChild(datalist);
  }
  
  let datalistHtml = "";
  uniqueNames.forEach(n => datalistHtml += `<option value="${n}">`);
  datalist.innerHTML = datalistHtml;

  lucide.createIcons();
}

function removeRecipeIngredientRow(index) {
  const row = document.getElementById(`recipe-ing-row-${index}`);
  if (row) {
    row.remove();
  }
}

function handleRecipeSubmit(event) {
  event.preventDefault();

  const id = document.getElementById("edit-recipe-id").value;
  const name = document.getElementById("recipe-name").value.trim();
  const category = document.getElementById("recipe-category").value;
  const time = parseInt(document.getElementById("recipe-time").value);
  const flavour = parseFloat(document.getElementById("recipe-flavour").value);
  const ease = parseInt(document.getElementById("recipe-ease").value);
  const instructionsText = document.getElementById("recipe-instructions").value;
  
  // Parse instructions
  const instructions = instructionsText.split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0);

  // Compile ingredients rows
  const ingredients = [];
  const rows = document.querySelectorAll(".recipe-ingredient-row");
  
  rows.forEach(row => {
    const rowId = row.id.split("-").pop();
    const ingName = document.getElementById(`rec-ing-name-${rowId}`).value.trim();
    const ingQty = parseFloat(document.getElementById(`rec-ing-qty-${rowId}`).value);
    const ingUnit = document.getElementById(`rec-ing-unit-${rowId}`).value.trim();

    if (ingName && ingQty) {
      ingredients.push({
        name: capitalizeWord(ingName),
        qty: ingQty,
        unit: ingUnit
      });
    }
  });

  if (ingredients.length === 0) {
    showToast("Recipe must have at least one ingredient!", "error");
    return;
  }

  if (id) {
    // Edit existing recipe
    const rec = state.recipes.find(r => r.id === id);
    if (rec) {
      rec.name = name;
      rec.category = category;
      rec.time = time;
      rec.flavour = flavour;
      rec.ease = ease;
      rec.ingredients = ingredients;
      rec.instructions = instructions;
      
      showToast(`Recipe "${name}" edited!`, "success");
    }
  } else {
    // Create new
    const newRecipe = {
      id: "rec-" + Date.now(),
      name: name,
      category: category,
      time: time,
      flavour: flavour,
      ease: ease,
      ingredients: ingredients,
      instructions: instructions
    };
    state.recipes.push(newRecipe);
    showToast(`Created recipe "${name}"`, "success");
  }

  saveStateToLocalStorage();
  syncKnownIngredients();
  closeModal("modal-recipe");
  
  // Refresh views
  const activeTab = document.querySelector(".nav-link.active").getAttribute("data-tab");
  switchTab(activeTab);
}

// --- RECIPE DETAIL / VIEW ACTIONS ---
function openRecipeDetailsModal(recipeId) {
  const recipe = state.recipes.find(r => r.id === recipeId);
  if (!recipe) return;

  const scoreInfo = calculateRecipeMatch(recipe);

  // View fields population
  document.getElementById("view-recipe-name").textContent = recipe.name;
  document.getElementById("view-recipe-category").textContent = formatCategoryName(recipe.category);
  document.getElementById("view-recipe-time").textContent = `${recipe.time} mins`;
  
  // Star ratings representation
  document.getElementById("view-recipe-flavour").textContent = "⭐".repeat(Math.round(recipe.flavour));
  document.getElementById("view-recipe-ease").textContent = "⭐".repeat(recipe.ease);

  // Distance representation
  const distEl = document.getElementById("view-recipe-distance");
  if (scoreInfo.isReady) {
    distEl.innerHTML = `<span class="text-emerald">Ready to Cook!</span>`;
  } else {
    distEl.innerHTML = `<span class="text-amber">Distance Score: +${scoreInfo.distance}</span>`;
  }

  // Ingredients checklist rendering
  const checklist = document.getElementById("view-recipe-ingredients-list");
  checklist.innerHTML = "";

  recipe.ingredients.forEach(reqIng => {
    const stockIng = state.ingredients.find(
      i => i.name.trim().toLowerCase() === reqIng.name.trim().toLowerCase()
    );

    const stockQty = stockIng ? stockIng.qty : 0;
    const isAvailable = stockQty >= reqIng.qty;

    const li = document.createElement("li");
    if (isAvailable) {
      li.className = "checklist-instock";
      li.innerHTML = `
        <i data-lucide="check" class="text-emerald"></i>
        <span><strong>${reqIng.qty} ${reqIng.unit}</strong> ${reqIng.name} <small class="text-emerald">(In Pantry: ${stockQty} ${stockIng.unit})</small></span>
      `;
    } else {
      const diff = state.knownIngredients[capitalizeWord(reqIng.name)] || 5;
      const isShort = stockQty > 0;
      li.className = "checklist-missing";
      li.innerHTML = `
        <i data-lucide="alert-circle" class="text-red"></i>
        <span>
          <strong>${reqIng.qty} ${reqIng.unit}</strong> ${reqIng.name} 
          <small class="text-red">
            (${isShort ? `Short! Have ${stockQty}` : 'Missing'} - difficulty cost: ${diff})
          </small>
        </span>
      `;
    }
    checklist.appendChild(li);
  });

  // Steps rendering
  const stepsList = document.getElementById("view-recipe-steps");
  stepsList.innerHTML = "";
  recipe.instructions.forEach(step => {
    const li = document.createElement("li");
    li.textContent = step;
    stepsList.appendChild(li);
  });

  // Cook Action button / Edit button binding
  const footer = document.querySelector("#modal-recipe-details .modal-footer");
  
  // Clean existing cook button
  const oldCookBtn = document.getElementById("btn-cook-recipe-action");
  if (oldCookBtn) oldCookBtn.remove();

  // Create new cook button if ready to cook
  if (scoreInfo.isReady) {
    const cookBtn = document.createElement("button");
    cookBtn.className = "btn btn-primary";
    cookBtn.id = "btn-cook-recipe-action";
    cookBtn.innerHTML = `<i data-lucide="cooking-pot"></i><span>Cook Meal!</span>`;
    cookBtn.onclick = () => cookRecipe(recipe.id);
    footer.insertBefore(cookBtn, footer.firstChild);
  }

  // Edit action binding
  const editBtn = document.getElementById("btn-edit-recipe-action");
  editBtn.onclick = () => {
    closeModal("modal-recipe-details");
    openRecipeModal(recipe.id);
  };

  openModal("modal-recipe-details");
  lucide.createIcons();
}

/**
 * Cooking a recipe automatically decrements the quantities from the inventory state.
 */
function cookRecipe(recipeId) {
  const recipe = state.recipes.find(r => r.id === recipeId);
  if (!recipe) return;

  const scoreInfo = calculateRecipeMatch(recipe);
  if (!scoreInfo.isReady) {
    showToast("Cannot cook! Some ingredients are missing.", "error");
    return;
  }

  // Decrement inventory
  recipe.ingredients.forEach(reqIng => {
    const stockIng = state.ingredients.find(
      i => i.name.trim().toLowerCase() === reqIng.name.trim().toLowerCase()
    );
    if (stockIng) {
      stockIng.qty = Math.max(0, parseFloat((stockIng.qty - reqIng.qty).toFixed(2)));
    }
  });

  saveStateToLocalStorage();
  closeModal("modal-recipe-details");
  showToast(`Successfully cooked ${recipe.name}! Ingredients decremented.`, "success");
  
  // Refresh views
  const activeTab = document.querySelector(".nav-link.active").getAttribute("data-tab");
  switchTab(activeTab);
}

// --- TOAST SYSTEMS ---
function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  let icon = "info";
  if (type === "success") icon = "check-circle";
  if (type === "error") icon = "x-circle";
  if (type === "warning") icon = "alert-triangle";

  toast.innerHTML = `
    <i data-lucide="${icon}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  lucide.createIcons();

  setTimeout(() => {
    toast.style.animation = "fadeOut 0.3s forwards";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// --- CONVENIENCE HELPERS ---
function getFutureDate(daysInFuture) {
  const date = new Date();
  date.setDate(date.getDate() + daysInFuture);
  return date.toISOString().split("T")[0];
}

function formatCategoryName(cat) {
  if (cat === "quick_easy") return "Quick & Easy";
  if (cat === "breakfast") return "Breakfast";
  if (cat === "packed_lunch") return "Packed Lunch";
  if (cat === "snack") return "Snacks";
  if (cat === "long_multiday") return "Long / Multi-day";
  return cat;
}

function capitalizeWord(string) {
  if (!string) return "";
  return string.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
