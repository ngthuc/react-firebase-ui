# React Firebase Web Auth

## Install
```
npm i @ngthuc/react-fui
```

## Demo usage
```js
import React, {useEffect, useState} from 'react';
import {getAuth, signOut} from "firebase/auth";
import firebase from "firebase/compat/app";
import StyledFirebaseAuth from "@ngthuc/react-fui/StyledFirebaseAuth";
import parsePhoneNumber from "libphonenumber-js";

firebase.initializeApp({apiKey: "...", authDomain: "...", projectId: "...", ...});
const auth = getAuth();
const googleAuthProvider = new GoogleAuthProvider();
const githubAuthProvider = new GithubAuthProvider();
const phoneAuthProvider = new PhoneAuthProvider(auth);
const emailAuthProvider = new EmailAuthProvider();

const FirebaseDemo = (props) => {

	const [user, setUser] = useState({});
	const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

	// Listen to the Firebase Auth state and set the local state.
	useEffect(() => {
		const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
			setIsSignedIn(!!user);
		});
		return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
	}, []);

	if (isSignedIn) {
		return (
			<div>
				<p>Xin chào {user?.displayName || user?.email || user?.phoneNumber || 'Unknown'}! Bạn hiện đã đăng nhập!</p>
				<button onClick={() => signOut(auth)}>Đăng xuất</button>
			</div>
		);
	}

	return (
		<StyledFirebaseAuth
			uiConfig={{
				defaultCountry: 'VN',
				signInOptions: [
					googleAuthProvider,
					githubAuthProvider,
					phoneAuthProvider,
					emailAuthProvider
				],
				callbacks: {
					signInSuccessWithAuthResult: (authResult) => {
						console.log('signInSuccessWithAuthResult', authResult);
						setUser(authResult.user);
					},
					signInFailure: (error) => {
						// Handle Errors here.
						const errorCode = error.code;
						const errorMessage = error.message;
						// The email of the user's account used.
						const {phone, email} = error.customData;
						console.log('SignIn fail:', {errorCode, errorMessage, phone, email});
					},
				},
				locale: {
					parsePhoneNumber
				}
			}}
			firebaseAuth={auth}
		/>
	)
}

export default FirebaseDemo;
```

## License & Credit
Publish under MIT license by [ngthuc](https://ngthuc.com)
