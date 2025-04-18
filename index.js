
// < ========================================================
// < Imports
// < ========================================================

// < Import functions from individual Firebase SDKs via CDN
import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";

import {
    getFirestore, doc, setDoc
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// < ========================================================
// < Declarations and HTML Queries
// < ========================================================

// < The nickname of the app in Firebase Console
const appNickname = 'test'

// < ========================================================
// < Firebase Configuration
// < ========================================================

// < Firebase configuration for this app
const firebaseConfig = {
    apiKey: "AIzaSyAx5VIksX5JeW2hk5FDf_8rhyBa6CibH84",
    authDomain: "mainframe-storage.firebaseapp.com",
    projectId: "mainframe-storage",
    storageBucket: "mainframe-storage.firebasestorage.app",
    messagingSenderId: "432631138940",
    appId: "1:432631138940:web:ae5059b05db6b3e09317f9",
    measurementId: "G-LXYPVDN1K4"
};

// ! ========================================================
// ! Experimental
// ! ========================================================

async function test() {
    const db = getFirestore(app);
    const docRef = doc(db, "test", "testDoc");
    await setDoc(docRef, { test: "test" });
    console.log("Document written with ID: ", docRef.id);
}

// < ========================================================
// < Entry Point
// < ========================================================

// < Entry point for the app, called when the page loads
async function main() {

    // < Initialise Firebase
    const app = initializeApp(firebaseConfig, appNickname);

    // < Log the app name to the console
    console.log("Firebase App Name: ", app.name);

    // ! Experimental

    // // < Run the test function
    // test().catch((error) => {
    //     console.error("Error adding document: ", error);
    // });

}

// < ========================================================
// < Execution
// < ========================================================

main();