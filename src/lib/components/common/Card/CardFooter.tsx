import React from 'react';
import PropTypes from 'prop-types';

const CardFooter = (props) => {
    const {children, termAction, policyAction} = props;

    return (
        <div className="firebaseui-card-footer">
            {children}
            <ul className="firebaseui-tos-list firebaseui-tos">
                <li className="firebaseui-inline-list-item">
                    <span onClick={termAction} style={{cursor: 'pointer'}} className="firebaseui-link firebaseui-tos-link">Terms of Service</span>
                </li>
                <li className="firebaseui-inline-list-item">
                    <span onClick={policyAction} style={{cursor: 'pointer'}} className="firebaseui-link firebaseui-pp-link">Privacy Policy</span>
                </li>
            </ul>
        </div>
    );
}

CardFooter.propTypes = {
    children: PropTypes.any,
    termAction: PropTypes.func,
    policyAction: PropTypes.func,
};

CardFooter.defaultProps = {
    children: null,
    termAction() {},
    policyAction() {},
}

export default CardFooter;