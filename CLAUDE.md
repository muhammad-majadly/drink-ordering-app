# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Hebrew/RTL ordering app for a small drinks company (משקאות מגאדלי), hosted as a static site on GitHub Pages. There are two static pages sharing the same product/style code style: `index.html` (the salesperson's ordering page — pick a client, tap through the 86-product catalog by category, review a running order summary, then send) and `office.html` (a read-only page for office staff to browse every order that's come in). No build step, no package manager, no bundler — everything is plain HTML/CSS/JS plus a handful of libraries loaded via CDN `<script>` tags.

Do not introduce a bundler or framework. Keep every new feature as plain static files loaded via `<script>` tags, consistent with how jsPDF/EmailJS/Firebase are already wired in.

## Running it

Open `index.html` (or `office.html`) directly in a browser, or via the deployed GitHub Pages URL. No install/build/serve step exists or is needed.

There is no test suite, linter, or build tool in this project — verify changes by opening the page and clicking through the flow (pick client → add products → send, and separately, load `office.html` and check the order shows up).

## Architecture

**`script.js`** (ordering page) holds all data and logic, in this order:
- `CONFIG` — `COMPANY_EMAIL`, the `SEND_EMAIL` feature flag, and the EmailJS `SERVICE_ID`/`TEMPLATE_ID`/`PUBLIC_KEY`. `CITIES` + `CLIENTS` (each client is `{name, city}`, used to filter the client dropdown by city) and `PRODUCTS` (the real 86-item catalog, sourced from `names.rtf`, grouped by supplier) are also hardcoded here. Each product has a default `unitType` (one of `UNIT_TYPES`: יחידה/ארגז/משטח — the wholesale unit it's normally sold by) and `size` (researched/best-guess package size). Both `unitType` and `price` are overridable per order directly on the product card — `price` is intentionally left `""` on every catalog product (no fixed prices; the salesperson types it in), and the unit-type `<select>` defaults to the product's configured value but can be switched for that order. Overrides live in the `prices`/`unitTypeOverrides` runtime maps, resolved via `getResolvedPrice()`/`getResolvedUnitType()`.
- `STATE` — in-memory `quantities` map and `prices` map (both `productId -> value`, the latter holding whatever the salesperson typed into that product's price input), current category/search/city filter, and `customProducts` (products added at runtime).
- Three persistence helpers each follow the same pattern: `loadX()` reads from `localStorage`, a `saveX()`/inline `localStorage.setItem` writes, and the value is merged with the hardcoded config at render time. This pattern covers: custom clients (`drinkOrderApp_customClients`), custom products (`drinkOrderApp_customProducts`). There is no other storage — closing the tablet's browser loses in-progress quantities but not saved clients/products.
- `getAllProducts()` is the single source of truth for "every orderable product" (hardcoded `PRODUCTS` + runtime `customProducts`) — always filter/search/lookup through this, not `PRODUCTS` directly. Similarly `getAllClients()` merges hardcoded `CLIENTS` with runtime custom clients from `localStorage`; `populateClientOptions()` rebuilds the client `<select>` filtered to the currently chosen city.
- `getResolvedPrice(product)` / `getOrderedProducts()` resolve the effective price per line: whatever's in the `prices` map for that product id, falling back to `product.price` (only ever non-empty for a custom product created with a price). Every downstream consumer (summary, PDF, database, email) reads the resolved `price` off the items `getOrderedProducts()` returns — never `product.price` directly, since that's `""` for the whole catalog.
- Render functions (`renderProducts`, `renderSummary`) fully rebuild their DOM subtree from state on every change rather than doing incremental updates — keep following this pattern rather than introducing partial DOM patching.
- `sendOrder()` is the checkout flow: validates client + at least one item, remembers a new client name if typed manually, always calls `downloadOrderPdf()` and `saveOrderToDatabase()`, and only calls EmailJS if `SEND_EMAIL` is `true`. PDF + email are being kept as a fallback alongside the database, not replaced by it — don't remove them without being asked.

**Two independent output paths** share the same order data (client, items, total, timestamp) but are built separately:
- `downloadOrderPdf()` — uses jsPDF + jsPDF-AutoTable (CDN) to build and save a PDF client-side. jsPDF's built-in fonts only cover ASCII, so any Hebrew text (product names, labels) and the ₪ glyph are rasterized onto a canvas with the browser's own font and placed as small images (`textToImage`/`placeImage*` helpers) instead of native PDF text — see the comment above `textToImage` for why.
- The email body (built inline in `sendOrder()`) uses `₪`/Hebrew freely as plain text sent through EmailJS — no rendering constraints there.

**Email sending is currently disabled** via `const SEND_EMAIL = false` (top of `script.js`) to avoid burning EmailJS's free-tier monthly quota during testing. The EmailJS wiring (service/template/public key, `emailjs.init`, `emailjs.send` call in `sendOrder()`) is intentionally left in place, not removed — flip `SEND_EMAIL` to `true` to re-enable emailing alongside the PDF download. EmailJS's free plan does not support file attachments (starts at $9/mo for that), which is why the PDF is a local download rather than an email attachment.

## Shared order database (Firestore) + office page

Every submitted order is also saved to a Firestore collection `orders` via `saveOrderToDatabase()` in `script.js`, so office staff can see it in `office.html` without relying on PDF/email. Document shape: `{ client, dateStr, timeStr, items: [{id, name, size, unitType, qty, price}], total, createdAt, salesPin, officePin }`.

**`firebase-config.js`** is shared by both pages (loaded before `script.js`/`office.js`): it holds `FIREBASE_CONFIG` (from the Firebase console — safe to keep public, it's not a secret) and the two access codes `SALES_PIN`/`OFFICE_PIN`. It's currently filled with `PASTE_YOUR_...` placeholders — a real Firebase project (free Spark tier) needs to be created and its config pasted in before this works. See the Firebase setup steps below.

**`pin-gate.js`** (shared) exposes `requirePin(pin, storageKey)`, called as the first line of both pages' `init()`. It's a plain `prompt()` loop checked against a hardcoded constant, remembered via `localStorage` — a UI-level deterrent, not real security. The actual enforcement is in Firestore's security rules, which must require the matching pin value on every read/write:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /orders/{orderId} {
      allow create: if request.resource.data.salesPin == "<SALES_PIN>";
      allow read: if resource.data.officePin == "<OFFICE_PIN>";
      allow update, delete: if false;
    }
  }
}
```

`office.js`'s query (`where officePin == OFFICE_PIN`) must keep matching the rule's condition — Firestore rejects a list read outright if the query itself doesn't include the field the rule checks. This setup stops random automated scanners hitting an exposed Firestore project; it does not stop someone who reads this repo's JS and extracts the pin constants — there's no way to keep a true secret in a static site without real backend-verified auth (a bigger step than this app needs today).

**Firebase setup** (one-time, free, no credit card): create a project at the Firebase console → add a Web app → copy its config into `FIREBASE_CONFIG` in `firebase-config.js` → enable Firestore (Native mode) → paste the rules above (with real pin values) into Firestore's Rules tab.

**`office.js`** queries `orders`, renders each as a card (`buildOrderCard`), and its per-order **Print** button (`printOrder`) builds a standalone printable HTML string and opens it via `window.open()` + `document.write()` + `.print()` — no PDF library involved, just the browser's native print/print-to-PDF dialog.

## Extending the product/client/city lists

- Add products by appending to the `PRODUCTS` array in `script.js`: `{ id, name, size, unitType, price, category, image }`. `id` must be unique; `category` must be one of the strings in `CATEGORIES`; `unitType` must be one of `UNIT_TYPES` (also update `CATEGORIES`/`UNIT_TYPES` if adding a new one — the category filter bar and the "Add Product" form's `<select>`s are all generated from these arrays). Leave `price: ""` unless you specifically want a fixed price the salesperson can't override.
- Add clients by appending to `CLIENTS`: `{ name, city }`. `city` must be one of `CITIES` (or `""` for "no specific city" — it just won't show under any city filter other than "כל הערים").
- Salespeople can also add products/clients at runtime via the UI ("+ Add New Product" button, or typing a client name — which gets tagged with whatever city is currently selected in the city filter); these are persisted to `localStorage` on that tablet only and merged with the hardcoded lists, they don't get written back into `script.js`.
