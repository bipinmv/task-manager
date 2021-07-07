import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAzpKcj6SQbfY6o7flnKtE3V3xnqOkEo-k",
    authDomain: "task-manager-bf2b8.firebaseapp.com",
    databaseURL: 'https://task-manager-bf2b8.firebaseio.com',
    projectId: "task-manager-bf2b8",
    storageBucket: "task-manager-bf2b8.appspot.com",
    messagingSenderId: "480984366504",
    appId: "1:480984366504:web:fbbc362b348194e958b19d"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export { db, auth, timestamp };