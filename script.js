// ============================================================
// CONFIG
// ============================================================

const COMPANY_EMAIL = "majadlydrinks@gmail.com";

// Set to true to also email the order via EmailJS (in addition to the PDF download).
// Turned off for now to avoid using up the EmailJS free-tier monthly email quota.
const SEND_EMAIL = true;

const EMAILJS_SERVICE_ID = "service_k1x0q4g";
const EMAILJS_TEMPLATE_ID = "template_nge4pdm";
const EMAILJS_PUBLIC_KEY = "qYu4fJoI8ADq-wjBN";

// Predefined cities and clients. Feel free to add/remove/edit freely.
// Each client belongs to one city, used to filter the client dropdown below.
const CITIES = ["נצרת", "עכו", "חיפה", "טבריה"];

const CLIENTS = [
  { name: "Abu Ahmad Market", city: "נצרת" },
  { name: "Al Salam Grocery", city: "עכו" },
  { name: "Green Valley Store", city: "חיפה" },
  { name: "Sunrise Mini Market", city: "טבריה" },
  { name: "City Center Kiosk", city: "נצרת" }
];

// Product list, from the real supplier catalog. Each product: id (unique),
// name (kept as the real brand/flavor name, not translated), size (package
// size, researched/best-guess), unitType (one of UNIT_TYPES below — the fixed
// wholesale unit this product is sold by), price (intentionally left "" —
// the salesperson enters it per order on the product card), category (must
// match one of CATEGORIES below), image (optional path/URL, leave "" if none).
const PRODUCTS = [
  // ---- יפאורה תבורי ----
  { id: "p1",  name: "תפוזינה תפוזים",              size: "1.5 ליטר", unitType: "ארגז", price: "", category: "יפאורה תבורי", image: "images/p1.png" },
  { id: "p2",  name: "תפוזינה אשכוליות",             size: "1.5 ליטר", unitType: "ארגז", price: "", category: "יפאורה תבורי", image: "images/p2.png" },
  { id: "p3",  name: "תפוזינה ענבים",                size: "1.5 ליטר", unitType: "ארגז", price: "", category: "יפאורה תבורי", image: "images/p3.png" },
  { id: "p4",  name: "תפוזינה מנגו",                 size: "1.5 ליטר", unitType: "ארגז", price: "", category: "יפאורה תבורי", image: "images/p4.png" },
  { id: "p5",  name: "תפוזינה דיאט / Zero",          size: "1.5 ליטר", unitType: "ארגז", price: "", category: "יפאורה תבורי", image: "images/p5.png" },
  { id: "p6",  name: "ספרינג תפוזים",                size: "1.5 ליטר", unitType: "ארגז", price: "", category: "יפאורה תבורי", image: "images/p6.png" },
  { id: "p7",  name: "ספרינג מנגו",                  size: "1.5 ליטר", unitType: "ארגז", price: "", category: "יפאורה תבורי", image: "images/p7.png" },
  { id: "p8",  name: "ספרינג אפרסק",                 size: "1.5 ליטר", unitType: "ארגז", price: "", category: "יפאורה תבורי", image: "images/p8.png" },
  { id: "p9",  name: "ספרינג תפוחים",                size: "1.5 ליטר", unitType: "ארגז", price: "", category: "יפאורה תבורי", image: "images/p9.png" },
  { id: "p10", name: "ספרינג ענבים",                 size: "1.5 ליטר", unitType: "ארגז", price: "", category: "יפאורה תבורי", image: "images/p10.png" },
  { id: "p11", name: "ספרינג אננס",                  size: "1.5 ליטר", unitType: "ארגז", price: "", category: "יפאורה תבורי", image: "images/p11.png" },
  { id: "p12", name: "ספרינג לימונדה",                size: "1.5 ליטר", unitType: "ארגז", price: "", category: "יפאורה תבורי", image: "images/p12.png" },
  { id: "p13", name: "ספרינג תה אפרסק",               size: "1.5 ליטר", unitType: "ארגז", price: "", category: "יפאורה תבורי", image: "images/p13.png" },
  { id: "p14", name: "ספרינג תה לימון",               size: "1.5 ליטר", unitType: "ארגז", price: "", category: "יפאורה תבורי", image: "images/p14.png" },
  { id: "p15", name: "שוופס סודה",                   size: "1.5 ליטר", unitType: "ארגז", price: "", category: "יפאורה תבורי", image: "images/p15.jpg" },
  { id: "p16", name: "שוופס טוניק",                   size: "1.5 ליטר", unitType: "ארגז", price: "", category: "יפאורה תבורי", image: "images/p16.png" },
  { id: "p17", name: "שוופס ביטר למון",               size: "1.5 ליטר", unitType: "ארגז", price: "", category: "יפאורה תבורי", image: "images/p17.png" },
  { id: "p18", name: "שוופס ג'ינג'ר אייל",            size: "1.5 ליטר", unitType: "ארגז", price: "", category: "יפאורה תבורי", image: "images/p18.png" },
  { id: "p19", name: "שוופס מוגז פירות",              size: "1.5 ליטר", unitType: "ארגז", price: "", category: "יפאורה תבורי", image: "images/p19.jpg" },
  { id: "p20", name: "שוופס מוחיטו",                  size: "1.5 ליטר", unitType: "ארגז", price: "", category: "יפאורה תבורי", image: "images/p20.png" },
  { id: "p21", name: "שוופס No Sugar",                size: "1.5 ליטר", unitType: "ארגז", price: "", category: "יפאורה תבורי", image: "images/p21.jpg" },
  { id: "p22", name: "שוופס מיקסרים",                 size: "מארז 6 יחידות 250 מ\"ל", unitType: "ארגז", price: "", category: "יפאורה תבורי", image: "images/p22.jpg" },
  { id: "p23", name: "RC קולה",                       size: "1.5 ליטר", unitType: "ארגז", price: "", category: "יפאורה תבורי", image: "images/p23.png" },
  { id: "p24", name: "RC קולה ללא סוכר",               size: "1.5 ליטר", unitType: "ארגז", price: "", category: "יפאורה תבורי", image: "images/p24.png" },
  { id: "p25", name: "קריסטל",                       size: "2 ליטר", unitType: "ארגז", price: "", category: "יפאורה תבורי", image: "images/p25.png" },
  { id: "p26", name: "מיץ פז",                        size: "280 מ\"ל", unitType: "ארגז", price: "", category: "יפאורה תבורי", image: "images/p26.png" },
  { id: "p27", name: "Fruit Water",                   size: "1.5 ליטר", unitType: "ארגז", price: "", category: "יפאורה תבורי", image: "images/p27.png" },
  { id: "p28", name: "Fruit & Veg",                   size: "1 ליטר", unitType: "ארגז", price: "", category: "יפאורה תבורי", image: "images/p28.png" },
  { id: "p29", name: "עין גדי מים מינרליים",           size: "1.5 ליטר", unitType: "משטח", price: "", category: "יפאורה תבורי", image: "images/p29.png" },

  // ---- טמפו ----
  { id: "p30", name: "פפסי",                          size: "1.5 ליטר", unitType: "ארגז", price: "", category: "טמפו", image: "images/p30.png" },
  { id: "p31", name: "פפסי מקס",                      size: "1.5 ליטר", unitType: "ארגז", price: "", category: "טמפו", image: "images/p31.jpg" },
  { id: "p32", name: "7UP",                           size: "1.5 ליטר", unitType: "ארגז", price: "", category: "טמפו", image: "images/p32.png" },
  { id: "p33", name: "7UP Free / Zero",               size: "1.5 ליטר", unitType: "ארגז", price: "", category: "טמפו", image: "images/p33.png" },
  { id: "p34", name: "מירינדה תפוז",                   size: "1.5 ליטר", unitType: "ארגז", price: "", category: "טמפו", image: "images/p34.png" },
  { id: "p35", name: "XL",                            size: "250 מ\"ל פחית", unitType: "ארגז", price: "", category: "טמפו", image: "images/p35.png" },
  { id: "p36", name: "XL TEN",                        size: "250 מ\"ל פחית", unitType: "ארגז", price: "", category: "טמפו", image: "images/p36.jpg" },
  { id: "p37", name: "טעמי XL שונים",                  size: "250 מ\"ל פחית", unitType: "ארגז", price: "", category: "טמפו", image: "images/p37.jpg" },
  { id: "p38", name: "נסטי אפרסק",                     size: "1.5 ליטר", unitType: "ארגז", price: "", category: "טמפו", image: "images/p38.png" },
  { id: "p39", name: "נסטי לימון",                     size: "1.5 ליטר", unitType: "ארגז", price: "", category: "טמפו", image: "" },
  { id: "p40", name: "ג'אמפ תפוזים",                   size: "1.5 ליטר", unitType: "ארגז", price: "", category: "טמפו", image: "images/p40.jpg" },
  { id: "p41", name: "ג'אמפ מנגו",                     size: "1.5 ליטר", unitType: "ארגז", price: "", category: "טמפו", image: "images/p41.jpg" },
  { id: "p42", name: "ג'אמפ אשכוליות",                 size: "1.5 ליטר", unitType: "ארגז", price: "", category: "טמפו", image: "images/p42.jpg" },
  { id: "p43", name: "ג'אמפ תפוחים",                   size: "1.5 ליטר", unitType: "ארגז", price: "", category: "טמפו", image: "" },
  { id: "p44", name: "ג'אמפ ענבים",                    size: "1.5 ליטר", unitType: "ארגז", price: "", category: "טמפו", image: "images/p44.png" },
  { id: "p45", name: "ג'אמפ טעמים נוספים",              size: "1.5 ליטר", unitType: "ארגז", price: "", category: "טמפו", image: "images/p45.jpg" },
  { id: "p46", name: "סיידר הגליל",                    size: "1 ליטר", unitType: "ארגז", price: "", category: "טמפו", image: "images/p46.jpg" },
  { id: "p47", name: "נשר מאלט",                       size: "500 מ\"ל", unitType: "ארגז", price: "", category: "טמפו", image: "images/p47.jpg" },
  { id: "p48", name: "ד\"ר פפר",                       size: "330 מ\"ל", unitType: "ארגז", price: "", category: "טמפו", image: "images/p48.png" },
  { id: "p49", name: "Gatorade",                      size: "500 מ\"ל", unitType: "ארגז", price: "", category: "טמפו", image: "images/p49.jpg" },
  { id: "p50", name: "Arizona",                       size: "680 מ\"ל", unitType: "ארגז", price: "", category: "טמפו", image: "images/p50.png" },
  { id: "p51", name: "V8",                            size: "1 ליטר", unitType: "ארגז", price: "", category: "טמפו", image: "images/p51.jpg" },
  { id: "p52", name: "Vita Coco",                     size: "330 מ\"ל", unitType: "ארגז", price: "", category: "טמפו", image: "images/p52.jpg" },
  { id: "p53", name: "Jumex",                         size: "335 מ\"ל", unitType: "ארגז", price: "", category: "טמפו", image: "images/p53.jpg" },
  { id: "p54", name: "Jumex Unicofresco",             size: "1 ליטר", unitType: "ארגז", price: "", category: "טמפו", image: "images/p54.jpg" },
  { id: "p55", name: "Guarana",                       size: "350 מ\"ל", unitType: "ארגז", price: "", category: "טמפו", image: "images/p55.jpg" },
  { id: "p56", name: "Perrier",                       size: "330 מ\"ל", unitType: "ארגז", price: "", category: "טמפו", image: "images/p56.jpg" },
  { id: "p57", name: "Perrier Juice",                 size: "330 מ\"ל", unitType: "ארגז", price: "", category: "טמפו", image: "images/p57.jpg" },
  { id: "p58", name: "סאפה",                          size: "220 מ\"ל", unitType: "ארגז", price: "", category: "טמפו", image: "images/p58.jpg" },
  { id: "p59", name: "איילנד",                        size: "330 מ\"ל", unitType: "ארגז", price: "", category: "טמפו", image: "images/p59.png" },
  { id: "p60", name: "מאסטר קפה",                      size: "250 מ\"ל", unitType: "ארגז", price: "", category: "טמפו", image: "images/p60.jpg" },

  // ---- קוקה-קולה / CBC ----
  { id: "p61", name: "קוקה־קולה",                     size: "1.5 ליטר", unitType: "ארגז", price: "", category: "קוקה-קולה / CBC", image: "images/p61.jpg" },
  { id: "p62", name: "קוקה־קולה Zero",                size: "1.5 ליטר", unitType: "ארגז", price: "", category: "קוקה-קולה / CBC", image: "images/p62.jpg" },
  { id: "p63", name: "דיאט קוקה־קולה",                 size: "1.5 ליטר", unitType: "ארגז", price: "", category: "קוקה-קולה / CBC", image: "images/p63.jpg" },
  { id: "p64", name: "ספרייט",                        size: "1.5 ליטר", unitType: "ארגז", price: "", category: "קוקה-קולה / CBC", image: "images/p64.jpg" },
  { id: "p65", name: "ספרייט Zero",                   size: "1.5 ליטר", unitType: "ארגז", price: "", category: "קוקה-קולה / CBC", image: "images/p65.jpg" },
  { id: "p66", name: "פאנטה תפוז",                     size: "1.5 ליטר", unitType: "ארגז", price: "", category: "קוקה-קולה / CBC", image: "images/p66.jpg" },
  { id: "p67", name: "פאנטה בטעמים נוספים",             size: "1.5 ליטר", unitType: "ארגז", price: "", category: "קוקה-קולה / CBC", image: "images/p67.jpg" },
  { id: "p68", name: "Fuze Tea אפרסק",                size: "1.5 ליטר", unitType: "ארגז", price: "", category: "קוקה-קולה / CBC", image: "images/p68.png" },
  { id: "p69", name: "Fuze Tea מנגו אננס",            size: "1.5 ליטר", unitType: "ארגז", price: "", category: "קוקה-קולה / CBC", image: "images/p69.jpg" },
  { id: "p70", name: "Fuze Tea אבטיח",                size: "1.5 ליטר", unitType: "ארגז", price: "", category: "קוקה-קולה / CBC", image: "images/p70.png" },
  { id: "p71", name: "Fuze Tea ענבים",                size: "1.5 ליטר", unitType: "ארגז", price: "", category: "קוקה-קולה / CBC", image: "images/p71.jpg" },
  { id: "p72", name: "Fuze Tea לימון נענע",           size: "1.5 ליטר", unitType: "ארגז", price: "", category: "קוקה-קולה / CBC", image: "images/p72.jpg" },
  { id: "p73", name: "Fuze Tea Zero אפרסק",           size: "1.5 ליטר", unitType: "ארגז", price: "", category: "קוקה-קולה / CBC", image: "images/p73.jpg" },
  { id: "p74", name: "Fuze Tea Zero פירות יער נענע",  size: "1.5 ליטר", unitType: "ארגז", price: "", category: "קוקה-קולה / CBC", image: "images/p74.jpg" },
  { id: "p75", name: "Fuze Tea Zero Green ליצ'י פסיפלורה", size: "1.5 ליטר", unitType: "ארגז", price: "", category: "קוקה-קולה / CBC", image: "images/p75.png" },
  { id: "p76", name: "קינלי סודה",                     size: "1.5 ליטר", unitType: "ארגז", price: "", category: "קוקה-קולה / CBC", image: "images/p76.png" },
  { id: "p77", name: "Powerade / טעמים שונים",        size: "500 מ\"ל", unitType: "ארגז", price: "", category: "קוקה-קולה / CBC", image: "images/p77.jpg" },
  { id: "p78", name: "פריגת תפוזים",                   size: "1.5 ליטר", unitType: "ארגז", price: "", category: "קוקה-קולה / CBC", image: "images/p78.jpg" },
  { id: "p79", name: "פריגת אשכוליות",                 size: "1.5 ליטר", unitType: "ארגז", price: "", category: "קוקה-קולה / CBC", image: "images/p79.jpg" },
  { id: "p80", name: "פריגת לימונדה",                  size: "1.5 ליטר", unitType: "ארגז", price: "", category: "קוקה-קולה / CBC", image: "images/p80.jpg" },
  { id: "p81", name: "פריגת מנגו",                     size: "1.5 ליטר", unitType: "ארגז", price: "", category: "קוקה-קולה / CBC", image: "images/p81.jpg" },
  { id: "p82", name: "פריגת תפוחים",                   size: "1.5 ליטר", unitType: "ארגז", price: "", category: "קוקה-קולה / CBC", image: "images/p82.jpg" },
  { id: "p83", name: "פריגת ענבים",                    size: "1.5 ליטר", unitType: "ארגז", price: "", category: "קוקה-קולה / CBC", image: "images/p83.png" },
  { id: "p84", name: "פריגת נקטרים/מיצים בטעמים נוספים", size: "1.5 ליטר", unitType: "ארגז", price: "", category: "קוקה-קולה / CBC", image: "images/p84.webp" },
  { id: "p85", name: "נביעות מים מינרליים",             size: "1.5 ליטר", unitType: "משטח", price: "", category: "קוקה-קולה / CBC", image: "images/p85.png" },
  { id: "p86", name: "נביעות בטעמים",                   size: "1.5 ליטר", unitType: "ארגז", price: "", category: "קוקה-קולה / CBC", image: "images/p86.jpg" }
];

const ALL_CATEGORY = "הכל";
const CATEGORIES = [ALL_CATEGORY, "יפאורה תבורי", "טמפו", "קוקה-קולה / CBC"];

const CUSTOM_CLIENTS_KEY = "drinkOrderApp_customClients";
const CUSTOM_PRODUCTS_KEY = "drinkOrderApp_customProducts";

// ============================================================
// STATE
// ============================================================

const quantities = {}; // productId -> qty
const prices = {}; // productId -> price entered by the salesperson
const unitTypeOverrides = {}; // productId -> unit type chosen for this order (overrides the product's default)
let activeCategory = ALL_CATEGORY;
let searchTerm = "";
let customProducts = []; // products added on the fly by the salesperson

const UNIT_TYPES = ["יחידה", "ארגז", "משטח"];
const UNIT_TYPE_PLURALS = { "יחידה": "יחידות", "ארגז": "ארגזים", "משטח": "משטחים" };

function unitLabel(unitType, qty) {
  if (qty === 1) return unitType;
  return UNIT_TYPE_PLURALS[unitType] || unitType;
}

// ============================================================
// DOM REFS
// ============================================================

const citySelect = document.getElementById("citySelect");
const clientSelect = document.getElementById("clientSelect");
const clientInput = document.getElementById("clientInput");
const searchBox = document.getElementById("searchBox");
const categoryBar = document.getElementById("categoryBar");
const productGrid = document.getElementById("productGrid");
const summaryClient = document.getElementById("summaryClient");
const summaryItems = document.getElementById("summaryItems");
const summaryTotal = document.getElementById("summaryTotal");
const sendOrderBtn = document.getElementById("sendOrderBtn");
const clearOrderBtn = document.getElementById("clearOrderBtn");
const addProductToggleBtn = document.getElementById("addProductToggleBtn");
const addProductForm = document.getElementById("addProductForm");
const newProductName = document.getElementById("newProductName");
const newProductSize = document.getElementById("newProductSize");
const newProductPrice = document.getElementById("newProductPrice");
const newProductCategory = document.getElementById("newProductCategory");
const newProductUnitType = document.getElementById("newProductUnitType");
const saveNewProductBtn = document.getElementById("saveNewProductBtn");
const cancelNewProductBtn = document.getElementById("cancelNewProductBtn");

// ============================================================
// INIT
// ============================================================

function init() {
  if (!requirePin(SALES_PIN, "drinkOrderApp_salesPinOk")) return;

  if (SEND_EMAIL) emailjs.init(EMAILJS_PUBLIC_KEY);

  CITIES.forEach(city => {
    const opt = document.createElement("option");
    opt.value = city;
    opt.textContent = city;
    citySelect.appendChild(opt);
  });
  citySelect.addEventListener("change", populateClientOptions);
  populateClientOptions();

  customProducts = loadCustomProducts();

  CATEGORIES.filter(cat => cat !== ALL_CATEGORY).forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    newProductCategory.appendChild(opt);
  });

  UNIT_TYPES.forEach(unitType => {
    const opt = document.createElement("option");
    opt.value = unitType;
    opt.textContent = unitType;
    newProductUnitType.appendChild(opt);
  });

  CATEGORIES.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "category-btn" + (cat === activeCategory ? " active" : "");
    btn.textContent = cat;
    btn.dataset.category = cat;
    btn.addEventListener("click", () => {
      activeCategory = cat;
      document.querySelectorAll(".category-btn").forEach(b => {
        b.classList.toggle("active", b.dataset.category === cat);
      });
      renderProducts();
    });
    categoryBar.appendChild(btn);
  });

  clientSelect.addEventListener("change", () => {
    if (clientSelect.value) clientInput.value = clientSelect.value;
    renderSummary();
  });
  clientInput.addEventListener("input", renderSummary);

  searchBox.addEventListener("input", () => {
    searchTerm = searchBox.value.trim().toLowerCase();
    renderProducts();
  });

  sendOrderBtn.addEventListener("click", sendOrder);
  clearOrderBtn.addEventListener("click", clearOrder);

  addProductToggleBtn.addEventListener("click", () => {
    addProductForm.hidden = !addProductForm.hidden;
    if (!addProductForm.hidden) newProductName.focus();
  });
  cancelNewProductBtn.addEventListener("click", closeAddProductForm);
  saveNewProductBtn.addEventListener("click", saveNewProduct);

  renderProducts();
  renderSummary();
}

// ============================================================
// CLIENTS (predefined + remembered custom markets)
// ============================================================

function loadCustomClients() {
  try {
    return JSON.parse(localStorage.getItem(CUSTOM_CLIENTS_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function getAllClients() {
  return CLIENTS.concat(loadCustomClients());
}

function populateClientOptions() {
  const selectedCity = citySelect.value;
  clientSelect.innerHTML = '<option value="">-- בחר לקוח --</option>';
  getAllClients()
    .filter(c => !selectedCity || c.city === selectedCity)
    .forEach(c => {
      const opt = document.createElement("option");
      opt.value = c.name;
      opt.textContent = c.name;
      clientSelect.appendChild(opt);
    });
}

function isKnownClient(name) {
  const lower = name.toLowerCase();
  return getAllClients().some(c => c.name.toLowerCase() === lower);
}

function rememberNewClient(name) {
  if (!name || isKnownClient(name)) return;
  const custom = loadCustomClients();
  custom.push({ name, city: citySelect.value || "" });
  localStorage.setItem(CUSTOM_CLIENTS_KEY, JSON.stringify(custom));
  populateClientOptions();
}

// ============================================================
// CUSTOM PRODUCTS (added on the fly by the salesperson)
// ============================================================

function loadCustomProducts() {
  try {
    return JSON.parse(localStorage.getItem(CUSTOM_PRODUCTS_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCustomProducts() {
  localStorage.setItem(CUSTOM_PRODUCTS_KEY, JSON.stringify(customProducts));
}

function getAllProducts() {
  return PRODUCTS.concat(customProducts);
}

function slugify(name) {
  return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function closeAddProductForm() {
  addProductForm.hidden = true;
  newProductName.value = "";
  newProductSize.value = "";
  newProductPrice.value = "";
  newProductCategory.value = CATEGORIES[1];
  newProductUnitType.value = "ארגז";
}

function saveNewProduct() {
  const name = newProductName.value.trim();
  const size = newProductSize.value.trim();
  const priceInput = newProductPrice.value.trim();
  const category = newProductCategory.value;
  const unitType = newProductUnitType.value;

  if (!name) {
    alert("אנא הזן שם מוצר.");
    return;
  }
  if (priceInput !== "" && (isNaN(parseFloat(priceInput)) || parseFloat(priceInput) < 0)) {
    alert("אנא הזן מחיר תקין, או השאר ריק כדי להזין אותו מאוחר יותר.");
    return;
  }

  const baseId = "custom-" + slugify(name);
  let id = baseId;
  let suffix = 1;
  while (getAllProducts().some(p => p.id === id)) {
    id = baseId + "-" + suffix;
    suffix++;
  }

  const product = { id, name, size, price: priceInput === "" ? "" : parseFloat(priceInput), category, unitType, image: "" };
  customProducts.push(product);
  saveCustomProducts();

  closeAddProductForm();

  activeCategory = category;
  searchTerm = "";
  searchBox.value = "";
  document.querySelectorAll(".category-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.category === category);
  });

  renderProducts();
}

// ============================================================
// PRODUCT GRID
// ============================================================

function renderProducts() {
  productGrid.innerHTML = "";

  const filtered = getAllProducts().filter(p => {
    const matchesCategory = activeCategory === ALL_CATEGORY || p.category === activeCategory;
    const matchesSearch = !searchTerm || p.name.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  filtered.forEach(product => {
    productGrid.appendChild(buildProductCard(product));
  });
}

function buildProductCard(product) {
  const qty = quantities[product.id] || 0;

  const card = document.createElement("div");
  card.className = "product-card" + (qty > 0 ? " has-qty" : "");

  const img = document.createElement(product.image ? "img" : "div");
  img.className = "product-image" + (product.image ? "" : " placeholder");
  if (product.image) {
    img.src = product.image;
    img.alt = product.name;
  } else {
    img.textContent = "אין תמונה";
  }

  const name = document.createElement("div");
  name.className = "product-name";
  name.textContent = product.name;

  const size = document.createElement("div");
  size.className = "product-size";
  size.textContent = product.size || "";

  const priceInput = document.createElement("input");
  priceInput.type = "number";
  priceInput.className = "product-price-input";
  priceInput.min = "0";
  priceInput.step = "0.5";
  priceInput.placeholder = "מחיר (₪)";
  const currentPrice = prices[product.id] !== undefined ? prices[product.id] : product.price;
  priceInput.value = currentPrice === "" || currentPrice === undefined ? "" : currentPrice;
  priceInput.addEventListener("input", () => {
    const val = priceInput.value;
    prices[product.id] = val === "" ? "" : parseFloat(val);
    renderSummary();
  });

  const qtyRow = document.createElement("div");
  qtyRow.className = "qty-row";

  const minusBtn = document.createElement("button");
  minusBtn.className = "qty-btn";
  minusBtn.textContent = "−";
  minusBtn.addEventListener("click", () => changeQty(product.id, -1));

  const qtyInput = document.createElement("input");
  qtyInput.type = "number";
  qtyInput.className = "qty-input";
  qtyInput.min = "0";
  qtyInput.value = qty || "";
  qtyInput.addEventListener("input", () => {
    const val = parseInt(qtyInput.value, 10);
    if (!val || val <= 0) {
      delete quantities[product.id];
    } else {
      quantities[product.id] = val;
    }
    card.classList.toggle("has-qty", !!quantities[product.id]);
    renderSummary();
  });

  const plusBtn = document.createElement("button");
  plusBtn.className = "qty-btn";
  plusBtn.textContent = "+";
  plusBtn.addEventListener("click", () => changeQty(product.id, 1));

  qtyRow.appendChild(minusBtn);
  qtyRow.appendChild(qtyInput);
  qtyRow.appendChild(plusBtn);

  const unitTypeSelect = document.createElement("select");
  unitTypeSelect.className = "product-unit-type-select";
  UNIT_TYPES.forEach(unitType => {
    const opt = document.createElement("option");
    opt.value = unitType;
    opt.textContent = unitType;
    unitTypeSelect.appendChild(opt);
  });
  unitTypeSelect.value = unitTypeOverrides[product.id] !== undefined ? unitTypeOverrides[product.id] : product.unitType;
  unitTypeSelect.addEventListener("change", () => {
    unitTypeOverrides[product.id] = unitTypeSelect.value;
    renderSummary();
  });

  card.appendChild(img);
  card.appendChild(name);
  if (product.size) card.appendChild(size);
  card.appendChild(priceInput);
  card.appendChild(qtyRow);
  if (product.unitType) card.appendChild(unitTypeSelect);

  return card;
}

function changeQty(productId, delta) {
  const current = quantities[productId] || 0;
  const next = Math.max(0, current + delta);
  if (next === 0) {
    delete quantities[productId];
  } else {
    quantities[productId] = next;
  }
  renderProducts();
  renderSummary();
}

// ============================================================
// ORDER SUMMARY
// ============================================================

function getClientName() {
  return clientInput.value.trim();
}

function getResolvedPrice(product) {
  const entered = prices[product.id];
  if (entered !== undefined && entered !== "") return Number(entered);
  return typeof product.price === "number" ? product.price : 0;
}

function getResolvedUnitType(product) {
  const override = unitTypeOverrides[product.id];
  return override !== undefined ? override : product.unitType;
}

function getOrderedProducts() {
  const allProducts = getAllProducts();
  return Object.keys(quantities)
    .map(id => {
      const product = allProducts.find(p => p.id === id);
      return product ? { product, qty: quantities[id], price: getResolvedPrice(product), unitType: getResolvedUnitType(product) } : null;
    })
    .filter(item => item && item.qty > 0);
}

function renderSummary() {
  const clientName = getClientName();
  summaryClient.textContent = clientName || "";

  const items = getOrderedProducts();
  summaryItems.innerHTML = "";

  if (items.length === 0) {
    summaryItems.innerHTML = '<p class="empty-msg">לא נבחרו מוצרים עדיין.</p>';
    summaryTotal.textContent = "";
    return;
  }

  let total = 0;

  items.forEach(({ product, qty, price, unitType }) => {
    const lineTotal = price * qty;
    total += lineTotal;

    const row = document.createElement("div");
    row.className = "summary-item";

    const info = document.createElement("div");
    const nameEl = document.createElement("div");
    nameEl.className = "summary-item-name";
    nameEl.textContent = product.name;
    const detailEl = document.createElement("div");
    detailEl.className = "summary-item-detail";
    detailEl.textContent = `${qty} ${unitLabel(unitType, qty)} × ₪${price} = ₪${lineTotal}`;
    info.appendChild(nameEl);
    info.appendChild(detailEl);

    const removeBtn = document.createElement("button");
    removeBtn.className = "summary-remove";
    removeBtn.textContent = "✕";
    removeBtn.addEventListener("click", () => {
      delete quantities[product.id];
      renderProducts();
      renderSummary();
    });

    row.appendChild(info);
    row.appendChild(removeBtn);
    summaryItems.appendChild(row);
  });

  summaryTotal.textContent = "סה\"כ: ₪" + total;
}

// ============================================================
// SEND ORDER
// ============================================================

function pad(n) {
  return n.toString().padStart(2, "0");
}

function formatDate(d) {
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
}

function formatTime(d) {
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

const BRAND_COLOR = [31, 111, 67]; // matches --brand green used in style.css
const HEBREW_RE = /[֐-׿]/;

// jsPDF's built-in fonts only cover ASCII, so any Hebrew text (and the ₪ glyph)
// is rasterized with the browser's own font (which renders both fine) and placed
// as a small image instead of PDF text. Direction/alignment auto-adapt to Hebrew content.
function textToImage(text, { fontPx = 40, fontWeight = "bold", color = "#000000" } = {}) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const scale = 3;
  const size = fontPx * scale;
  const fontFamily = "-apple-system, 'Segoe UI', Roboto, Arial, sans-serif";
  const isHebrew = HEBREW_RE.test(text);

  ctx.font = `${fontWeight} ${size}px ${fontFamily}`;
  const paddingX = size * 0.12;
  const width = Math.ceil(ctx.measureText(text).width + paddingX * 2);
  const height = Math.ceil(size * 1.3);

  canvas.width = width;
  canvas.height = height;
  ctx.font = `${fontWeight} ${size}px ${fontFamily}`;
  ctx.fillStyle = color;
  ctx.textBaseline = "middle";

  if (isHebrew) {
    ctx.direction = "rtl";
    ctx.textAlign = "right";
    ctx.fillText(text, width - paddingX, height / 2);
  } else {
    ctx.textAlign = "left";
    ctx.fillText(text, paddingX, height / 2);
  }

  return { dataUrl: canvas.toDataURL("image/png"), width, height };
}

function placeImageCentered(doc, img, centerXmm, centerYmm, targetHeightMm) {
  const h = targetHeightMm;
  const w = h * (img.width / img.height);
  doc.addImage(img.dataUrl, "PNG", centerXmm - w / 2, centerYmm - h / 2, w, h);
}

function placeImageLeft(doc, img, leftXmm, centerYmm, targetHeightMm) {
  const h = targetHeightMm;
  const w = h * (img.width / img.height);
  doc.addImage(img.dataUrl, "PNG", leftXmm, centerYmm - h / 2, w, h);
}

function placeImageRight(doc, img, rightXmm, centerYmm, targetHeightMm) {
  const h = targetHeightMm;
  const w = h * (img.width / img.height);
  doc.addImage(img.dataUrl, "PNG", rightXmm - w, centerYmm - h / 2, w, h);
}

// Table is laid out right-to-left: Total | Price | Qty | Product (rightmost),
// matching how a Hebrew reader scans the row.
const PDF_HEADER_LABELS = ["סה\"כ (₪)", "מחיר (₪)", "כמות", "מוצר"];

function downloadOrderPdf(clientName, items, total, now) {
  const doc = new jspdf.jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;

  // Branded header band
  doc.setFillColor(...BRAND_COLOR);
  doc.rect(0, 0, pageWidth, 26, "F");
  placeImageRight(doc, textToImage("משקאות מגאדלי", { fontPx: 46, color: "#ffffff" }), pageWidth - margin, 12, 7);
  placeImageRight(doc, textToImage("אישור הזמנה", { fontPx: 26, color: "#ffffff", fontWeight: "normal" }), pageWidth - margin, 21, 3.8);

  // Client / date / time
  let y = 36;
  placeImageRight(doc, textToImage("לקוח: " + clientName, { fontPx: 34, color: "#141414" }), pageWidth - margin, y, 4.2);
  placeImageLeft(doc, textToImage(`תאריך: ${formatDate(now)}    שעה: ${formatTime(now)}`, { fontPx: 30, color: "#141414", fontWeight: "normal" }), margin, y, 3.6);
  y += 8;

  const productColWidth = pageWidth - margin * 2 - 28 - 28 - 18;

  doc.autoTable({
    startY: y,
    margin: { left: margin, right: margin },
    head: [["", "", "", ""]],
    body: items.map(({ product, qty, price }) => [String(price * qty), String(price), String(qty), product.name]),
    theme: "grid",
    styles: { fontSize: 11, cellPadding: 3 },
    headStyles: { fillColor: BRAND_COLOR, textColor: 255, fontStyle: "bold" },
    alternateRowStyles: { fillColor: [242, 247, 244] },
    columnStyles: {
      0: { halign: "center", cellWidth: 28 },
      1: { halign: "center", cellWidth: 28 },
      2: { halign: "center", cellWidth: 18 },
      3: { halign: "right", cellWidth: productColWidth }
    },
    // jsPDF's built-in font can't render Hebrew, so the product-name column (mostly
    // Hebrew brand/flavor names) is blanked here and drawn as a rasterized image below instead.
    didParseCell: data => {
      if (data.section === "body" && data.column.index === 3) {
        data.cell.text = [""];
      }
    },
    didDrawCell: data => {
      if (data.section === "head") {
        const centerX = data.cell.x + data.cell.width / 2;
        const centerY = data.cell.y + data.cell.height / 2;
        placeImageCentered(doc, textToImage(PDF_HEADER_LABELS[data.column.index], { fontPx: 28, color: "#ffffff" }), centerX, centerY, 3.6);
        return;
      }
      if (data.section === "body" && data.column.index === 3) {
        const { product, qty, unitType } = items[data.row.index];
        const label = product.name + (unitType ? ` (${unitLabel(unitType, qty)})` : "");
        const centerY = data.cell.y + data.cell.height / 2;
        placeImageRight(doc, textToImage(label, { fontPx: 26, color: "#111111", fontWeight: "normal" }), data.cell.x + data.cell.width - 3, centerY, 3.6);
      }
    }
  });

  // Grand total bar
  let finalY = doc.lastAutoTable.finalY + 10;
  doc.setFillColor(...BRAND_COLOR);
  doc.rect(margin, finalY - 7, pageWidth - margin * 2, 13, "F");
  placeImageRight(doc, textToImage("סה\"כ להזמנה:", { fontPx: 38, color: "#ffffff" }), pageWidth - margin - 4, finalY, 5);
  placeImageLeft(doc, textToImage("₪ " + total, { fontPx: 44, color: "#ffffff" }), margin + 4, finalY, 5);

  const safeClientName = clientName.replace(/[^a-zA-Z0-9֐-׿؀-ۿ]+/g, "_");
  const fileDate = formatDate(now).replace(/\//g, "-");
  doc.save(`הזמנה_${safeClientName}_${fileDate}.pdf`);
}

function saveOrderToDatabase(clientName, items, total, now) {
  db.collection("orders").add({
    client: clientName,
    dateStr: formatDate(now),
    timeStr: formatTime(now),
    items: items.map(({ product, qty, price, unitType }) => ({ id: product.id, name: product.name, size: product.size || "", unitType: unitType || "", qty, price })),
    total: total,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    salesPin: SALES_PIN,
    officePin: OFFICE_PIN
  }).catch(err => {
    console.error("Failed to save order to database:", err);
    alert("שים לב: ההזמנה נשמרה כ-PDF, אך לא הצלחנו לשמור אותה במסד הנתונים למשרד.");
  });
}

function sendOrder() {
  const clientName = getClientName();
  const items = getOrderedProducts();

  if (!clientName) {
    alert("אנא בחר או הקלד שם לקוח.");
    return;
  }
  if (items.length === 0) {
    alert("אנא הוסף לפחות מוצר אחד להזמנה.");
    return;
  }

  rememberNewClient(clientName);

  const now = new Date();
  let total = 0;

  const lines = [];
  lines.push("הזמנה חדשה");
  lines.push("");
  lines.push("לקוח: " + clientName);
  lines.push("תאריך: " + formatDate(now));
  lines.push("שעה: " + formatTime(now));
  lines.push("");
  lines.push("פריטים:");
  lines.push("");

  items.forEach(({ product, qty, price, unitType }) => {
    const lineTotal = price * qty;
    total += lineTotal;
    lines.push(product.name + (product.size ? " - " + product.size : ""));
    lines.push("כמות: " + qty + " " + unitLabel(unitType, qty));
    lines.push("מחיר: ₪" + price);
    lines.push("סה\"כ: ₪" + lineTotal);
    lines.push("");
  });

  lines.push("----------------------");
  lines.push("");
  lines.push("סה\"כ להזמנה: ₪" + total);

  const body = lines.join("\n");
  const subject = "הזמנה חדשה - " + clientName + " - " + formatDate(now);

  downloadOrderPdf(clientName, items, total, now);
  saveOrderToDatabase(clientName, items, total, now);

  if (!SEND_EMAIL) {
    alert("ההזמנה נשמרה כ-PDF!");
    return;
  }

  sendOrderBtn.disabled = true;
  sendOrderBtn.textContent = "שולח...";

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    to_email: COMPANY_EMAIL,
    subject: subject,
    message: body
  }).then(() => {
    alert("ההזמנה נשלחה בהצלחה!");
    sendOrderBtn.disabled = false;
    sendOrderBtn.textContent = "אשר ושלח הזמנה";
  }).catch(err => {
    console.error(err);
    alert("שליחת ההזמנה נכשלה. בדוק את חיבור האינטרנט ונסה שוב.");
    sendOrderBtn.disabled = false;
    sendOrderBtn.textContent = "אשר ושלח הזמנה";
  });
}

// ============================================================
// CLEAR ORDER
// ============================================================

function clearOrder() {
  Object.keys(quantities).forEach(id => delete quantities[id]);
  Object.keys(prices).forEach(id => delete prices[id]);
  Object.keys(unitTypeOverrides).forEach(id => delete unitTypeOverrides[id]);
  citySelect.value = "";
  populateClientOptions();
  clientSelect.value = "";
  clientInput.value = "";
  searchBox.value = "";
  searchTerm = "";
  activeCategory = ALL_CATEGORY;
  document.querySelectorAll(".category-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.category === ALL_CATEGORY);
  });
  renderProducts();
  renderSummary();
}

// ============================================================
init();
