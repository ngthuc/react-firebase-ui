import React from 'react';
import firebase from "firebase/compat/app";
import {firebaseConfig} from "../../utils/firebase";
import {EmailAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, PhoneAuthProvider} from "firebase/auth";
import FirebaseUICustom from "../../components/auth/FirebaseUICustom";
import 'firebaseui/dist/firebaseui.css';

firebase.initializeApp(firebaseConfig);
const auth = getAuth();
const googleAuthProvider = new GoogleAuthProvider();
const githubAuthProvider = new GithubAuthProvider();
const phoneAuthProvider = new PhoneAuthProvider(auth);
const emailAuthProvider = new EmailAuthProvider();

const firebaseUIConfig = {
    signInOptions: [
        googleAuthProvider,
        githubAuthProvider,
        phoneAuthProvider,
        emailAuthProvider,
    ]
}

const CustomFirebaseUI = () => {
    return (
        <FirebaseUICustom config={firebaseUIConfig}/>
    );
}

export default CustomFirebaseUI;