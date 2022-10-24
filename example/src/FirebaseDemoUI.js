import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {getAuth, signOut} from "firebase/auth";
import firebase from "firebase/compat/app";
import {firebaseConfig} from "./firebase";
// import StyledFirebaseAuth from "./components/StyledFirebaseAuth";
import StyledFirebaseAuth from "react-firebase-web-auth/StyledFirebaseAuth";
import parsePhoneNumber from "libphonenumber-js";

firebase.initializeApp(firebaseConfig);
const auth = getAuth();

const FirebaseUI = (props) => {

	const {config} = props;
	const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
	const [user, setUser] = useState({});

	const getDisplayName = () => {
		if (auth.currentUser) {
			return auth.currentUser.displayName || auth.currentUser.email || auth.currentUser.phoneNumber;
		}
		return user?.displayName || user?.email || user?.phoneNumber || 'Unknown';
	}

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
				<p>
					Xin chào {getDisplayName()}! Bạn hiện đã đăng nhập!
				</p>
				<button onClick={() => signOut(auth)}>Đăng xuất</button>
			</div>
		);
	}

	return (
		<StyledFirebaseAuth
			uiConfig={{
				...config,
				callbacks: {
					...config.callbacks,
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
					...config.locale,
					parsePhoneNumber
				}
			}}
			firebaseAuth={auth}
		/>
	)
}

FirebaseUI.propsTypes = {
	config: PropTypes.any.isRequired,
}

export default FirebaseUI;