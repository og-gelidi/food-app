# Implementation Plan: Food Inventory & Smart Recipe App ("PantryChef")

This document outlines the design and implementation details for the Food Inventory & Smart Recipe Recommendation Web App. The app will help users track their food inventory, organize recipes (classified by cooking style, time, and ease), and calculate the **"Food Distance"** (the closest/easiest meals to prepare based on current inventory and custom-rated ingredient acquisition difficulties).

---

## 1. Core Features

### A. Dashboard & Smart Meal Finder
- **Interactive Overview**: Visual stats showing inventory counts, expiring items, and fully craftable recipes.
- **Smart Recommendations**: 
  - **Ready to Cook**: Recipes where all ingredients are currently in stock.
  - **Closest Matches (Lowest Food Distance)**: Recipes missing a few ingredients, sorted by the difficulty/cost of acquiring those missing items.

### B. Inventory Management
- **Categorized Inventory**: Grouped into categories (e.g., *Proteins, Produce/Vegetables, Pantry & Seasonings, Grains & Bakes, Dairy & Eggs*).
- **Ingredient Metadata**:
  - Name, Quantity, and Unit (e.g., grams, pieces, tbsp).
  - **Acquisition Difficulty / Food Distance Score** (1 = extremely common/cheap like onions/garlic, 10 = specialty/expensive like premium steak or imported condiments).
  - Expiry date tracker with visual warnings.
- **Quick Controls**: Instant increment/decrement counters, search bar, and add/edit modals.

### C. Recipe Book & Creator
- **Categorized Recipes**:
  - *Quick & Easy / Breakfasts / Packed Lunches / Snacks / Long, Multi-day Meals*.
- **Curation & Ratings**:
  - **Flavour Rating** (1-5 stars).
  - **Ease Rating** (1-5 stars).
  - **Preparation Time** (in minutes).
- **Ingredient Requirements**: List of ingredients and required quantities.
- **Recipe Detail Modal**: Displays instructions, ingredient completeness list (checking off what you have in green, highlighting what is missing in red), and the total "Food Distance" to make this meal.

### D. "Food Distance" Metric & Ingredient Curations
- **The Concept**: "Food Distance" represents the friction required to prepare a meal.
- **Calculation Formula**:
  $$\text{Food Distance} = \sum_{i \in \text{Missing Ingredients}} (\text{Required Quantity Factor} \times \text{Acquisition Difficulty of } i)$$
- **Ingredient Difficulty Curations Page**: A control panel to edit the difficulty rankings of all known ingredients, allowing the user to tweak the system to their specific neighborhood/budget (e.g. marking certain meats as high difficulty, or setting local garden veggies to low difficulty).

---

## 2. Technology Stack & Architecture

- **Frontend Core**: Vanilla HTML5, modern CSS3 (custom properties, glassmorphism, responsive grid/flexbox), and ES6+ JavaScript.
- **State Management**: A reactive local state persisted in browser `localStorage`.
- **Icons**: Lucide Icons (loaded via CDN) for crisp, modern SVG icons.
- **Fonts**: Google Fonts (`Outfit` and `Inter`) for typography.
- **Self-Contained Dev server**: Run using a simple HTTP server for instant preview.

---

## 3. UI/UX Design System (Theme: "Midnight Orchard")

To create a **premium, state-of-the-art visual appearance**, we will use a sleek dark-mode glassmorphism interface.

* **Colors**:
  - Background: Deep Obsidian (`#0B0F19`)
  - Surface Glass: Semi-transparent Slate (`rgba(30, 41, 59, 0.45)`)
  - Accent Green (Success/In Stock): Teal Mint (`#00F2FE` gradient to `#4FACFE` or Emerald `#10B981`)
  - Accent Amber (Warning/Missing): Warm Gold (`#F59E0B`)
  - Accent Red (High Difficulty/Expired): Crimson Rose (`#EF4444`)
  - Accent Purple (Brand/Specialty): Neon Violet (`#8B5CF6` to `#EC4899`)
* **Effects**:
  - Backdrop Blur: `backdrop-filter: blur(16px)`
  - Border Glows: `1px solid rgba(255, 255, 255, 0.08)`
  - Box Shadows: Smooth multi-layered ambient shadows.
* **Typography**:
  - Headings: `Outfit` (clean, geometric sans-serif)
  - Body Text: `Inter` (excellent legibility)

---

## 4. Directory & File Structure

We will place all files in the root folder of our empty workspace:
```
food app/
├── index.html         # Main entry point & HTML structure
├── style.css          # Vanilla CSS containing design tokens, animations, and layouts
└── app.js             # JavaScript application logic (State, Event Handlers, Algorithms)
```

---

## 5. Development Steps

1. **Step 1**: Write `index.html` structure with semantic components (Sidebar navigation, Main dashboard, Inventory section, Recipe book, Settings panel, and Modals).
2. **Step 2**: Write `style.css` implementing the "Midnight Orchard" theme, glassmorphism, hover transitions, and responsive grid system.
3. **Step 3**: Write `app.js` with:
   - Default mock inventory items (with varying difficulties).
   - Default mock recipes (including breakfasts, snacks, quick lunches, and complex dinners).
   - LocalStorage synchronization.
   - The "Food Distance" calculator.
   - Interactive modals for adding/editing ingredients & recipes.
4. **Step 4**: Test and refine the interface. Check interactions, sliders for difficulty, and recipe filtering.
