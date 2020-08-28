import React, {useCallback, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import * as Yup from 'yup';

import LayoutModal from '../../base/layout-modal';
import {hideModal} from '../../../actions/authors-modal-actions';
import {fetchCollaborators} from '../../../actions';
import {withDataService} from '../../hoc';
import {compose} from 'redux';
import {Formik} from 'formik';
import AvatarDropzone from './avatar-dropzone';

const AuthorsModal = ({isOpen, hideModal, fetchCollaborators, dataService, isNew, collaborator, editable}) => {
    const [files, setFiles] = useState(
        collaborator && collaborator.photo
            ? [{name: collaborator.photo, preview: process.env.REACT_APP_URL + collaborator.photo}]
            : []);

    useEffect(() => {
        setFiles(
            collaborator && collaborator.photo
                ? [{name: collaborator.photo, preview: process.env.REACT_APP_URL + collaborator.photo}]
                : []
        );
    }, [isOpen]);

    const onCancel = useCallback((event) => {
        const authorModal = document.querySelector('.author-modal');
        if (authorModal && !authorModal.contains(event.target)) {
            isOpen && hideModal();
        }
    }, [isOpen, hideModal]);

    useEffect(() => {
        setTimeout(() => {
            window.addEventListener('click', onCancel);
        }, 0);
        return () => window.removeEventListener('click', onCancel);
    }, [onCancel]);

    return (
        <LayoutModal onClose={onCancel}>
            <div className="author-modal">
                <h2 className="author-modal__title">
                    {!editable
                        ? 'Подробная информация'
                        : isNew ? 'Добавить автора' : 'Изменить автора'}
                </h2>
                <Formik
                    enableReinitialize
                    initialValues={{
                        name: collaborator ? collaborator.name || '' : '',
                        description: collaborator ? collaborator.description || '' : '',
                        links: collaborator ? collaborator.links || '' : '',
                    }}
                    validationSchema={Yup.object().shape({
                        name: Yup.string().required(),
                        description: Yup.string(),
                        links: Yup.string(),
                    })}
                    onSubmit={async (createdCollaborator) => {
                        let photo = null;
                        if (files && files[0] instanceof File) {
                            photo = await dataService.addPhoto(files[0]);
                        }
                        createdCollaborator.name = createdCollaborator.name.trim();
                        createdCollaborator.description = createdCollaborator.description.trim();
                        createdCollaborator.links = createdCollaborator.links.trim();
                        photo && (createdCollaborator.photo = photo);

                        let result;
                        if (isNew) {
                            result = dataService.createCollaborator(createdCollaborator);
                        } else {
                            result = dataService.editCollaborator({
                                id: collaborator.id,
                                ...createdCollaborator,
                            });
                        }

                        result
                            .then(hideModal)
                            .then(fetchCollaborators);
                    }}
                >{({
                       isSubmitting,
                       values,
                       handleChange,
                       handleSubmit
                   }) =>
                    (
                        <form className="author-form" autoComplete="off" onSubmit={handleSubmit}>
                            <div className="author-form__left">
                                <label className="author-form__label" htmlFor="name">Фамилия Имя</label>
                                <input
                                    className="author-form__input"
                                    type="text"
                                    name="name"
                                    required
                                    pattern=".*\S+.*"
                                    value={values.name}
                                    onChange={handleChange}
                                    disabled={!editable}
                                />

                                <label className="author-form__label" htmlFor="links">Ссылка Вк</label>
                                <input
                                    className="author-form__input"
                                    type="text"
                                    name="links"
                                    value={values.links}
                                    onChange={handleChange}
                                    disabled={!editable}
                                />

                                <label className="author-form__label" htmlFor="description">Описание</label>
                                <textarea
                                    className="author-form__textarea"
                                    name="description"
                                    value={values.description}
                                    onChange={handleChange}
                                    disabled={!editable}
                                />

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="content__btn author-form__btn"
                                    style={{
                                        'display': editable ? 'block' : 'none'
                                    }}
                                >
                                    Готово
                                </button>
                            </div>
                            <AvatarDropzone disabled={!editable} onChange={setFiles} files={files}/>
                        </form>
                    )}
                </Formik>
            </div>
        </LayoutModal>
    );
};

const mapStateToProps = ({authorModal: {open, isNew, collaborator, editable}}) => {
    return {isOpen: open, isNew, collaborator, editable};
}

const mapDispatchToProps = (dispatch, {dataService}) => {
    return {
        fetchCollaborators: (filter = {}) => fetchCollaborators(filter, dataService, dispatch),
        hideModal: () => hideModal(dispatch),
    };
}

export default compose(
    withDataService(),
    connect(mapStateToProps, mapDispatchToProps)
)(AuthorsModal);