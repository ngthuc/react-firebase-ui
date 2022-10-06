import React from 'react';
import PropTypes from "prop-types";

const ButtonList = (props) => {
    const {children, items} = props;

    const renderChildren = (item, index) => {
        return React.Children.map(children, (child) => {
            return React.cloneElement(child, {
                type: item,
                key: `button-item-${index + 1}`
            });
        });
    }

    return (
        <ul className="firebaseui-idp-list" style={{margin: '1em 0 0'}}>
            {
                items.map((item, index) => (
                    <li key={`item-${index + 1}`} className="firebaseui-list-item">
                        {renderChildren(item, index)}
                    </li>
                ))
            }
            <div className="firebaseui-card-footer firebaseui-provider-sign-in-footer">
                <p className="firebaseui-tos firebaseui-tospp-full-message">
                    By continuing, you are indicating that you
                    accept our <span className="firebaseui-link firebaseui-tos-link" style={{cursor: 'pointer'}}>Terms of Service</span> and <span
                    className="firebaseui-link firebaseui-pp-link" style={{cursor: 'pointer'}}>Privacy Policy</span>.
                </p>
            </div>
        </ul>
    );
}

ButtonList.propTypes = {
    children: PropTypes.any.isRequired,
    items: PropTypes.array.isRequired,
};

ButtonList.defaultProps = {
    children: 'Continue as Anonymous',
    items: [],
}

export default ButtonList;