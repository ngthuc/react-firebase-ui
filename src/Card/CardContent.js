import React from 'react';
import PropTypes from 'prop-types';
import '../firebaseui.css';

const CardContent = (props) => {
    const {children} = props;
    return (
        <div className="firebaseui-card-content">
            {children}
        </div>
    );
}

CardContent.propTypes = {
    children: PropTypes.any.isRequired,
};

CardContent.defaultProps = {
    children: 'Card Content',
}

export default CardContent;