import React from 'react';
import PropTypes from 'prop-types';
import '../firebaseui.css';

const ButtonLabel = (props) => {
    const {label} = props;
    return (
        <span className="firebaseui-idp-text firebaseui-idp-text-long" style={{fontSize: 13}}>
            {label}
        </span>
    );
}

ButtonLabel.propTypes = {
    label: PropTypes.string.isRequired
}

ButtonLabel.defaultProps = {
    label: 'Sign in with provider_name'
}

export default ButtonLabel;