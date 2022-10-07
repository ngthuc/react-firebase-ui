import React from 'react';
import './App.css';
import FirebaseUI from "./components/FirebaseUI";
import firebase from "firebase/compat/app";
import {
    EmailAuthProvider,
    getAuth,
    GithubAuthProvider,
    GoogleAuthProvider,
    OAuthProvider,
    PhoneAuthProvider
} from "firebase/auth";
import { firebaseConfig } from './firebase';

firebase.initializeApp(firebaseConfig);
const auth = getAuth();
const googleAuthProvider = new GoogleAuthProvider();
const githubAuthProvider = new GithubAuthProvider();
const phoneAuthProvider = new PhoneAuthProvider(auth);
const emailAuthProvider = new EmailAuthProvider();
const zaloAuthProvider = new OAuthProvider('zalo.me');

const firebaseUIConfig = {
    signInOptions: [
        googleAuthProvider,
        githubAuthProvider,
        phoneAuthProvider,
        emailAuthProvider,
        zaloAuthProvider
    ]
}

const App = () => (
    <FirebaseUI config={firebaseUIConfig}/>
);

export default App;
