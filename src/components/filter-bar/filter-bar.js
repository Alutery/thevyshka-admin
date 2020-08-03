import React from 'react';

const FilterBar = React.forwardRef(({placeholder, onSearch, children}, ref) => {
    const handleSubmitSearch = (event) => {
        event.preventDefault();

        const query = new FormData(event.target).get('query');
        onSearch(query);
    };

    return (
        <div className="content__row content__search">
            <form onSubmit={handleSubmitSearch} autoComplete="off">
                <input type="text" className="search-form__input" placeholder={placeholder} name="query" ref={ref}/>
                <button className="search-btn" type="submit"/>
            </form>
            {children}
        </div>
    );
});

export default FilterBar;