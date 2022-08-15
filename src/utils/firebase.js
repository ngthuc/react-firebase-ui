// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBtENJqLJk-agrGSQyA0bgelmmkSn6DywY",
	authDomain: "ctu-itclub.firebaseapp.com",
	databaseURL: "https://ctu-itclub.firebaseio.com",
	projectId: "ctu-itclub",
	storageBucket: "ctu-itclub.appspot.com",
	messagingSenderId: "631195338471",
	appId: "1:631195338471:web:98ba19c4ac857f405a4442",
	measurementId: "G-VENDVJPVB4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {
	firebaseConfig, app, analytics
}