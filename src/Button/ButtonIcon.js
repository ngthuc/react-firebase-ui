import React from 'react';
import PropTypes from 'prop-types';
import '../firebaseui.css';

// export interface ButtonIconProps {
//     template: any,
// }

const ButtonIcon = (props) => {
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
    template() {}
}

export default ButtonIcon;