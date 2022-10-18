import React from 'react';
import PropTypes from 'prop-types';
import '../firebaseui.css';
import ButtonIcon from "./ButtonIcon";
import ButtonLabel from "./ButtonLabel";

const ButtonIconAndLabel = (props) => {
    const {label, iconUrl} = props;
    return (
        <>
            <ButtonIcon label={label}/>
            <ButtonLabel iconUrl={iconUrl}/>
        </>
    );
}

ButtonIconAndLabel.propTypes = {
    label: PropTypes.string.isRequired,
    iconUrl: PropTypes.string.isRequired,
}

ButtonIconAndLabel.defaultProps = {
    label: 'Sign in with provider_name',
    iconUrl: '',
}

export default ButtonIconAndLabel;