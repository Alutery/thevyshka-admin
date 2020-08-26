import React from 'react';
import Spinner from '../../base/spinner';
import {withDataService} from '../../hoc';
import {compose} from 'redux';

const TagsTable = ({loading, tags, dataService, fetchTags}) => {
    if (loading) {
        return <Spinner/>;
    }

    const handleChangeClick = (tag) => {
        const tagName = prompt('Введите новое название:', tag.name);

        if (tagName != null) {
            dataService
                .changeTag({
                    id: tag.id,
                    name: tagName,
                })
                .then(fetchTags)
        }
    }

    const handleDeleteClick = (tagId) => {
        if (window.confirm('Вы уверены, что хотите удалить?')) {
            dataService
                .deleteTag(tagId)
                .then(fetchTags);
        }
    }

    return (
        <div className="tags__table">
            {
                tags.map(tag => (
                    <div className="content__row tags__table-row" key={tag.id}>
                        <span className="tags__tag">{tag.name}</span>
                        <span className="tags__table-btns">
                            <button
                                className="tags__table-btn"
                                type="button"
                                onClick={() => handleChangeClick(tag)}
                            >
                                Изменить
                            </button>
                            <button
                                className="tags__table-btn"
                                type="button"
                                onClick={() => handleDeleteClick(tag.id)}
                            >
                                Удалить
                            </button>
                        </span>
                    </div>
                ))
            }
        </div>
    );
};

export default compose(withDataService())(TagsTable);