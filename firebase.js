// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAUjgGDwfZ_xQgNHwp7qrlYHGcPfoa2AIQ",
    authDomain: "treasured-scribbles.firebaseapp.com",
    projectId: "treasured-scribbles",
    storageBucket: "treasured-scribbles.appspot.com",
    messagingSenderId: "533062052125",
    appId: "1:533062052125:web:8c1c28d5c417c7596f59f4",
    measurementId: "G-5S4XF2FDM4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
