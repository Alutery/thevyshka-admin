import React from 'react';

const AddForm = () => {
    return (
        <div className="tags__add-form">
            <h2 className="add-form__title">Добавить тег</h2>
            <form action="" className="add-form__form">
                <input type="text" className="add-form__input" placeholder="Название тега" />
                <button type="submit" className="add-form__submit" />
            </form>
        </div>
    );
};

export default AddForm;