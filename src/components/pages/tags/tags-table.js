import React from 'react';
import Spinner from '../../base/spinner';
import {withDataService} from '../../hoc';
import {compose} from 'redux';
import Toast from '../../../utils/toast';

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
                .then(() => Toast.customSuccess('Тег изменен'))
                .then(fetchTags)
                .catch(() => Toast.customLoadFailed('Произошла ошибка при редактировании тега'))
        }
    }

    const handleDeleteClick = (tagId) => {
        if (window.confirm('Вы уверены, что хотите удалить?')) {
            dataService
                .deleteTag(tagId)
                .then(() => Toast.customSuccess('Тег удален'))
                .then(fetchTags)
                .catch(() => Toast.customLoadFailed('Произошла ошибка при удалении тега'));
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