import React, {useEffect, useState} from 'react';
import firebase from 'firebase/compat/app';
import {
    getAuth,
    signOut,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
    signInWithPhoneNumber, RecaptchaVerifier,
} from "firebase/auth";
import 'firebase/compat/auth';
import {firebaseConfig} from "../../utils/firebase";
import SignInWithPhone from "../../components/auth/SignInWithPhone";
import parsePhoneNumber from 'libphonenumber-js';
import VerifyPhoneOTP from "../../components/auth/VerifyPhoneOTP";
import {useTranslation} from "react-i18next";

firebase.initializeApp(firebaseConfig);

const auth = getAuth();
// const user = auth.currentUser;
const googleAuthProvider = new GoogleAuthProvider();
const githubAuthProvider = new GithubAuthProvider();
// To apply the default browser preference instead of explicitly setting it.
firebase.auth().useDeviceLanguage();

enum AUTH_TYPE {
    OTHER_AUTH = 0,
    PHONE_AUTH,
    VERIFY_OTP,
    VERIFY_SUCCESS,
    VERIFY_FAILED,
}

const SignInScreen = () => {

    const { t } = useTranslation();

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

    const handleSignInWithPhone = (value: string) => {
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
					<p>Vui lòng đăng nhập:</p>
                    {
                        authType === AUTH_TYPE.OTHER_AUTH && <div
							className="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-phone-sign-in-start">
							<ul className="firebaseui-idp-list">
								<li className="firebaseui-list-item">
									<button
										className="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-google firebaseui-id-idp-button"
										data-provider-id="google.com" style={{backgroundColor: '#ffffff'}}
										data-upgraded=",MaterialButton"
										onClick={handleSignInWithGoogle}
									>
                                        <span className="firebaseui-idp-icon-wrapper">
                                            <img className="firebaseui-idp-icon" alt="sign-in-with-google"
                                                 src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"/>
                                        </span>
										<span className="firebaseui-idp-text firebaseui-idp-text-long" style={{fontSize: 13}}>
                                            {t('sign_in_page.sign_in_with')} Google
                                        </span>
									</button>
								</li>
								<li className="firebaseui-list-item">
									<button
										className="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-phone firebaseui-id-idp-button"
										data-provider-id="phone" style={{backgroundColor: '#333333'}}
										data-upgraded=",MaterialButton"
										onClick={handleSignInWithGitHub}
									>
                                        <span className="firebaseui-idp-icon-wrapper">
                                            <img className="firebaseui-idp-icon" alt="sign-in-with-github"
                                                 src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/github.svg"/>
                                        </span>
										<span className="firebaseui-idp-text firebaseui-idp-text-long" style={{fontSize: 13}}>
                                            {t('sign_in_page.sign_in_with')} GitHub
                                        </span>
									</button>
								</li>
								<li className="firebaseui-list-item">
									<button
										className="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-phone firebaseui-id-idp-button"
										data-provider-id="phone" style={{backgroundColor: '#02bd7e'}}
										data-upgraded=",MaterialButton"
										onClick={() => setAuthType(AUTH_TYPE.PHONE_AUTH)}
									>
                                        <span className="firebaseui-idp-icon-wrapper">
                                            <img className="firebaseui-idp-icon" alt="sign-in-with-phone"
                                                 src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/phone.svg"/>
                                        </span>
										<span className="firebaseui-idp-text firebaseui-idp-text-long" style={{fontSize: 13}}>
                                            {t('sign_in_page.sign_in_with_phone')}
                                        </span>
									</button>
								</li>
							</ul>
						</div>
                    }

                    {
                        authType === AUTH_TYPE.PHONE_AUTH &&
						<SignInWithPhone onSubmit={handleSignInWithPhone} onCancel={resetForm}/>
                    }

                    {
                        authType === AUTH_TYPE.VERIFY_OTP &&
	                    <VerifyPhoneOTP onSubmit={verifyOtpAndAuthenticate} onCancel={resetForm} phoneNumber={phoneNumber}/>
                    }
				</>
            }

            {
                isSignedIn && <SignedInUI/>
            }
        </>
    );
}

export default SignInScreen;
