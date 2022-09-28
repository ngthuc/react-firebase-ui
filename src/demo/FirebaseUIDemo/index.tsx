import React from 'react';
import FirebaseUI from "../../lib/components/auth/FirebaseUI";
import {EmailAuthProvider, GithubAuthProvider, GoogleAuthProvider} from "firebase/auth";

// FirebaseUI config.
const uiConfig = {
    callbacks: {},
    signInFlow: 'popup',
    signInSuccessUrl: '#',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        GoogleAuthProvider.PROVIDER_ID,
        GithubAuthProvider.PROVIDER_ID,
        EmailAuthProvider.PROVIDER_ID
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: () => {return false;},
    // Privacy policy url/callback.
    privacyPolicyUrl: () => {return false;}
};

const FirebaseUIDemo = () => {
    return (
        <FirebaseUI uiConfig={uiConfig} />
    );
}

export default FirebaseUIDemo;