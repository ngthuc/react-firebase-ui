import React from 'react';
import PropTypes from 'prop-types';

export interface CardHeaderProps {
    children: any,
}

const CardHeader = (props: CardHeaderProps) => {
    const { children } = props;
    return (
        <div className="firebaseui-card-header">
            <h1 className="firebaseui-title">{children}</h1>
        </div>
    );
}

CardHeader.propTypes = {
    children: PropTypes.any.isRequired,
};

CardHeader.defaultProps = {
    children: 'Card Header',
}

export default CardHeader;