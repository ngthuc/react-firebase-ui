import React, {useState} from 'react';
import TextField from '@mui/material/TextField/TextField';
import { useTranslation } from 'react-i18next';
import {Card, CardActions, CardContent, CardFooter, CardHeader} from "../../../common/Card";

const SignInWithPhone = (props: { onSubmit: any, onCancel: any }) => {

    const {onSubmit, onCancel} = props;
    const { t } = useTranslation();

    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSubmitPhone = (event: any) => {
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
                {t('sign_in_with_phone.title')}
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
                                label={t('sign_in_with_phone.phone_number_input_label')}
                                variant="standard"
                                name="phoneNumber"
                                id="standard-basic ui-sign-in-phone-number-input"
                                className="mdl-textfield__input firebaseui-input firebaseui-id-phone-number"
                                onChange={(e: any) => setPhoneNumber(e.target.value)}
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
                        {t('common.cancel_button')}
                    </button>
                    <button
                        className="firebaseui-id-submit firebaseui-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                        data-upgraded=",MaterialButton" onClick={handleSubmitPhone}>
                        {t('common.verify_button')}
                    </button>
                </div>
            </CardActions>
            <CardFooter>
                <p className="firebaseui-tos firebaseui-phone-sms-notice">
                    {t('sign_in_with_phone.phone_auth_caution')}
                </p>
            </CardFooter>
        </Card>
    );
}

export default SignInWithPhone;
