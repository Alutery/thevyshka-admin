import React from 'react';

const FilterBar = () => {
    return (
        <div className="content__row content__search">
            <input type="text" className="search-form__input" placeholder="Поиск по заголовку"/>
            <button className="search-btn"/>
            <select name="filter" className="search-form__select">
                <option value="all">Статус</option>
                <option value="draft">Черновик</option>
                <option value="published">Опубликована</option>
            </select>
        </div>
    );
};

export default FilterBar;