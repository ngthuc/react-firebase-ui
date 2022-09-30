import React from 'react';
import PropTypes from 'prop-types';

const Button = (props: {
    type: any,
    onPress(event: any): any,
    children: any,
    template(type: any): { getClass(): string, getColor(): string, getIcon(): string, getLabel(): string, getId(): string },
}) => {

    const {type, onPress, children, template} = props;

    const handlePressAction = () => {
        onPress(type);
    }

    const renderChildren = () => {
        return React.Children.map(children, (child: any) => {
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
    onPress: () => {
    },
    children: 'Continue as Anonymous',
    template: () => {
    },
};

export default Button;