// Shared access gate for the ordering page and the office page.
// This is a UI-level deterrent, not real security — the actual enforcement
// happens in Firestore's security rules, which check the same pin value on
// every read/write. See CLAUDE.md for the full explanation.
function requirePin(pin, storageKey) {
  if (localStorage.getItem(storageKey) === "ok") return true;

  for (let attempt = 0; attempt < 5; attempt++) {
    const entered = prompt("הזן קוד גישה למערכת:");
    if (entered === null) break;
    if (entered === pin) {
      localStorage.setItem(storageKey, "ok");
      return true;
    }
    alert("קוד שגוי, נסה שוב.");
  }

  document.body.innerHTML =
    '<div style="text-align:center;margin-top:80px;font-size:24px;font-family:sans-serif;">אין הרשאת גישה</div>';
  return false;
}
