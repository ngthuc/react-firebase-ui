import React, {useEffect, useState} from 'react';
import firebase from 'firebase/compat/app';
import { getAuth, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import 'firebase/compat/auth';
import {firebaseConfig} from "../utils/firebase";

firebase.initializeApp(firebaseConfig);

const auth = getAuth();
// const user = auth.currentUser;
const googleAuthProvider = new GoogleAuthProvider();

const SignInScreen = () => {
    const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
    const [user, setUser] = useState<any>({});

    const handleSignInWithGoogle = async () => {
        await signInWithPopup(auth, googleAuthProvider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                // The signed-in user info.
                const user = result.user;
                setUser(user)
                console.log('SignIn with Google:', {token, user})
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log('SignIn fail:', {errorCode, errorMessage, email, credential});
                // ...
            });
    }

    // Listen to the Firebase Auth state and set the local state.
    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged((user: any) => {
            setIsSignedIn(!!user);
        });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, []);

    return (
        <div>
            <h1>My App</h1>
            {
                !isSignedIn ? <>
                    <p>Vui lòng đăng nhập:</p>
                    <button onClick={handleSignInWithGoogle}>Đăng nhập bằng Google</button>
                </> : <>
                    <p>Xin chào {user.displayName}! Bạn hiện đã đăng nhập!</p>
                    <button onClick={() => signOut(auth)}>Đăng xuất</button>
                </>
            }
        </div>
    );
}

export default SignInScreen;