// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {IMAGES} from "../images/images";

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

const providerDefinition = {
	'google.com': {
		btnClass: 'firebaseui-idp-google',
		btnColor: '#ffffff',
		iconSvg: IMAGES.googleIcon,
	},
	'github.com': {
		btnClass: 'firebaseui-idp-github',
		btnColor: '#333333',
		iconSvg: IMAGES.githubIcon,
	},
	'phone': {
		btnClass: 'firebaseui-idp-phone',
		btnColor: '#02bd7e',
		iconSvg: IMAGES.phoneIcon,
	},
	'password': {
		btnClass: 'firebaseui-idp-password',
		btnColor: '#db4437',
		iconSvg: IMAGES.mailIcon,
	},
	'facebook.com': {
		btnClass: 'firebaseui-idp-facebook',
		btnColor: '#3b5998',
		iconSvg: IMAGES.facebookIcon,
	},
	'twitter.com': {
		btnClass: 'firebaseui-idp-twitter',
		btnColor: '#55acee',
		iconSvg: IMAGES.twitterIcon,
	},
	'microsoft.com': {
		btnClass: 'firebaseui-idp-generic',
		btnColor: '#2f2f2f',
		iconSvg: IMAGES.microsoftIcon,
	},
	'apple.com': {
		btnClass: 'firebaseui-idp-generic',
		btnColor: '#000000',
		iconSvg: IMAGES.appleIcon,
	},
	'anonymous': {
		btnClass: 'firebaseui-idp-anonymous',
		btnColor: '#f4b400',
		iconSvg: IMAGES.anonymousIcon,
	}
}

const getProviderName = (provider) => {
	return provider.constructor.toString().split(' ')[1].replace('AuthProvider', '');
}

export {
	firebaseConfig, app, analytics, providerDefinition, getProviderName
}