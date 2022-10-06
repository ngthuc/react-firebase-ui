import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {

    const {type, onPress, children, template} = props;

    const handlePressAction = () => {
        onPress(type);
    }

    const renderChildren = () => {
        return React.Children.map(children, (child) => {
            return React.cloneElement(child, {
                template: template(type),
                key: `button-item-${template(type).getId()}`
            });
        });
    }

    return (
        <button
            className={`firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised ${template(type).getClass()} firebaseui-id-idp-button`}
            data-provider-id={type} style={{backgroundColor: template(type).getColor()}}
            data-upgraded=",MaterialButton" onClick={handlePressAction}
        >
            {renderChildren()}
        </button>
    );
}

Button.propTypes = {
    type: PropTypes.any.isRequired,
    onPress: PropTypes.func.isRequired,
    children: PropTypes.any.isRequired,
    template: PropTypes.any.isRequired,
};

Button.defaultProps = {
    type: 'anonymous',
    onPress() {},
    children: 'Continue as Anonymous',
    template() {},
};

export default Button;