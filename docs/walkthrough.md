# PantryChef — Walkthrough & Feature Guide

PantryChef is a responsive single-page web application designed to manage kitchen ingredients, record curated recipes, and recommend meals based on **Food Distance** (acquisition difficulty of missing ingredients).

---

## 1. Interface & Visual Design

PantryChef features a premium dark-mode glassmorphism theme called **"Midnight Orchard"** with translucent panes, neon glow borders, vibrant status badges, and smooth state transitions.

### A. Pantry Inventory Screen
This tab lists your current ingredients grouped by category (Produce, Proteins, Dairy, etc.) along with quantity trackers, automatic expiry badges, and direct adjustments (+/-).

### B. Acquisition Settings Screen
This tab is where you rate or curate the "difficulty" of each ingredient. The recommendation system uses these scores to compute the easiest meals to achieve.

---

## 2. Core Features & Algorithms

### 1. Smart Dashboard
- **Ready to Cook**: Lists recipes for which all required ingredients are fully in stock (`inventory quantity >= required quantity`).
- **Closest Meals**: Automatically calculates which recipes are *almost* available, sorting them from lowest to highest **Food Distance** (effort required to make them).
- **Kitchen Statistics**: Live counts of items in stock, cookable meals, and items expiring within 4 days.

### 2. The "Food Distance" Metric
Instead of just counting the *number* of missing ingredients, PantryChef scores recipes by the **effort/difficulty** of procuring those missing items:

$$\text{Food Distance} = \sum_{i \in \text{Missing Ingredients}} \text{Acquisition Difficulty of } i$$

- **Staples** (e.g. Salt, Garlic) are ranked low (difficulty 1-2).
- **Proteins** (e.g. Salmon) are ranked higher (difficulty 8).
- **Specialty/Imported** (e.g. Gochujang) are ranked higher (difficulty 7).
- If a recipe is missing Onions (difficulty 2) and Garlic (difficulty 1), its distance is **3**.
- If it is missing Salmon (difficulty 8), its distance is **8**.
- Therefore, the app suggests the Onion & Garlic recipe first because it has a lower "Food Distance" (easier to procure).
- Users can dynamically customize these ratings using sliders to fit their local budget, grocery distance, or personal preferences.

### 3. Smart Inventory Decrementing
When you view a recipe that is **Ready to Cook**, a **"Cook Meal!"** button appears. Clicking it automatically subtracts the required ingredient quantities from your pantry, updates expiry warning counters, and saves the new quantities to the browser's `localStorage` so it persists between reloads.

### 4. Interactive Dialog Modals
- **Add/Edit Ingredient**: Allows specifying names, categories, custom units, baseline difficulty, and optional expiration dates.
- **Add/Edit Recipe**: Allows drafting a recipe name, meal type (Quick & Easy, Breakfast, Packed Lunch, Snack, or Multi-day), prep/cook time, and custom ratings for **Flavour** and **Ease**. It features a dynamic ingredient list builder where you can add/remove ingredient requirements on the fly.

---

## 3. Local Setup & Usage

To run the application on your computer:
1. Open PowerShell and navigate to the project directory:
   ```powershell
   cd "c:\Users\Salem\Documents\LOCAL REPOS\food app"
   ```
2. Start a local server (if not already running):
   ```powershell
   python -m http.server 8000
   ```
3. Open your browser and navigate to:
   ```
   http://localhost:8000/index.html
   ```
