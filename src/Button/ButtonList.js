import React from 'react';
import PropTypes from "prop-types";
import '../firebaseui.css';
import {filterPropKeys} from "../utils";

const ButtonList = (props) => {
    const {children, items} = props;

    const renderChildren = (item, index) => {
        if (!item.type && !item.provider) return null;
        return React.Children.map(children, (child) => {
            return React.cloneElement(child, filterPropKeys({
                ...item,
                type: item.type || null,
                provider: item.provider || null,
                key: `button-item-${index + 1}`
            }, ['type', 'key', 'provider', 'backgroundColor', 'className', 'id', 'label', 'iconUrl']));
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