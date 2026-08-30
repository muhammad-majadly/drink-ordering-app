// Shared Firebase setup, loaded by both index.html (ordering page) and office.html.
//
// From the Firebase console: your project > Project settings > General > "Your apps" > Web app.
// This config is safe to keep public — it's not a secret, Firestore's security rules do the
// real access control (see the rules block in CLAUDE.md).
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyC77CIjeW0i3cKacNQWl3Qb5Ajj021f-aA",
  authDomain: "majadly-drinks.firebaseapp.com",
  projectId: "majadly-drinks",
  storageBucket: "majadly-drinks.firebasestorage.app",
  messagingSenderId: "337330115148",
  appId: "1:337330115148:web:7dee12ac2db40670cfdae9"
};

// Access codes: SALES_PIN gates the ordering page, OFFICE_PIN gates office.html.
// Change both here, and update them to match in Firestore's security rules too.
const SALES_PIN = "4477";
const OFFICE_PIN = "8821";

firebase.initializeApp(FIREBASE_CONFIG);
const db = firebase.firestore();
