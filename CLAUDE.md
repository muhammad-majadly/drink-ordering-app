# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static, single-tablet ordering app for a small drinks company (Majadly Drinks). One salesperson uses it to pick a client, tap through a product catalog, review a running order summary, and produce the order as a PDF (and optionally an email). There is intentionally no backend, database, build step, or package manager — just `index.html`, `style.css`, `script.js` opened directly in a browser.

Do not introduce a backend, database, bundler, or framework. Any new feature must fit inside these three static files and run entirely client-side.

## Running it

Open `index.html` directly in a browser (double-click, or `open index.html` on macOS). No install/build/serve step exists or is needed.

There is no test suite, linter, or build tool in this project — verify changes by opening the page and clicking through the flow (pick client → add products → send).

## Architecture

**`script.js`** holds all data and logic, in this order:
- `CONFIG` — `COMPANY_EMAIL`, the `SEND_EMAIL` feature flag, and the EmailJS `SERVICE_ID`/`TEMPLATE_ID`/`PUBLIC_KEY`. `CLIENTS` (predefined client list) and `PRODUCTS` (the ~10 sample drinks, meant to be extended to ~70) are also hardcoded here — this is the "database."
- `STATE` — in-memory `quantities` map (`productId -> qty`), current category/search filter, and `customProducts` (products added at runtime).
- Three persistence helpers each follow the same pattern: `loadX()` reads from `localStorage`, a `saveX()`/inline `localStorage.setItem` writes, and the value is merged with the hardcoded config at render time. This pattern covers: custom clients (`drinkOrderApp_customClients`), custom products (`drinkOrderApp_customProducts`). There is no other storage — closing the tablet's browser loses in-progress quantities but not saved clients/products.
- `getAllProducts()` is the single source of truth for "every orderable product" (hardcoded `PRODUCTS` + runtime `customProducts`) — always filter/search/lookup through this, not `PRODUCTS` directly.
- Render functions (`renderProducts`, `renderSummary`) fully rebuild their DOM subtree from state on every change rather than doing incremental updates — keep following this pattern rather than introducing partial DOM patching.
- `sendOrder()` is the checkout flow: validates client + at least one item, remembers a new client name if typed manually, always calls `downloadOrderPdf()`, and only calls EmailJS if `SEND_EMAIL` is `true`.

**Two independent output paths** share the same order data (client, items, total, timestamp) but are built separately:
- `downloadOrderPdf()` — uses jsPDF (loaded via CDN in `index.html`) to build and save a PDF client-side. jsPDF's default font cannot render the ₪ glyph, so this path spells out `"NIS"` instead of `₪` — keep that substitution if you touch this function.
- The email body (built inline in `sendOrder()`) uses `₪` freely since it's plain text sent through EmailJS, not rendered by jsPDF.

**Email sending is currently disabled** via `const SEND_EMAIL = false` (top of `script.js`) to avoid burning EmailJS's free-tier monthly quota during testing. The EmailJS wiring (service/template/public key, `emailjs.init`, `emailjs.send` call in `sendOrder()`) is intentionally left in place, not removed — flip `SEND_EMAIL` to `true` to re-enable emailing alongside the PDF download. EmailJS's free plan does not support file attachments (starts at $9/mo for that), which is why the PDF is a local download rather than an email attachment.

## Extending the product/client lists

- Add products by appending to the `PRODUCTS` array in `script.js`: `{ id, name, price, category, image }`. `id` must be unique; `category` must be one of the strings in `CATEGORIES` (also update `CATEGORIES` if adding a new category — the category filter bar and the "Add Product" form's category `<select>` are both generated from that array).
- Salespeople can also add products/clients at runtime via the UI ("+ Add New Product" button, or typing a client name); these are persisted to `localStorage` on that tablet only and merged with the hardcoded lists, they don't get written back into `script.js`.
