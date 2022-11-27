import React, {useEffect, useState} from 'react';
import {
	EmailAuthProvider,
	FacebookAuthProvider,
	getAuth,
	GithubAuthProvider,
	GoogleAuthProvider,
	PhoneAuthProvider,
	signOut
} from "firebase/auth";
import firebase from "firebase/compat/app";
import {firebaseConfig} from "./firebase";
import StyledFirebaseAuth from "./components/StyledFirebaseAuth";
import useCommon from "./components/useCommon";
// import StyledFirebaseAuth from "react-firebase-web-auth/StyledFirebaseAuth";
// import useCommon from "react-firebase-web-auth/useCommon";
import {ZaloAuthProvider} from "react-zalo-auth-kit";
import parsePhoneNumber from "libphonenumber-js";
import ReactGA from "react-ga";

firebase.initializeApp(firebaseConfig);
const auth = getAuth();
const googleAuthProvider = new GoogleAuthProvider();
const githubAuthProvider = new GithubAuthProvider();
const facebookAuthProvider = new FacebookAuthProvider();
const phoneAuthProvider = new PhoneAuthProvider(auth);
const emailAuthProvider = new EmailAuthProvider();
const zaloAuthProvider = new ZaloAuthProvider();

const FirebaseDemo = () => {
	const common = useCommon();
	const countryCode = 'VN';
	const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
	const [userInfo, setUserInfo] = useState(null);

	console.log('providers', {provider: phoneAuthProvider, prototype: Object.getPrototypeOf(phoneAuthProvider).constructor.name});

	const getDisplayName = () => {
		if (auth.currentUser) {
			return auth.currentUser.displayName || auth.currentUser.email || auth.currentUser.phoneNumber;
		}
		return userInfo?.displayName || userInfo?.email || userInfo?.phoneNumber || 'Unknown';
	}

	const handleSignOut = () => {
		const {providerData} = userInfo || auth.currentUser;
		if (providerData) {
			common.signOut(auth, signOut, providerData[0].providerId === 'zalo.me')
				.then(() => {
					setIsSignedIn(false);
					setUserInfo(null);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}

	// Listen to the Firebase Auth state and set the local state.
	useEffect(() => {
		const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
			setIsSignedIn(!!user);
			ReactGA.event({
				category: 'FirebaseDemo',
				action: `Is signed in: ${!!user}`,
			});
		});
		return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
	}, []);

	if (isSignedIn) {
		return (
			<div>
				<p>
					Xin chào {getDisplayName()}! Bạn hiện đã đăng nhập!
				</p>
				<button onClick={handleSignOut}>Đăng xuất</button>
			</div>
		);
	}

	return (
		<>
			<StyledFirebaseAuth
				uiConfig={{
					defaultCountry: countryCode,
					signInOptions: [
						googleAuthProvider,
						githubAuthProvider,
						facebookAuthProvider,
						phoneAuthProvider,
						emailAuthProvider,
					],
					callbacks: {
						signInSuccessWithAuthResult: (authResult) => {
							console.log('signInSuccessWithAuthResult', authResult);
							setUserInfo(authResult.user);
							if (authResult.providerId === 'zalo.me') {
								setIsSignedIn(true);
							}
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
				zaloAuthConfig={{
					appId: '3850903547114980520',
					redirectUri: window.location.origin,
					scopes: ['id', 'name', 'picture.type(large)']
				}}
			/>
		</>
	)
}

export default FirebaseDemo;