import React from 'react';
import firebase from "firebase/compat/app";
import {firebaseConfig} from "../firebase";
import {
    EmailAuthProvider,
    getAuth,
    GithubAuthProvider,
    GoogleAuthProvider,
    OAuthProvider,
    PhoneAuthProvider
} from "firebase/auth";
import FirebaseUI from "../../lib/components/FirebaseUI";
import 'firebaseui/dist/firebaseui.css';

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

const FirebaseDemo = () => {
    return (
        <FirebaseUI config={firebaseUIConfig}/>
    );
}

export default FirebaseDemo;