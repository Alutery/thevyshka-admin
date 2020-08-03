import React from 'react';

const ContentButton = ({text, onClick}) => {
    return (
        <button
            className="content__btn"
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default ContentButton;