import React from 'react';
import CategorySelect from './category-select';

const Categories = ({categories, setCategories}) => {
    return (
        <div className="sidebar__section">
            <h3 className="sidebar__title">Рубрики</h3>
            <div className="sidebar__bubbles">
                {
                    categories
                        .filter(category => category.selected)
                        .map((category, index) => (
                            <div className={`sidebar__bubble bubble_square bubble-${index % 4 + 1}`}
                                 key={category.id}
                                 onClick={() => {
                                     setCategories(categories => categories.map(item => item.id === +category.id ? {
                                         ...item,
                                         selected: false
                                     } : item))
                                 }}
                            >
                                <input type="checkbox"/>
                                <label htmlFor="">{category.name}</label>
                            </div>
                        ))
                }
            </div>
            <CategorySelect
                options={categories.filter(category => !category.selected)}
                onSelect={(id) => {
                    setCategories(categories => categories.map(category => category.id === +id ? {
                        ...category,
                        selected: true
                    } : category))
                }}/>
        </div>
    );
};

export default Categories;