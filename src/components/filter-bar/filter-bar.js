import React from 'react';

const FilterBar = ({ placeholder, children }) => {
    return (
        <div className="content__row content__search">
            <input type="text" className="search-form__input" placeholder={placeholder}/>
            <button className="search-btn"/>
            { children }
        </div>
    );
};

export default FilterBar;