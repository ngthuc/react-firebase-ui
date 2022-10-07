import React, {useState} from 'react';
import '../../../../firebaseui.css';
import TextField from "@mui/material/TextField";
import {AUTH_TYPE} from "../../../../constants/types";
import {Card, CardActions, CardContent, CardFooter, CardHeader} from '../../../Card';
import PropTypes from "prop-types";

const SignInWithEmail = (props) => {

    const {mode, enableSignUp, onSubmit, onCancel} = props;

    const [step, setStep] = useState(AUTH_TYPE.EMAIL_AUTH);
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [title, setTitle] = useState('Sign in with email');

    const handleSubmitEmail = (event) => {
        console.log('verify', {event, email, mode, enableSignUp});
        switch (step) {
            case AUTH_TYPE.EMAIL_AUTH:
                setStep(enableSignUp ? AUTH_TYPE.EMAIL_SIGNUP : mode);
                break;
            case AUTH_TYPE.EMAIL_SIGNUP:
                setTitle('Create account');
                break;
            case AUTH_TYPE.VERIFY_EMAIL:
                setTitle('Sign-in email sent');
                break;
            case AUTH_TYPE.VERIFY_PASSWORD:
                setTitle('Sign in');
                onSubmit({email, password});
                break;
            default:
                break;
        }
    }

    const handleCancel = () => {
        onCancel(false);
    }

    const handleVisiblePassword = () => {
        setVisiblePassword(!visiblePassword);
        setTimeout(() => {
            if (visiblePassword) setVisiblePassword(false);
        }, 5000)
    }

    return (
        <Card>
            <CardHeader>
                {title}
            </CardHeader>
            <CardContent>
                {
                    [AUTH_TYPE.RECOVERY_PASSWORD].includes(step) &&
			        <p className="firebaseui-text">
				        Get instructions sent to this email that explain how to reset your password
			        </p>
                }
                {
                    [AUTH_TYPE.CHECK_RECOVERY_EMAIL].includes(step) &&
			        <p className="firebaseui-text">
				        Follow the instructions sent to <strong>{email}</strong> to recover your password
			        </p>
                }
                {
                    ![AUTH_TYPE.VERIFY_EMAIL, AUTH_TYPE.CHECK_RECOVERY_EMAIL].includes(step) && <>
				        <div
					        className="firebaseui-textfield mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-dirty is-upgraded"
					        data-upgraded=",MaterialTextfield">
					        <TextField
						        type="text"
						        label="Email"
						        variant="standard"
						        name="email"
						        id="standard-basic ui-sign-in-email-input"
						        className="mdl-textfield__input firebaseui-input firebaseui-id-email"
						        onChange={(e) => setEmail(e.target.value)}
						        value={email}
					        />
				        </div>
				        <div className="firebaseui-error-wrapper">
					        <p className="firebaseui-error firebaseui-text-input-error firebaseui-hidden firebaseui-id-email-error"></p>
				        </div>
			        </>
                }

                {
                    step === AUTH_TYPE.EMAIL_SIGNUP && <>
				        <div
					        className="firebaseui-textfield mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded"
					        data-upgraded=",MaterialTextfield">
					        <TextField
						        type="text"
						        label="First & last name"
						        variant="standard"
						        name="fullName"
						        id="standard-basic ui-sign-in-phone-number-input"
						        className="mdl-textfield__input firebaseui-input firebaseui-id-name"
						        onChange={(e) => setFullName(e.target.value)}
						        value={fullName}
					        />
				        </div>
				        <div className="firebaseui-error-wrapper">
					        <p className="firebaseui-error firebaseui-text-input-error firebaseui-hidden firebaseui-id-name-error"></p>
				        </div>
				        <div className="firebaseui-new-password-component">
					        <div
						        className="firebaseui-textfield mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded"
						        data-upgraded=",MaterialTextfield"
					        >
						        <TextField
							        type={visiblePassword ? 'text' : 'password'}
							        label="Choose password"
							        variant="standard"
							        name="newPassword"
							        autoComplete="new-password"
							        id="standard-basic ui-sign-in-new-password-input"
							        className="mdl-textfield__input mdl-textfield__input firebaseui-input firebaseui-id-new-password"
							        onChange={(e) => setNewPassword(e.target.value)}
							        value={newPassword}
						        />
					        </div>
					        <span
						        style={{top: 37}}
						        onClick={handleVisiblePassword}
						        className="firebaseui-input-floating-button firebaseui-id-password-toggle firebaseui-input-toggle-on firebaseui-input-toggle-blur"
					        />
					        <div className="firebaseui-error-wrapper">
						        <p className="firebaseui-error firebaseui-text-input-error firebaseui-hidden firebaseui-id-new-password-error"></p>
					        </div>
				        </div>
			        </>
                }

                {
                    step === AUTH_TYPE.VERIFY_PASSWORD && <>
				        <div
					        className="firebaseui-textfield mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded is-dirty"
					        data-upgraded=",MaterialTextfield">
					        <TextField
						        type="password"
						        label="Password"
						        variant="standard"
						        name="password"
						        autoComplete="current-password"
						        id="standard-basic ui-sign-in-password-input"
						        className="mdl-textfield__input firebaseui-input firebaseui-id-password"
						        onChange={(e) => setPassword(e.target.value)}
						        value={password}
					        />
				        </div>
				        <div className="firebaseui-error-wrapper">
					        <p className="firebaseui-error firebaseui-text-input-error firebaseui-hidden firebaseui-id-new-password-error"></p>
				        </div>
			        </>
                }

                {
                    step === AUTH_TYPE.VERIFY_EMAIL && <>
				        <div className="firebaseui-email-sent"></div>
				        <p className="firebaseui-text">
					        A sign-in email with additional instructions was sent
					        to <strong>{email}</strong>. Check your email to complete sign-in.
				        </p>
			        </>
                }
            </CardContent>
            <CardActions>
                {
                    [AUTH_TYPE.RECOVERY_PASSWORD].includes(step) &&
			        <div className="firebaseui-form-links">
                        <span className="firebaseui-link firebaseui-id-secondary-link">
                            Trouble signing in?
                        </span>
			        </div>
                }
                <div className="firebaseui-form-actions">
                    {
                        [AUTH_TYPE.VERIFY_EMAIL].includes(step) &&
				        <button
					        className="firebaseui-id-secondary-link firebaseui-button mdl-button mdl-js-button mdl-button--primary"
					        data-upgraded=",MaterialButton" onClick={handleCancel}>
					        Back
				        </button>
                    }
                    {
                        [AUTH_TYPE.EMAIL_AUTH, AUTH_TYPE.EMAIL_SIGNUP, AUTH_TYPE.RECOVERY_PASSWORD].includes(step) &&
				        <button
					        className="firebaseui-id-secondary-link firebaseui-button mdl-button mdl-js-button mdl-button--primary"
					        data-upgraded=",MaterialButton" onClick={handleCancel}>
					        Cancel
				        </button>
                    }
                    {
                        [AUTH_TYPE.EMAIL_AUTH].includes(step) &&
				        <button
					        className="firebaseui-id-submit firebaseui-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
					        data-upgraded=",MaterialButton" onClick={handleSubmitEmail}>
					        Next
				        </button>
                    }
                    {
                        [AUTH_TYPE.VERIFY_PASSWORD].includes(step) &&
				        <button
					        className="firebaseui-id-submit firebaseui-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
					        data-upgraded=",MaterialButton" onClick={handleSubmitEmail}>
					        Sign In
				        </button>
                    }
                    {
                        [AUTH_TYPE.RECOVERY_PASSWORD].includes(step) &&
				        <button
					        className="firebaseui-id-submit firebaseui-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
					        data-upgraded=",MaterialButton" onClick={handleSubmitEmail}>
					        Send
				        </button>
                    }
                    {
                        [AUTH_TYPE.CHECK_RECOVERY_EMAIL].includes(step) &&
				        <button
					        className="firebaseui-id-submit firebaseui-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
					        data-upgraded=",MaterialButton" onClick={handleSubmitEmail}>
					        Done
				        </button>
                    }
                </div>
            </CardActions>
            <CardFooter />
        </Card>
    );
}

SignInWithEmail.propsTypes = {
    mode: PropTypes.oneOf([AUTH_TYPE.VERIFY_EMAIL, AUTH_TYPE.VERIFY_PASSWORD]).isRequired,
    enableSignUp: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
}

SignInWithEmail.defaultProps = {
    mode: AUTH_TYPE.VERIFY_PASSWORD,
    enableSignUp: false,
    onSubmit() {},
    onCancel() {},
}

export default SignInWithEmail;