import React, {useState} from 'react';

const AddForm = ({onSubmit}) => {
    const [name, setName] = useState('');

    return (
        <div className="tags__add-form">
            <h2 className="add-form__title">Добавить тег</h2>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    if(name.trim()) {
                        onSubmit(name.trim());
                    }
                    setName('');
                }}
                className="add-form__form">
                <input
                    type="text"
                    className="add-form__input"
                    placeholder="Название тега"
                    value={name}
                    onChange={event => setName(event.target.value)}
                />
                <button type="submit" className="add-form__submit"/>
            </form>
        </div>
    );
};

export default AddForm;