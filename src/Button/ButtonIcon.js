import React from 'react';
import PropTypes from 'prop-types';
import '../firebaseui.css';

const ButtonIcon = (props) => {
    const {iconUrl} = props;
    return (
        <>
            {
                iconUrl &&
                <span className="firebaseui-idp-icon-wrapper">
                    <img className="firebaseui-idp-icon" alt="icon-provider" src={iconUrl}/>
                </span>
            }
        </>
    );
}

ButtonIcon.propTypes = {
    iconUrl: PropTypes.string.isRequired,
}

ButtonIcon.defaultProps = {
    iconUrl: '',
}

export default ButtonIcon;