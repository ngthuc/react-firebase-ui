import React from 'react';
import PropTypes from 'prop-types';
import ButtonIcon from "./ButtonIcon";
import ButtonLabel from "./ButtonLabel";

export interface ButtonIconAndLabelProps {
    template: any,
}

const ButtonIconAndLabel = (props: ButtonIconAndLabelProps) => {
    const {template} = props;
    return (
        <>
            <ButtonIcon template={template}/>
            <ButtonLabel template={template}/>
        </>
    );
}

ButtonIconAndLabel.propTypes = {
    template: PropTypes.any.isRequired,
}

ButtonIconAndLabel.defaultProps = {
    template() {}
}

export default ButtonIconAndLabel;