import React, {useCallback, useEffect} from 'react';
import {connect} from 'react-redux';

import LayoutModal from '../../base/layout-modal';
import {hideModal} from '../../../actions/modal-actions';

const AuthorsModal = ({isOpen, hideModal}) => {
    const onCancel = useCallback((event) => {
        const modal = document.querySelector('.author-modal');
        if (!modal.contains(event.target)) {
            isOpen && hideModal();
        }
    }, [isOpen, hideModal]);

    const onSuccess = () => {
        console.log('success');

    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = new FormData(event.target);

        console.log([...form.entries()]);
    };

    useEffect(() => {
        window.addEventListener('click', onCancel);
        return () => window.removeEventListener('click', onCancel);
    }, [onCancel]);

    return (
        <LayoutModal onClose={onCancel}>
            <div className="author-modal">
                <h2 className="author-modal__title">Добавить автора</h2>
                <form className="author-form" autoComplete="off" onSubmit={handleSubmit}>
                    <div className="author-form__left">
                        <label className="author-form__label" htmlFor="name">Фамилия Имя</label>
                        <input className="author-form__input" type="text" name="name" id="name" required pattern=".*\S+.*"/>

                        <label className="author-form__label" htmlFor="vk">Ссылка Вк</label>
                        <input className="author-form__input" type="text" name="vk" id="vk"/>

                        <label className="author-form__label" htmlFor="description">Описание</label>
                        <textarea className="author-form__textarea" name="description" id="description"/>

                        <button className="content__btn author-form__btn">Готово</button>
                    </div>
                    <div className="author-form__right">
                        <input className="author-form__upload" id="file-upload" type="file" name="fileUpload"
                               accept="image/*"/>
                        <label className="author-form__upload-label" htmlFor="file-upload" id="file-drag">
                            <div className="upload__img-container">
                                <i className="i-upload-image" aria-hidden="true"/>
                                <img id="file-image" src="#" alt="Preview" className="upload__img hidden"/>
                            </div>
                            <span className="upload__btn">Загрузить фото</span>
                        </label>
                        <div className="upload__message">photo1.jpg</div>
                    </div>
                </form>
            </div>
        </LayoutModal>
    );
};

const mapStateToProps = ({modal: {open}}) => {
    return {isOpen: open};
}

const mapDispatchToProps = (dispatch) => {
    return {
        hideModal: () => hideModal(dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsModal);