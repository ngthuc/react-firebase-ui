import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import './index.css'
import './firebaseui.css';
import {
	getAuth,
	GithubAuthProvider,
	GoogleAuthProvider,
	RecaptchaVerifier,
	signInWithEmailAndPassword,
	signInWithPhoneNumber,
	signInWithPopup, signOut
} from "firebase/auth";
import parsePhoneNumber from "libphonenumber-js";
import firebase from "firebase/compat/app";
import {firebaseConfig} from "../../firebase";
import SignInWithPhone from "../auth/native/SignInWithPhone";
import VerifyPhoneOTP from "../auth/native/VerifyPhoneOTP";
import SignInWithEmail from "../auth/native/SignInWithEmail";
import {AUTH_TYPE, Button, ButtonIcon, ButtonLabel, ButtonList, IMAGES, PROVIDER_TYPE} from "@ngthuc/react-fui";

firebase.initializeApp(firebaseConfig);

const auth = getAuth();
const googleAuthProvider = new GoogleAuthProvider();
const githubAuthProvider = new GithubAuthProvider();
const zaloAuthProvider = {
	providerId: PROVIDER_TYPE.ZALO,
	scopes: ['id', 'name', 'picture']
};

const addStyleToOptions = (provider) => {
	const {providerId} = provider;
	let template;
	switch (providerId) {
		case PROVIDER_TYPE.GOOGLE:
			template = {
				name: 'Google',
				className: 'firebaseui-idp-google',
				backgroundColor: '#ffffff',
				iconUrl: IMAGES.googleIcon
			};
			break;
		case PROVIDER_TYPE.GITHUB:
			template = {
				name: 'GitHub',
				className: 'firebaseui-idp-github',
				backgroundColor: '#333333',
				iconUrl: IMAGES.githubIcon
			};
			break;
		case PROVIDER_TYPE.PHONE:
			template = {
				name: 'Phone',
				className: 'firebaseui-idp-phone',
				backgroundColor: '#02bd7e',
				iconUrl: IMAGES.phoneIcon
			};
			break;
		case PROVIDER_TYPE.EMAIL:
			template = {
				name: 'Email',
				className: 'firebaseui-idp-password',
				backgroundColor: '#db4437',
				iconUrl: IMAGES.mailIcon
			};
			break;
		case PROVIDER_TYPE.FACEBOOK:
			template = {
				name: 'Facebook',
				className: 'firebaseui-idp-facebook',
				backgroundColor: '#3b5998',
				iconUrl: IMAGES.facebookIcon
			};
			break;
		case PROVIDER_TYPE.TWITTER:
			template = {
				name: 'Twitter',
				className: 'firebaseui-idp-twitter',
				backgroundColor: '#55acee',
				iconUrl: IMAGES.twitterIcon
			};
			break;
		case PROVIDER_TYPE.MICROSOFT:
			template = {
				name: 'Microsoft',
				className: 'firebaseui-idp-generic',
				backgroundColor: '#2f2f2f',
				iconUrl: IMAGES.microsoftIcon
			};
			break;
		case PROVIDER_TYPE.APPLE:
			template = {
				name: 'Apple',
				className: 'firebaseui-idp-generic',
				backgroundColor: '#000000',
				iconUrl: IMAGES.appleIcon
			};
			break;
		case PROVIDER_TYPE.ZALO:
			template = {
				name: 'Zalo',
				className: 'firebaseui-idp-generic',
				backgroundColor: '#0190f3',
				iconUrl: IMAGES.zaloIcon
			};
			break;
		default:
			template = {
				name: 'Anonymous',
				className: 'firebaseui-idp-anonymous',
				backgroundColor: '#f4b400',
				iconUrl: IMAGES.anonymousIcon,
			};
			break;
	}
	return {...provider, ...template, id: providerId, label: `Đăng nhập với ${template.name}`};
}

const FirebaseUI = (props) => {

	const {config} = props;
	const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
	const [user, setUser] = useState({});
	const [authType, setAuthType] = useState(AUTH_TYPE.OTHER_AUTH);
	const [result, setResult] = useState(null);
	const [phoneNumber, setPhoneNumber] = useState('');

	const resetForm = () => {
		setAuthType(AUTH_TYPE.OTHER_AUTH);
		setPhoneNumber('');
	}

	const handleSignInWithGoogle = async () => {
		console.log('handleSignInWithGoogle', googleAuthProvider);
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

	const handleSignInWithGitHub = async () => {
		githubAuthProvider.setCustomParameters({
			'allow_signup': 'false'
		});
		console.log('handleSignInWithGitHub', githubAuthProvider);
		await signInWithPopup(auth, githubAuthProvider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GithubAuthProvider.credentialFromResult(result);
				const token = credential?.accessToken;
				// The signed-in user info.
				const user = result.user;
				setUser(user)
				console.log('SignIn with GitHub:', {token, user})
				// ...
			}).catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential = GithubAuthProvider.credentialFromError(error);
				console.log('SignIn fail:', {errorCode, errorMessage, email, credential});
				// ...
			});
	}

	const handleSignInWithEmail = async (data = null) => {
		if (data) {
			const {email, password} = data;
			await signInWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					// Signed in
					const user = userCredential.user;
					setUser(user)
					console.log('SignIn with GitHub:', {user})
					// ...
				}).catch((error) => {
					// Handle Errors here.
					const errorCode = error.code;
					const errorMessage = error.message;
					// The email of the user's account used.
					const email = error.customData.email;
					// The AuthCredential type that was used.
					console.log('SignIn fail:', {errorCode, errorMessage, email});
					// ...
				});
		}
		setAuthType(AUTH_TYPE.EMAIL_AUTH);
	}

	const handleSignInWithPhone = () => {
		setAuthType(AUTH_TYPE.PHONE_AUTH)
	}

	const handleSignInWithZalo = () => {
		console.log('handleSignInWithZalo', zaloAuthProvider);
	}

	const handleSignInWithProviderName = (provider) => {
		switch (provider.providerId) {
			case 'google.com':
				return handleSignInWithGoogle();
			case 'github.com':
				return handleSignInWithGitHub();
			case 'password':
				return handleSignInWithEmail();
			case 'phone':
				return handleSignInWithPhone();
			case 'zalo.me':
				return handleSignInWithZalo();
			default:
				return;
		}
	}

	const handleSendOtpForSignInWithPhone = (value) => {
		const phoneNumber = parsePhoneNumber(value, 'VN')?.number;
		if (!phoneNumber) return;
		setPhoneNumber(phoneNumber);
		console.log('handleSignInWithPhone:', phoneNumber);
		let appVerifier = new RecaptchaVerifier('recaptcha-container', {
			'size': 'invisible'
		}, auth);

		signInWithPhoneNumber(auth, phoneNumber, appVerifier)
			.then((confirmationResult) => {
				// SMS sent. Prompt user to type the code from the message, then sign the
				// user in with confirmationResult.confirm(code).
				console.log('result', {phoneNumber, verificationId: confirmationResult.verificationId});
				setResult(confirmationResult);
				setAuthType(AUTH_TYPE.VERIFY_OTP);
			}).catch((error) => {
			// Error; SMS not sent
			console.log('error', {phoneNumber, error});
		});
	}

	const verifyOtpAndAuthenticate = (otp) => {
		if (!result || !otp) return;
		result.confirm(otp)
			.then((result) => {
				// User signed in successfully.
				const user = result.user;
				setUser(user)
				console.log('SignIn with phone:', {user})
			}).catch((error) => {
			// User couldn't sign in (bad verification code?)
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const {phone, email} = error.customData.email;
			// The AuthCredential type that was used.
			console.log('SignIn fail:', {errorCode, errorMessage, phone, email});
		});
	}

	const getDisplayName = () => {
		if (auth.currentUser) {
			return auth.currentUser.displayName || auth.currentUser.email || auth.currentUser.phoneNumber;
		}
		return user?.displayName || user?.email || user?.phoneNumber || 'Unknown';
	}

	// Listen to the Firebase Auth state and set the local state.
	useEffect(() => {
		const unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
			setIsSignedIn(!!user);
			if (!user) setAuthType(AUTH_TYPE.OTHER_AUTH);
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
		<div style={{margin: '50px auto'}}
		     className="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-phone-sign-in-start"
		>
			{
				authType === AUTH_TYPE.OTHER_AUTH && <ButtonList items={config.signInOptions.map(addStyleToOptions)}>
					<Button onPress={handleSignInWithProviderName}>
						<ButtonIcon/>
						<ButtonLabel/>
					</Button>
				</ButtonList>
			}

			{
				authType === AUTH_TYPE.PHONE_AUTH &&
				<SignInWithPhone onSubmit={handleSendOtpForSignInWithPhone} onCancel={resetForm}/>
			}

			{
				authType === AUTH_TYPE.VERIFY_OTP &&
				<VerifyPhoneOTP onSubmit={verifyOtpAndAuthenticate} onCancel={resetForm}
				                phoneNumber={phoneNumber}/>
			}

			{
				authType === AUTH_TYPE.EMAIL_AUTH &&
				<SignInWithEmail
					mode={AUTH_TYPE.VERIFY_PASSWORD}
					onSubmit={handleSignInWithEmail}
					onCancel={resetForm}
				/>
			}

			{
				authType === AUTH_TYPE.VERIFY_EMAIL &&
				<VerifyPhoneOTP onSubmit={verifyOtpAndAuthenticate} onCancel={resetForm}
				                phoneNumber={phoneNumber}/>
			}

			{
				authType === AUTH_TYPE.VERIFY_PASSWORD &&
				<VerifyPhoneOTP onSubmit={verifyOtpAndAuthenticate} onCancel={resetForm}
				                phoneNumber={phoneNumber}/>
			}
		</div>
	);
}

FirebaseUI.propsTypes = {
	config: PropTypes.any.isRequired,
}

export default FirebaseUI;