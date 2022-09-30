import React from 'react';
import PropTypes from 'prop-types';

const CardFooter = (props: { children: any, termAction?: () => void, policyAction?: () => void }) => {
    const {children, termAction, policyAction} = props;

    return (
        <div className="firebaseui-card-footer">
            {children}
            <ul className="firebaseui-tos-list firebaseui-tos">
                <li className="firebaseui-inline-list-item">
                    <span onClick={termAction}
                          className="firebaseui-link firebaseui-tos-link text-btn">Terms of Service</span>
                </li>
                <li className="firebaseui-inline-list-item">
                    <span onClick={policyAction}
                          className="firebaseui-link firebaseui-pp-link text-btn">Privacy Policy</span>
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