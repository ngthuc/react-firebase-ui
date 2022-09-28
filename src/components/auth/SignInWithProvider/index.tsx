import React from 'react';
import PropTypes from 'prop-types';
import {getProviderName, providerDefinition} from "../../../utils/firebase";

const SignInWithProvider = (props: {provider: any, btnLabel: string, onSignIn: any}) => {

    const {provider, btnLabel, onSignIn} = props;
    // @ts-ignore
    const {btnClass, btnColor, iconSvg} = providerDefinition[provider.providerId] || {};

    const handleSignInWithProvider = () => {
        console.log('handleSignInWithProvider', getProviderName(provider));
        onSignIn(getProviderName(provider));
    }

    return (
        <button
            className={`firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised ${btnClass} firebaseui-id-idp-button`}
            data-provider-id={provider.providerId} style={{backgroundColor: btnColor}}
            data-upgraded=",MaterialButton" onClick={handleSignInWithProvider}
        >
            <span className="firebaseui-idp-icon-wrapper">
                <img className="firebaseui-idp-icon" alt="icon-provider" src={iconSvg}/>
            </span>
            <span className="firebaseui-idp-text firebaseui-idp-text-long" style={{fontSize: 13}}>
                {btnLabel}
            </span>
        </button>
    );
}

SignInWithProvider.propTypes = {
    provider: PropTypes.any.isRequired,
    btnLabel: PropTypes.string.isRequired,
    onSignIn: PropTypes.func.isRequired,
};

SignInWithProvider.defaultProps = {
    provider: {providerId: 'google.com'},
    btnLabel: 'Sign in with Google',
    onSignIn: null,
};

export default SignInWithProvider;