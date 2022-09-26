import React, {useState} from 'react';
import TextField from '@mui/material/TextField/TextField';
import {useTranslation} from "react-i18next";

const VerifyPhoneOTP = (props: { phoneNumber: string, onSubmit: any, onCancel: any }) => {

    const {phoneNumber, onSubmit, onCancel} = props;
    const { t } = useTranslation();

    const [otp, setOtp] = useState('');

    const handleSubmitOtp = (event: any) => {
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
                <h1 className="firebaseui-title">{t('verify_phone_auth.title')}</h1>
            </div>
            <div className="firebaseui-card-content">
                <p className="firebaseui-text">{t('verify_phone_auth.otp_guide_text')}
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
                        label={t('verify_phone_auth.otp_input_label')}
                        variant="standard"
                        name="phoneConfirmationCode"
                        id="standard-basic ui-sign-in-phone-confirmation-code-input"
                        className="mdl-textfield__input firebaseui-input firebaseui-id-phone-confirmation-code"
                        onChange={(e: any) => setOtp(e.target.value)}
                        value={otp}
                    />
                </div>
                <div className="firebaseui-error-wrapper">
                    <p className="firebaseui-error firebaseui-text-input-error firebaseui-hidden firebaseui-id-phone-confirmation-code-error">
                        {otp.length !== 6 ? t('verify_phone_auth.otp_invalid') : ''}
                    </p>
                </div>
            </div>
            <div className="firebaseui-card-actions">
                <div className="firebaseui-form-actions">
                    <button
                        className="firebaseui-id-secondary-link firebaseui-button mdl-button mdl-js-button mdl-button--primary"
                        data-upgraded=",MaterialButton" onClick={handleCancel}>
                        {t('common.cancel_button')}
                    </button>
                    <button
                        className="firebaseui-id-submit firebaseui-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                        data-upgraded=",MaterialButton" onClick={handleSubmitOtp}>
                        {t('common.continue_button')}
                    </button>
                </div>
            </div>
            <div className="firebaseui-resend-container">
                <span className="firebaseui-id-resend-countdown firebaseui-hidden">
                    {t('verify_phone_auth.resend_time_in')} 0:01
                </span>
                <span className="firebaseui-id-resend-link firebaseui-link" onClick={handleResend}>
                    {t('common.resend_button')}
                </span>
            </div>
        </div>
    );
}

export default VerifyPhoneOTP;
