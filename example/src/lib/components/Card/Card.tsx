import React from 'react';
import PropTypes from 'prop-types';

export interface CardProps {
    children: any;
}

const Card = (props: CardProps) => {
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