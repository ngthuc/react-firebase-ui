import React, {useEffect, useState} from 'react';
import './index.css'
import {AUTH_TYPE} from "../../constants/types";
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
import {firebaseConfig} from "../../../demo/firebase";
import SignInWithPhone from "../auth/native/SignInWithPhone";
import VerifyPhoneOTP from "../auth/native/VerifyPhoneOTP";
import SignInWithEmail from "../auth/native/SignInWithEmail";
import {IMAGES} from "../../images/images";
import {Button, ButtonIconAndLabel, ButtonList} from "../common/Button";

firebase.initializeApp(firebaseConfig);

const auth = getAuth();
const googleAuthProvider = new GoogleAuthProvider();
const githubAuthProvider = new GithubAuthProvider();
const zaloAuthProvider = new OAuthProvider('zalo.me');

enum PROVIDER_TYPE {
    GOOGLE = 'google.com',
    GITHUB = 'github.com',
    PHONE = 'phone',
    EMAIL = 'password',
    FACEBOOK = 'facebook.com',
    TWITTER = 'twitter.com',
    MICROSOFT = 'microsoft.com',
    APPLE = 'apple.com',
    ZALO = 'zalo.me',
    ANONYMOUS = 'anonymous',
}

const getProviderButtonTemplate = (provider: { providerId: string }): {
    getClass(): string,
    getColor(): string,
    getIcon(): string,
    getLabel(): string,
    getId(): string,
} => {
    const {providerId} = provider;
    let template: { btnName: string, btnClass: string, btnColor: string, btnIcon: string, };
    switch (providerId) {
        case 'google.com':
            template = {
                btnName: 'Google',
                btnClass: 'firebaseui-idp-google',
                btnColor: '#ffffff',
                btnIcon: IMAGES.googleIcon
            };
            break;
        case 'github.com':
            template = {
                btnName: 'GitHub',
                btnClass: 'firebaseui-idp-github',
                btnColor: '#333333',
                btnIcon: IMAGES.githubIcon
            };
            break;
        case 'phone':
            template = {
                btnName: 'Phone',
                btnClass: 'firebaseui-idp-phone',
                btnColor: '#02bd7e',
                btnIcon: IMAGES.phoneIcon
            };
            break;
        case 'password':
            template = {
                btnName: 'Email',
                btnClass: 'firebaseui-idp-password',
                btnColor: '#db4437',
                btnIcon: IMAGES.mailIcon
            };
            break;
        case 'facebook.com':
            template = {
                btnName: 'Facebook',
                btnClass: 'firebaseui-idp-facebook',
                btnColor: '#3b5998',
                btnIcon: IMAGES.facebookIcon
            };
            break;
        case 'twitter.com':
            template = {
                btnName: 'Twitter',
                btnClass: 'firebaseui-idp-twitter',
                btnColor: '#55acee',
                btnIcon: IMAGES.twitterIcon
            };
            break;
        case 'microsoft.com':
            template = {
                btnName: 'Microsoft',
                btnClass: 'firebaseui-idp-generic',
                btnColor: '#2f2f2f',
                btnIcon: IMAGES.microsoftIcon
            };
            break;
        case 'apple.com':
            template = {
                btnName: 'Apple',
                btnClass: 'firebaseui-idp-generic',
                btnColor: '#000000',
                btnIcon: IMAGES.appleIcon
            };
            break;
        case 'zalo.me':
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
        getClass(): string {
            return template.btnClass
        },
        getColor(): string {
            return template.btnColor
        },
        getIcon(): string {
            return template.btnIcon
        },
        getLabel(): string {
            return `Đăng nhập với ${template.btnName}`
        },
        getId(): string {
            return providerId
        }
    };
}

const FirebaseUI = (props: { config: any }) => {

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

    const handleSignInWithEmail = async (data: any = null) => {
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

    const handleSignInWithProviderName = (provider: { providerId: PROVIDER_TYPE }) => {
        switch (provider.providerId) {
            case PROVIDER_TYPE.GOOGLE:
                return handleSignInWithGoogle();
            case PROVIDER_TYPE.GITHUB:
                return handleSignInWithGitHub();
            case PROVIDER_TYPE.EMAIL:
                return handleSignInWithEmail();
            case PROVIDER_TYPE.PHONE:
                return handleSignInWithPhone();
            case PROVIDER_TYPE.ZALO:
                return handleSignInWithZalo();
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

export default FirebaseUI;