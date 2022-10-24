import React, {useState} from 'react';
import PropTypes from "prop-types";
import '../firebaseui.css';
import TextField from '@mui/material/TextField';
import {Card, CardActions, CardContent, CardFooter, CardHeader} from "../Card";

const PhoneNumberEnter = (props) => {

    const {onSubmit, onCancel} = props;

    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSubmitPhone = (event) => {
        if (phoneNumber === "" || phoneNumber.length < 10) return;
        console.log('verify', {event, phoneNumber});
        onSubmit(phoneNumber)
    }

    const handleCancel = () => {
        onCancel(false);
    }

    return (
        <Card>
            <CardHeader>
                Enter your phone number
            </CardHeader>
            <CardContent>
                <div className="firebaseui-relative-wrapper">
                    <div className="firebaseui-phone-number">
                        <div
                            className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label firebaseui-textfield firebaseui-phone-input-wrapper is-upgraded"
                            data-upgraded=",MaterialTextfield"
                        >
                            <TextField
                                type="tel"
                                label="Phone number"
                                variant="standard"
                                name="phoneNumber"
                                id="standard-basic ui-sign-in-phone-number-input"
                                className="mdl-textfield__input firebaseui-input firebaseui-id-phone-number"
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                value={phoneNumber}
                            />
                        </div>
                    </div>
                    <div className="firebaseui-error-wrapper">
                        <p className="firebaseui-error firebaseui-text-input-error firebaseui-hidden firebaseui-phone-number-error firebaseui-id-phone-number-error"/>
                    </div>
                    <div className="firebaseui-recaptcha-wrapper">
                        <div id="recaptcha-container"></div>
                        <div className="firebaseui-error-wrapper firebaseui-recaptcha-error-wrapper">
                            <p className="firebaseui-error firebaseui-hidden firebaseui-id-recaptcha-error"/>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardActions>
                <div className="firebaseui-form-actions">
                    <button
                        className="firebaseui-id-secondary-link firebaseui-button mdl-button mdl-js-button mdl-button--primary"
                        data-upgraded=",MaterialButton" onClick={handleCancel}>
                        Cancel
                    </button>
                    <button
                        className="firebaseui-id-submit firebaseui-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                        data-upgraded=",MaterialButton" onClick={handleSubmitPhone}>
                        Verify
                    </button>
                </div>
            </CardActions>
            <CardFooter>
                <p className="firebaseui-tos firebaseui-phone-sms-notice">
                    By tapping Verify, an SMS may be sent. Message &amp; data rates may apply.
                </p>
            </CardFooter>
        </Card>
    );
}

PhoneNumberEnter.propsTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
}

PhoneNumberEnter.defaultProps = {
    onSubmit() {},
    onCancel() {}
}

export default PhoneNumberEnter;
