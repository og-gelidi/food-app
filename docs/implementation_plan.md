# Implementation Plan: Data Portability Suite (JSON Export & Import)

This plan outlines the design, implementation, and verification steps for adding backup, export, and import capabilities to the PantryChef application. This ensures users do not lose their custom ingredients, custom recipes, and fine-tuned acquisition difficulty settings.

---

## 1. User Review Required

> [!WARNING]
> **Data Overwrite Precaution**: When a user imports a backup file, it can potentially conflict with or overwrite their current active pantry and recipes. We will implement:
> 1. Structure validation to ensure corrupt or malformed JSON files do not break the app.
> 2. A clear confirmation prompt warning the user before overwriting existing data.
> 3. Fallbacks to default values if the imported file is missing fields.

---

## 2. Proposed Changes

### UI & Layout Integration

We will place the **Data Portability** panel in the **Acquisition Settings** tab (`#tab-difficulty-tweak`), specifically within the right-hand information column (`.tweaker-info-pane`). This keeps settings-related tools grouped together and keeps the sidebar and dashboard clean.

---

### [Component: Frontend Structure]

#### [MODIFY] [index.html](file:///c:/Users/Salem/Documents/LOCAL%20REPOS/food%20app/index.html)
- Add a new section card inside `.tweaker-info-pane` for Data Portability.
- Add an "Export Backup" button with a download icon.
- Add an "Import Backup" button wrapping a hidden `<input type="file" accept=".json">` to trigger file selection.
- Update/add Lucide icons for download and upload.

---

### [Component: Frontend Styling]

#### [MODIFY] [style.css](file:///c:/Users/Salem/Documents/LOCAL%20REPOS/food%20app/style.css)
- Style the portability card, aligning buttons side-by-side or stacked cleanly.
- Add micro-animations and glow highlights for action buttons.
- Create class styles for file inputs to maintain a premium custom upload appearance instead of browser defaults.

---

### [Component: Logic & State Management]

#### [MODIFY] [app.js](file:///c:/Users/Salem/Documents/LOCAL%20REPOS/food%20app/app.js)
- Implement `exportAppData()`:
  - Aggregates `state.ingredients`, `state.recipes`, and `state.knownIngredients`.
  - Serializes to a formatted JSON string.
  - Triggers a browser download file named `pantrychef_backup_[date].json`.
  - Displays a success toast notification.
- Implement `importAppData(event)`:
  - Reads the selected file using `FileReader`.
  - Validates JSON format and checks for presence of required keys.
  - Warns the user with a confirmation dialog: *"This will replace your current kitchen pantry, recipes, and difficulty costs. Proceed?"*
  - Overwrites the local state, saves it to `localStorage`, re-runs synchronization, and updates active tab views.
  - Displays success or failure toast notifications.

---

## 3. Verification Plan

### Manual Verification
1. **Export Functionality**:
   - Add a custom ingredient and a custom recipe.
   - Adjust the difficulty of an ingredient.
   - Click "Export Backup". Verify a `.json` file is downloaded.
   - Inspect the downloaded file to ensure it contains the custom data.
2. **Import Functionality**:
   - Clear browser local storage or manually delete items.
   - Select the exported `.json` file.
   - Verify the warning popup appears. Confirm import.
   - Verify all custom ingredients, recipes, and difficulty values are fully restored.
3. **Invalid File Handling**:
   - Attempt to import a non-JSON file or a corrupted JSON file.
   - Verify an error toast appears and no state changes are made.
