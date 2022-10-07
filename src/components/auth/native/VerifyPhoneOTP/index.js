import React, {useState} from 'react';
import '../../../../firebaseui.css';
import TextField from '@mui/material/TextField';
import PropTypes from "prop-types";

const VerifyPhoneOTP = (props) => {

    const {phoneNumber, onSubmit, onCancel} = props;

    const [otp, setOtp] = useState('');

    const handleSubmitOtp = (event) => {
        if (otp === "" || (otp.length < 6 || otp.length > 6)) return;
        console.log('verify', {event, otp, phoneNumber});
        onSubmit(otp)
    }

    const handleCancel = () => {
        onCancel(false);
    }

    const handleResend = () => {
        console.log('resend', phoneNumber);
    }

    return (
        <div className="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-phone-sign-in-finish">
            <div className="firebaseui-card-header">
                <h1 className="firebaseui-title">Verify your phone number</h1>
            </div>
            <div className="firebaseui-card-content">
                <p className="firebaseui-text">Enter the 6-digit code we sent to
                    <span className="firebaseui-link firebaseui-change-phone-number-link firebaseui-id-change-phone-number-link">
                        {phoneNumber}
                    </span>
                </p>
                <div
                    className="firebaseui-textfield mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded"
                    data-upgraded=",MaterialTextfield"
                >
                    <TextField
                        type="number"
                        label="6-digit code"
                        variant="standard"
                        name="phoneConfirmationCode"
                        id="standard-basic ui-sign-in-phone-confirmation-code-input"
                        className="mdl-textfield__input firebaseui-input firebaseui-id-phone-confirmation-code"
                        onChange={(e) => setOtp(e.target.value)}
                        value={otp}
                    />
                </div>
                <div className="firebaseui-error-wrapper">
                    <p className="firebaseui-error firebaseui-text-input-error firebaseui-hidden firebaseui-id-phone-confirmation-code-error">
                        {otp.length !== 6 ? "Invalid verification code" : ''}
                    </p>
                </div>
            </div>
            <div className="firebaseui-card-actions">
                <div className="firebaseui-form-actions">
                    <button
                        className="firebaseui-id-secondary-link firebaseui-button mdl-button mdl-js-button mdl-button--primary"
                        data-upgraded=",MaterialButton" onClick={handleCancel}>
                        Cancel
                    </button>
                    <button
                        className="firebaseui-id-submit firebaseui-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                        data-upgraded=",MaterialButton" onClick={handleSubmitOtp}>
                        Continue
                    </button>
                </div>
            </div>
            <div className="firebaseui-resend-container">
                <span className="firebaseui-id-resend-countdown firebaseui-hidden">
                    Resend code in 0:01
                </span>
                <span className="firebaseui-id-resend-link firebaseui-link" onClick={handleResend}>
                    Resend
                </span>
            </div>
        </div>
    );
}

VerifyPhoneOTP.propsTypes = {
    phoneNumber: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
}

VerifyPhoneOTP.defaultProps = {
    phoneNumber: '',
    onSubmit() {},
    onCancel() {}
}

export default VerifyPhoneOTP;
