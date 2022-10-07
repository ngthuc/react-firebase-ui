import React from 'react';
import PropTypes from "prop-types";

export interface CardActionsProps {
    children: any;
}

const CardActions = (props: CardActionsProps) => {
    const { children } = props;
    return (
        <div className="firebaseui-card-actions">
            {children}
        </div>
    );
}

CardActions.propTypes = {
    children: PropTypes.any.isRequired,
};

CardActions.defaultProps = {
    children: 'Card Actions',
}

export default CardActions;