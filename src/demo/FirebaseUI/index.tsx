import React, {useEffect, useState} from 'react';
import firebase from "firebase/compat/app";
import {firebaseConfig} from "../../utils/firebase";
import {isObj} from "../../utils/types";
import {
    EmailAuthProvider,
    getAuth,
    GithubAuthProvider,
    GoogleAuthProvider,
    PhoneAuthProvider,
    signOut
} from "firebase/auth";
import * as firebaseui from 'firebaseui';

firebase.initializeApp(firebaseConfig);
const auth = getAuth();

// FirebaseUI config.
const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        GoogleAuthProvider.PROVIDER_ID,
        GithubAuthProvider.PROVIDER_ID,
        EmailAuthProvider.PROVIDER_ID,
        PhoneAuthProvider.PROVIDER_ID
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: () => {
        return false;
    },
    // Privacy policy url/callback.
    privacyPolicyUrl: () => {
        return false;
    }
};

// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(auth);
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

const FirebaseUI = () => {
    const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

    // Listen to the Firebase Auth state and set the local state.
    useEffect(() => {
        const unregisterAuthObserver = auth.onAuthStateChanged((user: any) => {
            console.log('onAuthStateChanged', {user, currentUser: auth.currentUser, isLogin: isObj(user)});
            setIsSignedIn(isObj(user));
        });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, []);

    const SignedInUI = () => (
        <>
            <p>Xin chào {auth.currentUser?.displayName}! Bạn hiện đã đăng nhập!</p>
            <button onClick={() => signOut(auth)}>Đăng xuất</button>
        </>
    )

    return (
        <>
            <div id="firebaseui-auth-container" style={{display: !isSignedIn ? 'block' : 'none'}}></div>
            {
                isSignedIn && <SignedInUI/>
            }
        </>
    );
}

export default FirebaseUI;