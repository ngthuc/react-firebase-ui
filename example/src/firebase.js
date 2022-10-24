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
	apiKey: "AIzaSyC8t5LRzMTb-rcHQ2dOin-EMdvExCpCTGY",
	authDomain: "ngthucdotcom.firebaseapp.com",
	projectId: "ngthucdotcom",
	storageBucket: "ngthucdotcom.appspot.com",
	messagingSenderId: "1027869105592",
	appId: "1:1027869105592:web:24d7faf58f2c8abbc4c34d",
	measurementId: "G-DT98KPH3DN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {
	firebaseConfig, app, analytics
}