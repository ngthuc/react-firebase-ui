import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import './index.css'
import './firebaseui.css';
import {AUTH_TYPE, PROVIDER_TYPE} from "../../constants/types";
import {
    getAuth,
    GithubAuthProvider,
    GoogleAuthProvider, OAuthProvider,
    RecaptchaVerifier,
    signInWithEmailAndPassword,
    signInWithPhoneNumber,
    signInWithPopup, signOut
} from "firebase/auth";
import parsePhoneNumber from "libphonenumber-js";
import firebase from "firebase/compat/app";
import {firebaseConfig} from "../../../firebase";
import SignInWithPhone from "../auth/native/SignInWithPhone";
import VerifyPhoneOTP from "../auth/native/VerifyPhoneOTP";
import SignInWithEmail from "../auth/native/SignInWithEmail";
import {IMAGES} from "../../images/images";
import {Button, ButtonIconAndLabel, ButtonList} from "../common/Button";

firebase.initializeApp(firebaseConfig);

const auth = getAuth();
const googleAuthProvider = new GoogleAuthProvider();
const githubAuthProvider = new GithubAuthProvider();
const zaloAuthProvider = new OAuthProvider(PROVIDER_TYPE.ZALO);

const getProviderButtonTemplate = (provider) => {
    const {providerId} = provider;
    let template;
    switch (providerId) {
        case PROVIDER_TYPE.GOOGLE:
            template = {
                btnName: 'Google',
                btnClass: 'firebaseui-idp-google',
                btnColor: '#ffffff',
                btnIcon: IMAGES.googleIcon
            };
            break;
        case PROVIDER_TYPE.GITHUB:
            template = {
                btnName: 'GitHub',
                btnClass: 'firebaseui-idp-github',
                btnColor: '#333333',
                btnIcon: IMAGES.githubIcon
            };
            break;
        case PROVIDER_TYPE.PHONE:
            template = {
                btnName: 'Phone',
                btnClass: 'firebaseui-idp-phone',
                btnColor: '#02bd7e',
                btnIcon: IMAGES.phoneIcon
            };
            break;
        case PROVIDER_TYPE.EMAIL:
            template = {
                btnName: 'Email',
                btnClass: 'firebaseui-idp-password',
                btnColor: '#db4437',
                btnIcon: IMAGES.mailIcon
            };
            break;
        case PROVIDER_TYPE.FACEBOOK:
            template = {
                btnName: 'Facebook',
                btnClass: 'firebaseui-idp-facebook',
                btnColor: '#3b5998',
                btnIcon: IMAGES.facebookIcon
            };
            break;
        case PROVIDER_TYPE.TWITTER:
            template = {
                btnName: 'Twitter',
                btnClass: 'firebaseui-idp-twitter',
                btnColor: '#55acee',
                btnIcon: IMAGES.twitterIcon
            };
            break;
        case PROVIDER_TYPE.MICROSOFT:
            template = {
                btnName: 'Microsoft',
                btnClass: 'firebaseui-idp-generic',
                btnColor: '#2f2f2f',
                btnIcon: IMAGES.microsoftIcon
            };
            break;
        case PROVIDER_TYPE.APPLE:
            template = {
                btnName: 'Apple',
                btnClass: 'firebaseui-idp-generic',
                btnColor: '#000000',
                btnIcon: IMAGES.appleIcon
            };
            break;
        case PROVIDER_TYPE.ZALO:
            template = {
                btnName: 'Zalo',
                btnClass: 'firebaseui-idp-generic',
                btnColor: '#0190f3',
                btnIcon: IMAGES.zaloIcon
            };
            break;
        default:
            template = {
                btnName: 'Anonymous',
                btnClass: 'firebaseui-idp-anonymous',
                btnColor: '#f4b400',
                btnIcon: IMAGES.anonymousIcon
            };
            break;
    }
    return {
        getClass() {return template.btnClass},
        getColor() {return template.btnColor},
        getIcon() {return template.btnIcon},
        getLabel() {return `Đăng nhập với ${template.btnName}`},
        getId() {return providerId}
    };
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

    const SignedInUI = () => {
        const getDisplayName = () => {
            if (auth.currentUser) {
                return auth.currentUser.displayName || auth.currentUser.email || auth.currentUser.phoneNumber;
            }
            return user?.displayName || user?.email || user?.phoneNumber || 'Unknown';
        }
        return (
            <>
                <p>Xin chào {getDisplayName()}! Bạn hiện đã đăng nhập!</p>
                <button onClick={() => signOut(auth)}>Đăng xuất</button>
            </>
        )
    }

    // Listen to the Firebase Auth state and set the local state.
    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
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
                            authType === AUTH_TYPE.OTHER_AUTH && <ButtonList items={config.signInOptions}>
								<Button onPress={handleSignInWithProviderName} template={getProviderButtonTemplate}>
									<ButtonIconAndLabel/>
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
				</>
            }

            {
                isSignedIn && <SignedInUI/>
            }
        </>
    );
}

FirebaseUI.propsTypes = {
    config: PropTypes.any.isRequired,
}

export default FirebaseUI;