// Shared Firebase setup, loaded by both index.html (ordering page) and office.html.
//
// From the Firebase console: your project > Project settings > General > "Your apps" > Web app.
// This config is safe to keep public — it's not a secret, Firestore's security rules do the
// real access control (see the rules block in CLAUDE.md).
const FIREBASE_CONFIG = {
  apiKey: "PASTE_YOUR_FIREBASE_API_KEY_HERE",
  authDomain: "PASTE_YOUR_PROJECT.firebaseapp.com",
  projectId: "PASTE_YOUR_PROJECT_ID",
  storageBucket: "PASTE_YOUR_PROJECT.appspot.com",
  messagingSenderId: "PASTE_YOUR_SENDER_ID",
  appId: "PASTE_YOUR_APP_ID"
};

// Access codes: SALES_PIN gates the ordering page, OFFICE_PIN gates office.html.
// Change both here, and update them to match in Firestore's security rules too.
const SALES_PIN = "4477";
const OFFICE_PIN = "8821";

firebase.initializeApp(FIREBASE_CONFIG);
const db = firebase.firestore();
