import React from 'react';
import PropTypes from 'prop-types';

const Card = (props: { children: any }) => {
    const {children} = props;
    return (
        <div className="mdl-card mdl-shadow--2dp firebaseui-container">
            {children}
        </div>
    );
}

Card.propTypes = {
    children: PropTypes.any.isRequired,
};

Card.defaultProps = {
    children: 'Card',
}

export default Card;