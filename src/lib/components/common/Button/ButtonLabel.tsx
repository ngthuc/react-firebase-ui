import React from 'react';
import PropTypes from 'prop-types';

const ButtonLabel = (props) => {
    const {template} = props;
    return (
        <span className="firebaseui-idp-text firebaseui-idp-text-long" style={{fontSize: 13}}>
            {template.getLabel()}
        </span>
    );
}

ButtonLabel.propTypes = {
    template: PropTypes.any.isRequired,
}

ButtonLabel.defaultProps = {
    template() {}
}

export default ButtonLabel;