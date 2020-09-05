import React from 'react';
import Spinner from '../../base/spinner';
import {editAuthorShowModal, detailedAuthorShowModal} from '../../../actions/authors-modal-actions';
import {fetchCollaborators} from '../../../actions';
import {compose} from 'redux';
import {withDataService} from '../../hoc';
import {connect} from 'react-redux';
import avatar from '../../../images/default-avatar.png';
import Toast from '../../../utils/toast';

const AuthorsTable = ({loading, collaborators, fetchCollaborators, dataService, modalIsOpen, editAuthorShowModal, detailedAuthorShowModal}) => {
    const handleChangeClick = (collaborator) => {
        !modalIsOpen && editAuthorShowModal(collaborator);
    }

    const handleDetailedViewClick = (collaborator) => {
        !modalIsOpen && detailedAuthorShowModal(collaborator);
    }

    const handleDeleteClick = (collaboratorId) => {
        if (window.confirm('Вы уверены, что хотите удалить?')) {
            dataService
                .deleteCollaborator(collaboratorId)
                .then(() => Toast.customSuccess('Автор удален'))
                .then(fetchCollaborators)
                .catch(() => Toast.customLoadFailed('Произошла ошибка при удалении автора'));
        }
    }

    return (
        <>
            <table className="content__table authors__table">
                <thead>
                <tr>
                    <th/>
                    <th>Имя</th>
                    <th>Описание</th>
                    <th>Кол-во материалов</th>
                    <th>Ссылка Вк</th>
                    <th>Дата</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {
                    !loading && collaborators.map(collaborator => (
                        <tr key={collaborator.id}>
                            <td>
                                <img src={collaborator.photo ? process.env.REACT_APP_URL + collaborator.photo : avatar} alt=""/>
                            </td>
                            <td>{collaborator.name}</td>
                            <td>{collaborator.description}</td>
                            <td>{collaborator.posts.length}</td>
                            <td>
                                <a href={collaborator.links}>
                                    {collaborator.links}
                                </a>
                            </td>
                            <td>{collaborator.date}</td>
                            <td>
                                <div className="content-table__actions">
                                    <button
                                        type="button"
                                        onClick={() => handleDetailedViewClick(collaborator)}>
                                        Перейти
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleChangeClick(collaborator)}>
                                        Изменить
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteClick(collaborator.id)}>
                                        Удалить
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            {loading && <Spinner/>}
        </>
    );
};

const mapStateToProps = ({authorModal: {open}}) => {
    return {modalIsOpen: open};
};

const mapDispatchToProps = (dispatch, {dataService}) => {
    return {
        fetchCollaborators: (filter = {}) => fetchCollaborators(filter, dataService, dispatch),
        editAuthorShowModal: (collaborator) => editAuthorShowModal(collaborator, dispatch),
        detailedAuthorShowModal: (collaborator) => detailedAuthorShowModal(collaborator, dispatch),
    };
};

export default compose(
    withDataService(),
    connect(mapStateToProps, mapDispatchToProps),
)(AuthorsTable);