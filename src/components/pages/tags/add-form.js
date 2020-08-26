import React from 'react';

const AddForm = ({onSubmit}) => {
    return (
        <div className="tags__add-form">
            <h2 className="add-form__title">Добавить тег</h2>
            <form
                onSubmit={(event) => {
                    event.preventDefault();

                    const name = new FormData(event.target).get('name');
                    onSubmit(name);
                }}
                className="add-form__form">
                <input
                    name="name"
                    type="text"
                    className="add-form__input"
                    placeholder="Название тега"
                />
                <button type="submit" className="add-form__submit"/>
            </form>
        </div>
    );
};

export default AddForm;