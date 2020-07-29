import React from 'react';

const ContentHeader = ({ title, children }) => {
    return (
        <div className="content__header">
            <h1 className="content__title">{title}</h1>
            { children }
        </div>
    );
};

export default ContentHeader;