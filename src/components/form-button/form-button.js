import React from 'react';
import cn from 'classnames';

import './form-button.scss';

const FormButton = ({className, text, onClick, disabled = false}) => {
    return (
        <button
            type="submit"
            disabled={disabled}
            className={cn('form-button', className)}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default FormButton;