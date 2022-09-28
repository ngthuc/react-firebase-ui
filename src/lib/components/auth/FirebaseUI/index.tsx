import React, {useEffect, useState} from 'react';
import {getAuth, signOut} from "firebase/auth";
import * as firebaseui from 'firebaseui';
import firebase from "firebase/compat/app";
import {firebaseConfig} from "../../../../utils/firebase";

const typeOf = (value: any) => Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
const isObj = (value: any) => typeOf(value) === 'object';

firebase.initializeApp(firebaseConfig);
const auth = getAuth();
// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(auth);

const FirebaseUI = (props: { uiConfig: any}) => {

    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', props.uiConfig);

    const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

    const handleSignOut = () => {
        signOut(auth).then(() => {
            setIsSignedIn(false);
            ui.start('#firebaseui-auth-container', props.uiConfig);
        }).catch((error) => {
            // An error happened.
        });
    }

    // Listen to the Firebase Auth state and set the local state.
    useEffect(() => {
        const unregisterAuthObserver = auth.onAuthStateChanged((user: any) => {
            console.log('onAuthStateChanged', {user, currentUser: auth.currentUser, isLogin: isObj(user)});
            setIsSignedIn(isObj(user));
        });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const SignedInUI = () => (
        <>
            <p>Xin chào {auth.currentUser?.displayName}! Bạn hiện đã đăng nhập!</p>
            <button onClick={handleSignOut}>Đăng xuất</button>
        </>
    )

    return (
        <>
            <div id="firebaseui-auth-container" style={{display: isSignedIn ? 'none' : 'block'}}></div>
            {
                isSignedIn && <SignedInUI/>
            }
        </>
    );
}

export default FirebaseUI;