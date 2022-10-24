import React from 'react';
import PropTypes from 'prop-types';
import '../firebaseui.css';
import {filterPropKeys} from "../utils";

const Button = (props) => {

    const {id, type, provider, onPress, children, backgroundColor, className} = props;

    const handlePressAction = () => {
        onPress({id, type, provider});
    }

    const renderChildren = () => {
        return React.Children.map(children, (child) => {
            return React.cloneElement(child, filterPropKeys({
                ...props,
                key: `button-item-${id}`,
            }, ['key', 'label', 'iconUrl']));
        });
    }

    return (
        <button
            className={`firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised ${className} firebaseui-id-idp-button`}
            data-provider-id={id} style={{backgroundColor}}
            data-upgraded=",MaterialButton" onClick={handlePressAction}
        >
            {renderChildren()}
        </button>
    );
}

Button.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.any,
    provider: PropTypes.any,
    onPress: PropTypes.func.isRequired,
    children: PropTypes.any.isRequired,
    backgroundColor: PropTypes.string,
    className: PropTypes.string,
};

Button.defaultProps = {
    id: 'anonymous',
    onPress() {},
    children: 'Continue as Anonymous',
    backgroundColor: '#f4b400',
    className: 'firebaseui-idp-anonymous',
};

export default Button;