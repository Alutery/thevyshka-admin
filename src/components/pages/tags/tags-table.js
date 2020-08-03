import React from 'react';
import Spinner from '../../base/spinner';

const TagsTable = ({loading, tags}) => {
    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="tags__table">
            {
                tags.map(tag => (
                    <div className="content__row tags__table-row" key={tag.id}>
                        <span className="tags__tag">{tag.name}</span>
                        <span className="tags__table-btns">
                            <button className="tags__table-btn" type="button">Изменить</button>
                            <button className="tags__table-btn" type="button">Удалить</button>
                        </span>
                    </div>
                ))
            }
        </div>
    );
};

export default TagsTable;