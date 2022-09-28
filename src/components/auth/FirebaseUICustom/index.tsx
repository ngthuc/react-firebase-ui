import React, {useEffect, useState} from 'react';
import {AUTH_TYPE} from "../../../utils/types";
import {
    getAuth,
    GithubAuthProvider,
    GoogleAuthProvider,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    signInWithPopup, signOut
} from "firebase/auth";
import parsePhoneNumber from "libphonenumber-js";
import firebase from "firebase/compat/app";
import SignInWithProvider from "../SignInWithProvider";
import {firebaseConfig, getProviderName} from "../../../utils/firebase";
import SignInWithPhone from "../SignInWithPhone";
import VerifyPhoneOTP from "../VerifyPhoneOTP";
import SignInWithEmail from "../SignInWithEmail";

firebase.initializeApp(firebaseConfig);

const auth = getAuth();
// const user = auth.currentUser;
const googleAuthProvider = new GoogleAuthProvider();
const githubAuthProvider = new GithubAuthProvider();

const FirebaseUICustom = (props: {config: any}) => {

    const {config} = props;
    const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
    const [user, setUser] = useState<any>({});
    const [authType, setAuthType] = useState<AUTH_TYPE>(AUTH_TYPE.OTHER_AUTH);
    const [result, setResult] = useState<any>(null);
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

    const handleSignInWithEmail = () => {
        setAuthType(AUTH_TYPE.EMAIL_AUTH);
    }

    const handleSignInWithPhone = () => {
        setAuthType(AUTH_TYPE.PHONE_AUTH)
    }

    const handleSignInWithProviderName = (providerName: string) => {
        switch (providerName) {
            case 'Google':
                return handleSignInWithGoogle();
            case 'Github':
                return handleSignInWithGitHub();
            case 'Email':
                return handleSignInWithEmail();
            case 'Phone':
                return handleSignInWithPhone();
            default:
                return;
        }
    }

    const handleSendOtpForSignInWithPhone = (value: string) => {
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

    const verifyOtpAndAuthenticate = (otp: number) => {
        if (!result || !otp) return;
        result.confirm(otp)
            .then((result: { user: any; }) => {
                // User signed in successfully.
                const user = result.user;
                setUser(user)
                console.log('SignIn with phone:', {user})
            }).catch((error: any) => {
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

    const SignedInUI = () => (
        <>
            <p>Xin chào {user.displayName}! Bạn hiện đã đăng nhập!</p>
            <button onClick={() => signOut(auth)}>Đăng xuất</button>
        </>
    )

    // Listen to the Firebase Auth state and set the local state.
    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged((user: any) => {
            setIsSignedIn(!!user);
            if (!user) setAuthType(AUTH_TYPE.OTHER_AUTH);
        });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, []);

    return (
        <>
            {
                !isSignedIn && <>
					<div style={{margin: '50px auto'}}
					     className="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-phone-sign-in-start"
					>
                        {
                            authType === AUTH_TYPE.OTHER_AUTH && <ul className="firebaseui-idp-list">
                                {
                                    config.signInOptions.map((provider: any) => (
                                        <li key={provider.providerId} className="firebaseui-list-item">
                                            <SignInWithProvider
                                                provider={provider}
                                                key={provider.providerId}
                                                btnLabel={`Đăng nhập với ${getProviderName(provider)}`}
                                                onSignIn={handleSignInWithProviderName}
                                            />
                                        </li>
                                    ))
                                }
							</ul>
                        }

                        {
                            authType === AUTH_TYPE.PHONE_AUTH &&
							<SignInWithPhone onSubmit={handleSendOtpForSignInWithPhone} onCancel={resetForm}/>
                        }

                        {
                            authType === AUTH_TYPE.VERIFY_OTP &&
							<VerifyPhoneOTP onSubmit={verifyOtpAndAuthenticate} onCancel={resetForm} phoneNumber={phoneNumber}/>
                        }

                        {
                            authType === AUTH_TYPE.EMAIL_AUTH &&
							<SignInWithEmail
								mode={AUTH_TYPE.VERIFY_EMAIL}
								onSubmit={handleSignInWithEmail}
								onCancel={resetForm}
							/>
                        }

                        {
                            authType === AUTH_TYPE.VERIFY_EMAIL &&
							<VerifyPhoneOTP onSubmit={verifyOtpAndAuthenticate} onCancel={resetForm} phoneNumber={phoneNumber}/>
                        }

                        {
                            authType === AUTH_TYPE.VERIFY_PASSWORD &&
							<VerifyPhoneOTP onSubmit={verifyOtpAndAuthenticate} onCancel={resetForm} phoneNumber={phoneNumber}/>
                        }
					</div>
				</>
            }

            {
                isSignedIn && <SignedInUI/>
            }
        </>
    );
}

export default FirebaseUICustom;