
// < ========================================================
// < Imports
// < ========================================================

// < Import functions from individual Firebase SDKs via CDN
import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
    getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import {
    getFirestore, doc, setDoc, getDoc
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// < ========================================================
// < Declarations
// < ========================================================

// < The nickname of the app in Firebase Console
const appNickname = 'test'

// < ========================================================
// < HTML Queries
// < ========================================================

const page = document.getElementById('page');

// < ========================================================
// < Utility Functions
// < ========================================================

/**
 * Briefly flash an element by toggling its opacity
 * - Will be hard to notice on elements with low opacity to start
 * @param {HTMLElement} element - The element to flash
 * @param {number} [duration=300] - Total duration of the flash in ms
 */
function flash(element, duration = 400) {
    let original = element.style.opacity;
    element.style.transition = `opacity ${duration / 2}ms`;
    element.style.opacity = '0';
    setTimeout(() => {
        element.style.opacity = original;
    }, duration / 2);
}

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


/** 
 * Writes data to a specific document in Firestore under a given collection and document ID
 * @param {object} app - The initialized Firebase app instance
 * @param {string} collectionName - Name of the Firestore collection
 * @param {string} documentId - ID of the document to write to
 * @param {object} data - Key-value object to store in the document
 */
async function writeDataToFirestore(app, collectionName, documentId, data) {

    // Get Firestore database instance from app
    const dbInstance = getFirestore(app);

    // Create document reference
    const documentReference = doc(dbInstance, collectionName, documentId);

    // Write data using the document reference and log document ID
    await setDoc(documentReference, data);
    console.log("Document written with ID:", documentReference.id);

}

/**
 * Read a document from Firestore
 * @param {FirebaseApp} app - Firebase app instance
 * @param {string} collectionName - Collection to read from
 * @param {string} documentId - Document ID to retrieve
 * @returns {Promise<Object|null>} - Returns the document data or null if not found
 */
async function readDataFromFirestore(app, collectionName, documentId) {

    // Get Firestore database instance from app
    const dbInstance = getFirestore(app);

    // Create document reference
    const docRef = doc(dbInstance, collectionName, documentId);

    // Read data using the document reference and return
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;

}

/**
 * Catches errors from a function and alerts the user
 * @param {function} func - The function to call
 * @returns {Promise<void>} - Return a promise that resolves when the function is called
 */
async function catchAlert(func) {
    try {
        await func();
    } catch (error) {
        alert("Error: " + error.message);
    }
}

// < ========================================================
// < Entry Point
// < ========================================================

// < Entry point for the app, called when the page loads
async function main() {

    // < Initialise Firebase
    const app = initializeApp(firebaseConfig, appNickname);

    // < Initialise Firebase Authentication
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    // < Log the app name to the console
    console.log("Firebase App Name: ", app.name);

    // ! Experimental

    let a = document.createElement('button')
    a.onclick = () => {
        signInWithPopup(auth, provider).then(res => {
            console.log("Signed in:", res.user.displayName);
        }).catch(error => {
            console.error("Sign-in error:", error);
        });
    };
    a.innerText = "Sign In";
    page.appendChild(a);

    let b = document.createElement('button')
    b.onclick = () => {
        if (confirm("Are you sure you want to sign out?")) {
            signOut(auth).then(() => {
                console.log("User signed out");
            }).catch((error) => {
                console.error("Sign-out error", error);
            });
        }
    };
    b.innerText = "Sign Out";
    page.appendChild(b);

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'checkbox';
    checkbox.checked = false;
    checkbox.onchange = () => {
        if (checkbox.checked) {
            console.log("Checkbox checked");
        } else {
            console.log("Checkbox unchecked");
        }
    };
    page.appendChild(checkbox);

    let nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.placeholder = 'Name';
    nameInput.value = "Test Human";
    var label = document.createElement('label');
    label.innerText = "Name: ";
    label.setAttribute('for', nameInput.id);
    page.appendChild(label);
    page.appendChild(nameInput);

    let ageInput = document.createElement('input');
    ageInput.type = 'number';
    ageInput.placeholder = 'Age';
    ageInput.value = 30;
    var label = document.createElement('label');
    label.innerText = "Age: ";
    label.setAttribute('for', ageInput.id);
    page.appendChild(label);
    page.appendChild(ageInput);

    let collectionNameInput = document.createElement('input');
    collectionNameInput.type = 'text';
    collectionNameInput.placeholder = 'Collection Name';
    collectionNameInput.value = 'testCollection';
    var label = document.createElement('label');
    label.innerText = "Collection Name: ";
    label.setAttribute('for', collectionNameInput.id);
    page.appendChild(label);
    page.appendChild(collectionNameInput);

    let documentIdInput = document.createElement('input');
    documentIdInput.type = 'text';
    documentIdInput.placeholder = 'Document ID';
    documentIdInput.value = 'testDocument';
    var label = document.createElement('label');
    label.innerText = "Document ID: ";
    label.setAttribute('for', documentIdInput.id);
    page.appendChild(label);
    page.appendChild(documentIdInput);

    let writeButton = document.createElement('button');
    writeButton.innerText = "Write Data";
    writeButton.onclick = () => writeDataToFirestore(app, collectionNameInput.value, documentIdInput.value, {
        name: nameInput.value,
        age: parseInt(ageInput.value)
    }).then(() => {
        console.log("Data written to Firestore");
    });
    page.appendChild(writeButton);

    let readButton = document.createElement('button');
    readButton.innerText = "Read Data";
    readButton.onclick = () => catchAlert(async () => readDataFromFirestore(app, collectionNameInput.value, documentIdInput.value)
        .then(data => {
            if (data) {
                ageInput.value = data.age;
                flash(ageInput);
                nameInput.value = data.name;
                flash(nameInput);
                console.log("Data read from Firestore:", data);

            } else {
                console.log("No document found");
            }
        })
    );
    page.appendChild(readButton);

}

// < ========================================================
// < Execution
// < ========================================================

main();