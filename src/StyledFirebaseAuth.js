import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {Button, ButtonIcon, ButtonLabel, ButtonList} from "./Button";
import {IMAGES} from "./images";
import {AUTH_TYPE, PROVIDER_TYPE} from "./types";
import {PhoneNumberEnter, VerifyOTP} from "./Form";
import SignInWithEmail from "./SignInWithEmail";
import {typeOf} from "./utils";
import {RecaptchaVerifier, signInWithEmailAndPassword, signInWithPhoneNumber, signInWithPopup} from "firebase/auth";
import queryString from 'query-string';
import {useZaloAccountKit, ZaloLoginPopup} from "./ZaloAccountKit/src";

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
	return {provider, ...template, id: providerId, label: `Đăng nhập với ${template.name}`};
}

const StyledFirebaseAuth = (props) => {
	const {uiConfig, firebaseAuth, zaloAuthConfig} = props;
	const {signInOptions, callbacks} = uiConfig;
	const zaloKit = useZaloAccountKit({...zaloAuthConfig, providerId: PROVIDER_TYPE.ZALO, state: 'zalo_login'});
	const [{requestUrl, code_verifier}, verifyCode] = zaloKit.oauthRequest('zalo_login', {length: 43});

	const [authType, setAuthType] = useState(AUTH_TYPE.OTHER_AUTH);
	const [result, setResult] = useState(null);
	const [phoneNumber, setPhoneNumber] = useState('');
	const [openZaloAuthPopup, setOpenZaloAuthPopup] = useState(false);

	const resetForm = () => {
		setAuthType(AUTH_TYPE.OTHER_AUTH);
		setPhoneNumber('');
	}

	const handleSignInWithProvider = async (event) => {
		const {provider} = event;
		switch (provider.providerId) {
			case PROVIDER_TYPE.PHONE:
				setAuthType(AUTH_TYPE.PHONE_AUTH);
				break;
			case PROVIDER_TYPE.EMAIL:
				setAuthType(AUTH_TYPE.EMAIL_AUTH);
				break;
			case PROVIDER_TYPE.GOOGLE:
			case PROVIDER_TYPE.GITHUB:
				await signInWithPopup(firebaseAuth, provider)
					.then((userCredential) => {
						if (!typeOf(callbacks).isEmpty() && typeOf(callbacks.signInSuccessWithAuthResult).isFunction()) {
							callbacks.signInSuccessWithAuthResult(userCredential);
						}
					})
					.catch((error) => {
						if (!typeOf(callbacks).isEmpty() && typeOf(callbacks.signInFailure).isFunction()) {
							callbacks.signInFailure(error);
						}
					});
				break;
			case PROVIDER_TYPE.ZALO:
				setOpenZaloAuthPopup(true);
				break;
			default:
				break;
		}
	}

	const handleSignInWithEmail = async (data = null) => {
		if (data) {
			const {email, password} = data;
			await signInWithEmailAndPassword(firebaseAuth, email, password)
				.then((userCredential) => {
					if (!typeOf(callbacks).isEmpty() && typeOf(callbacks.signInSuccessWithAuthResult).isFunction()) {
						callbacks.signInSuccessWithAuthResult(userCredential);
					}
				})
				.catch((error) => {
					if (!typeOf(callbacks).isEmpty() && typeOf(callbacks.signInFailure).isFunction()) {
						callbacks.signInFailure(error);
					}
				});
		}
		setAuthType(AUTH_TYPE.EMAIL_AUTH);
	}

	const sendOtpToPhone = (phoneInput) => {
		const parsePhoneNumberByCountry = uiConfig.locale?.parsePhoneNumber(phoneInput, uiConfig.defaultCountry) || phoneInput;
		if (!parsePhoneNumberByCountry || !parsePhoneNumberByCountry.isValid()) return;
		setPhoneNumber(parsePhoneNumberByCountry.number);
		let appVerifier = new RecaptchaVerifier('recaptcha-container', {
			'size': 'invisible'
		}, firebaseAuth);

		signInWithPhoneNumber(firebaseAuth, parsePhoneNumberByCountry.number, appVerifier)
			.then((confirmationResult) => {
				// SMS sent. Prompt user to type the code from the message, then sign the
				// user in with confirmationResult.confirm(code).
				setResult(confirmationResult);
				setAuthType(AUTH_TYPE.VERIFY_OTP);
			})
			.catch((error) => {
				if (!typeOf(callbacks).isEmpty() && typeOf(callbacks.signInFailure).isFunction()) {
					callbacks.signInFailure(error);
				}
			});
	}

	const verifyOtpAndAuthenticate = (otp) => {
		if (!result || !otp) return;
		result.confirm(otp)
			.then((userCredential) => {
				if (!typeOf(callbacks).isEmpty() && typeOf(callbacks.signInSuccessWithAuthResult).isFunction()) {
					callbacks.signInSuccessWithAuthResult(userCredential);
				}
			})
			.catch((error) => {
				if (!typeOf(callbacks).isEmpty() && typeOf(callbacks.signInFailure).isFunction()) {
					callbacks.signInFailure(error);
				}
			});
	}

	const handleZaloAuthCode = () => {
		const compareFields = ['code', 'state', 'code_challenge'];
		const redirectUriQueryParams = Object.keys(queryString.parse(window.location.search));
		if (compareFields.length === redirectUriQueryParams.length && compareFields.every((field) => redirectUriQueryParams.includes(field))) {
			const {code, code_challenge} = queryString.parse(window.location.search);
			localStorage.setItem('auth_code', window.btoa(JSON.stringify({code, code_challenge})));
			setOpenZaloAuthPopup(false);
			window.close();
		}
	}

	const handleUnmountPopup = () => {
		const auth_code = JSON.parse(window.atob(localStorage.getItem('auth_code')));
		if (!typeOf(auth_code.code).isEmpty() && verifyCode(auth_code.code_challenge)) {
			zaloKit.signInWithAuthCode(auth_code.code, code_verifier)
				.then((userCredential) => {
					zaloKit.signInSuccessWithAccessToken(userCredential?.access_token)
						.then((userData) => {
							if (!typeOf(callbacks).isEmpty() && typeOf(callbacks.signInSuccessWithAuthResult).isFunction()) {
								callbacks.signInSuccessWithAuthResult({
									operationType: "signIn",
									providerId: PROVIDER_TYPE.ZALO,
									user: {
										accessToken: userCredential?.access_token,
										displayName: userData?.name,
										photoURL: userData?.picture?.data?.url,
										uid: userData?.id,
										providerData: [{
											providerId: PROVIDER_TYPE.ZALO,
											scopes: zaloAuthConfig.scopes,
										}]
									}
								});
							}
						});
				});
		}
	}

	useEffect(() => {
		handleZaloAuthCode();
	})

	return (
		<div style={{margin: '50px auto'}}
		     className="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-phone-sign-in-start"
		>
			{
				authType === AUTH_TYPE.OTHER_AUTH && <ButtonList items={signInOptions.map(addStyleToOptions)}>
					<Button onPress={handleSignInWithProvider}>
						<ButtonIcon/>
						<ButtonLabel/>
					</Button>
				</ButtonList>
			}

			{
				authType === AUTH_TYPE.PHONE_AUTH &&
				<PhoneNumberEnter onSubmit={sendOtpToPhone} onCancel={resetForm}/>
			}

			{
				authType === AUTH_TYPE.VERIFY_OTP &&
				<VerifyOTP onSubmit={verifyOtpAndAuthenticate} onCancel={resetForm} phoneNumber={phoneNumber}/>
			}

			{
				authType === AUTH_TYPE.EMAIL_AUTH &&
				<SignInWithEmail mode={AUTH_TYPE.VERIFY_PASSWORD} onSubmit={handleSignInWithEmail}
				                 onCancel={resetForm}/>
			}

			{
				authType === AUTH_TYPE.VERIFY_EMAIL &&
				<VerifyOTP onSubmit={verifyOtpAndAuthenticate} onCancel={resetForm} phoneNumber={phoneNumber}/>
			}

			{
				authType === AUTH_TYPE.VERIFY_PASSWORD &&
				<VerifyOTP onSubmit={verifyOtpAndAuthenticate} onCancel={resetForm} phoneNumber={phoneNumber}/>
			}

			<ZaloLoginPopup open={openZaloAuthPopup} requestUrl={requestUrl} onClose={handleUnmountPopup}/>
		</div>
	);
}

StyledFirebaseAuth.propTypes = {
	uiConfig: PropTypes.any.isRequired,
	firebaseAuth: PropTypes.any.isRequired,
	zaloAuthConfig: PropTypes.any,
};

StyledFirebaseAuth.defaultProps = {
	uiConfig: {},
	firebaseAuth: {},
	zaloAuthConfig: {
		appId: 'your_app_id',
		redirectUri: 'your_redirect_uri',
		scopes: ['id', 'picture'],
	},
};

export default StyledFirebaseAuth;