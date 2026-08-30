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
- `CONFIG` — `COMPANY_EMAIL`, the `SEND_EMAIL` feature flag, and the EmailJS `SERVICE_ID`/`TEMPLATE_ID`/`PUBLIC_KEY`. `CLIENTS` (predefined client list) and `PRODUCTS` (the real 86-item catalog, sourced from `names.rtf`, grouped by supplier) are also hardcoded here.
- `STATE` — in-memory `quantities` map (`productId -> qty`), current category/search filter, and `customProducts` (products added at runtime).
- Three persistence helpers each follow the same pattern: `loadX()` reads from `localStorage`, a `saveX()`/inline `localStorage.setItem` writes, and the value is merged with the hardcoded config at render time. This pattern covers: custom clients (`drinkOrderApp_customClients`), custom products (`drinkOrderApp_customProducts`). There is no other storage — closing the tablet's browser loses in-progress quantities but not saved clients/products.
- `getAllProducts()` is the single source of truth for "every orderable product" (hardcoded `PRODUCTS` + runtime `customProducts`) — always filter/search/lookup through this, not `PRODUCTS` directly.
- Render functions (`renderProducts`, `renderSummary`) fully rebuild their DOM subtree from state on every change rather than doing incremental updates — keep following this pattern rather than introducing partial DOM patching.
- `sendOrder()` is the checkout flow: validates client + at least one item, remembers a new client name if typed manually, always calls `downloadOrderPdf()` and `saveOrderToDatabase()`, and only calls EmailJS if `SEND_EMAIL` is `true`. PDF + email are being kept as a fallback alongside the database, not replaced by it — don't remove them without being asked.

**Two independent output paths** share the same order data (client, items, total, timestamp) but are built separately:
- `downloadOrderPdf()` — uses jsPDF (loaded via CDN in `index.html`) to build and save a PDF client-side. jsPDF's default font cannot render the ₪ glyph, so this path spells out `"NIS"` instead of `₪` — keep that substitution if you touch this function.
- The email body (built inline in `sendOrder()`) uses `₪` freely since it's plain text sent through EmailJS, not rendered by jsPDF.

**Email sending is currently disabled** via `const SEND_EMAIL = false` (top of `script.js`) to avoid burning EmailJS's free-tier monthly quota during testing. The EmailJS wiring (service/template/public key, `emailjs.init`, `emailjs.send` call in `sendOrder()`) is intentionally left in place, not removed — flip `SEND_EMAIL` to `true` to re-enable emailing alongside the PDF download. EmailJS's free plan does not support file attachments (starts at $9/mo for that), which is why the PDF is a local download rather than an email attachment.

## Shared order database (Firestore) + office page

Every submitted order is also saved to a Firestore collection `orders` via `saveOrderToDatabase()` in `script.js`, so office staff can see it in `office.html` without relying on PDF/email. Document shape: `{ client, dateStr, timeStr, items: [{id, name, qty, price}], total, createdAt, salesPin, officePin }`.

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

## Extending the product/client lists

- Add products by appending to the `PRODUCTS` array in `script.js`: `{ id, name, price, category, image }`. `id` must be unique; `category` must be one of the strings in `CATEGORIES` (also update `CATEGORIES` if adding a new category — the category filter bar and the "Add Product" form's category `<select>` are both generated from that array).
- Salespeople can also add products/clients at runtime via the UI ("+ Add New Product" button, or typing a client name); these are persisted to `localStorage` on that tablet only and merged with the hardcoded lists, they don't get written back into `script.js`.
