import React from 'react';

const TagsTable = () => {
    return (
        <div className="tags__table">
            <div className="content__row tags__table-row">
                <span>тег</span>
                <span>
                    <button className="tags__table-btn" type="button">Изменить</button>
                    <button className="tags__table-btn" type="button">Удалить</button>
                </span>
            </div>
            <div className="content__row tags__table-row">
                <span>тег</span>
                <span>
                    <button className="tags__table-btn" type="button">Изменить</button>
                    <button className="tags__table-btn" type="button">Удалить</button>
                </span>
            </div>
        </div>
    );
};

export default TagsTable;