import React from 'react';
import PropTypes from 'prop-types';

export interface InputProps {
    label?: string;
    disabled?: boolean;
    fontFamily?: string;
    placeholder?: string;
    paddding?: string;
    id?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>
}

const Card = (props) => {
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