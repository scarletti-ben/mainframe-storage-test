# mainframe-storage-test
This is a test application utilising a `Cloud Firestore` database from `Firebase`, you can access the site [here](https://scarletti-ben.github.io/mainframe-storage-test/)

In the `Firebase Console` you can add apps, in this case a web app has been added called 'test'. In practice what happens when you add an app to a `Firebase` project is that you generate a new `appId` that can be used alongside the public API key to interact with the components of your `Firebase` project

You can use `Firebase` for hosting an app / site as well but this shows that it's not entirely necessary, you can host the site anywhere and you can still interface with a `Firestore` database, with authentication handled server-side by `Google`

Creating the 'test' application gives you the code snippet below, for use in the 'test' application. It is important to note that the `apiKey` is is not meant to be a secret , it is entirely public as it identifies your `Firebase` project

```javascript
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAx5VIksX5JeW2hk5FDf_8rhyBa6CibH84",
  authDomain: "mainframe-storage.firebaseapp.com",
  projectId: "mainframe-storage",
  storageBucket: "mainframe-storage.firebasestorage.app",
  messagingSenderId: "432631138940",
  appId: "1:432631138940:web:ae5059b05db6b3e09317f9",
  measurementId: "G-LXYPVDN1K4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
```

When prototyping it is much easier to just use the `CDN` version, a simple example snippet can be found below 

```javascript
// The nickname of the app in Firebase Console
const appNickname = 'test'

// Import functions from individual Firebase SDKs via CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";

// Firebase configuration for this app
const firebaseConfigTest = {
	apiKey: "AIzaSyAx5VIksX5JeW2hk5FDf_8rhyBa6CibH84",
	authDomain: "mainframe-storage.firebaseapp.com",
	projectId: "mainframe-storage",
	storageBucket: "mainframe-storage.firebasestorage.app",
	messagingSenderId: "432631138940",
	appId: "1:432631138940:web:ae5059b05db6b3e09317f9",
};

// Initialise Firebase
const app = initializeApp(firebaseConfigAlternate, appNickname);

// Log the app name to the console
console.log("Firebase App Name: ", app.name);
```

The database can be viewed at `https://console.firebase.google.com/u/3/project/mainframe-storage/firestore/databases/-default-/data/~2Ftest~2FtestDoc`

# Testing Locally
By default `Firebase` only allows connections from whitelisted sites, this means that you may need to add a local URL to the whitelisted sites if it doesn't start with `localhost`, adding `http://127.0.0.1` to the whitelist will likely help

# Environment Information
- Tested using `Google Chrome Version 135.0.7049.96 (Official Build) (64-bit)`
- Not tested on mobile devices or other desktop browsers