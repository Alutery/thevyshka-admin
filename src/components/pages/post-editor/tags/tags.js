import React, {useEffect} from 'react';
import TagsSelect from './tags-select';

const Tags = ({tags, setTags, disabled}) => {
    return (
        <div className="sidebar__section">
            <h3 className="sidebar__title">Теги</h3>
            <div className="sidebar__bubbles">
                {
                    tags
                        .map((tag, index) => (
                            <div
                                onClick={() => {
                                    !disabled && setTags(tags => tags.filter(item => item.id
                                        ? item.id !== +tag.id
                                        : item.name !== tag.name));
                                }}
                                className={`sidebar__bubble bubble_round bubble-${index % 4 + 1}`}
                                key={tag.name}
                            >
                                <input type="checkbox"/>
                                <label htmlFor="">{tag.name}</label>
                            </div>
                        ))
                }
            </div>
            {!disabled && <TagsSelect tags={tags} setTags={setTags} disabled={disabled}/>}
        </div>
    );
};

export default Tags;