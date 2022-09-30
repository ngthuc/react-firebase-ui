import React from 'react';
import PropTypes from 'prop-types';

const ButtonIcon = (props: { template: { getIcon(): string } }) => {
    const {template} = props;
    return (
        <>
            {
                template && template.getIcon() &&
                <span className="firebaseui-idp-icon-wrapper">
                    <img className="firebaseui-idp-icon" alt="icon-provider" src={template.getIcon()}/>
                </span>
            }
        </>
    );
}

ButtonIcon.propTypes = {
    template: PropTypes.any.isRequired,
}

ButtonIcon.defaultProps = {
    template: () => {}
}

export default ButtonIcon;