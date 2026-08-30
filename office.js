function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

const UNIT_TYPE_PLURALS = { "יחידה": "יחידות", "ארגז": "ארגזים", "משטח": "משטחים" };

function unitLabel(unitType, qty) {
  if (!unitType) return "";
  if (qty === 1) return unitType;
  return UNIT_TYPE_PLURALS[unitType] || unitType;
}

function itemDisplayName(item) {
  let label = item.name;
  if (item.size) label += " - " + item.size;
  return label;
}

function loadOrders() {
  const listEl = document.getElementById("ordersList");
  listEl.innerHTML = '<p class="empty-msg">טוען הזמנות...</p>';

  db.collection("orders")
    .where("officePin", "==", OFFICE_PIN)
    .orderBy("createdAt", "desc")
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        listEl.innerHTML = '<p class="empty-msg">אין הזמנות עדיין.</p>';
        return;
      }
      listEl.innerHTML = "";
      snapshot.forEach(doc => {
        listEl.appendChild(buildOrderCard(doc.data()));
      });
    })
    .catch(err => {
      console.error(err);
      listEl.innerHTML = '<p class="empty-msg">שגיאה בטעינת ההזמנות. בדוק את חיבור האינטרנט.</p>';
    });
}

function buildOrderCard(order) {
  const card = document.createElement("div");
  card.className = "order-card";

  const header = document.createElement("div");
  header.className = "order-card-header";
  header.innerHTML = `
    <div class="order-card-client">${escapeHtml(order.client)}</div>
    <div class="order-card-date">${escapeHtml(order.dateStr)} ${escapeHtml(order.timeStr)}</div>
  `;

  const table = document.createElement("table");
  table.className = "order-card-table";
  const rows = (order.items || []).map(item => {
    const lineTotal = item.price * item.qty;
    return `<tr><td>${escapeHtml(itemDisplayName(item))}</td><td>${item.qty} ${escapeHtml(unitLabel(item.unitType, item.qty))}</td><td>₪${item.price}</td><td>₪${lineTotal}</td></tr>`;
  }).join("");
  table.innerHTML = `
    <thead><tr><th>מוצר</th><th>כמות</th><th>מחיר</th><th>סה"כ</th></tr></thead>
    <tbody>${rows}</tbody>
  `;

  const totalEl = document.createElement("div");
  totalEl.className = "order-card-total";
  totalEl.textContent = "סה\"כ: ₪" + order.total;

  const printBtn = document.createElement("button");
  printBtn.className = "btn-print-order";
  printBtn.textContent = "הדפס";
  printBtn.addEventListener("click", () => printOrder(order));

  card.appendChild(header);
  card.appendChild(table);
  card.appendChild(totalEl);
  card.appendChild(printBtn);

  return card;
}

function printOrder(order) {
  const rows = (order.items || []).map(item => {
    const lineTotal = item.price * item.qty;
    return `<tr><td>${escapeHtml(itemDisplayName(item))}</td><td>${item.qty} ${escapeHtml(unitLabel(item.unitType, item.qty))}</td><td>₪${item.price}</td><td>₪${lineTotal}</td></tr>`;
  }).join("");

  const html = `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8">
<title>הזמנה - ${escapeHtml(order.client)}</title>
<style>
  body { font-family: sans-serif; padding: 20px; }
  h1 { color: #1f6f43; }
  table { width: 100%; border-collapse: collapse; margin-top: 16px; }
  th, td { border: 1px solid #ccc; padding: 8px; text-align: right; }
  th { background: #1f6f43; color: #fff; }
  .total { font-size: 20px; font-weight: bold; margin-top: 16px; }
</style>
</head>
<body>
  <h1>משקאות מגאדלי</h1>
  <p><strong>לקוח:</strong> ${escapeHtml(order.client)}</p>
  <p><strong>תאריך:</strong> ${escapeHtml(order.dateStr)} &nbsp; <strong>שעה:</strong> ${escapeHtml(order.timeStr)}</p>
  <table>
    <thead><tr><th>מוצר</th><th>כמות</th><th>מחיר</th><th>סה"כ</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>
  <div class="total">סה"כ להזמנה: ₪${order.total}</div>
</body>
</html>`;

  const printWindow = window.open("", "_blank");
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}

function init() {
  if (!requirePin(OFFICE_PIN, "drinkOrderApp_officePinOk")) return;

  document.getElementById("refreshBtn").addEventListener("click", loadOrders);
  loadOrders();
}

init();
