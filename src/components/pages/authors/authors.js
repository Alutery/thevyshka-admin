import React, {useEffect} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';

import ContentHeader from '../../base/content-header';
import FilterBar from '../../filter-bar/filter-bar';
import AuthorsTable from './authors-table';
import ContentButton from '../../base/content-button';
import PaginationAuthorsContainer from './pagination-authors-container';

import {withDataService} from '../../hoc';
import {fetchCollaborators} from '../../../actions';
import {hideModal, createAuthorShowModal} from '../../../actions/authors-modal-actions';

const Authors = ({fetchCollaborators, collaborators, query, loading, error, modalIsOpen,  hideModal, createAuthorShowModal, dataService}) => {
    useEffect(() => {
        fetchCollaborators();
    }, [fetchCollaborators]);

    if (error) {
        return <div>Error</div>;
    }

    const handleSubmitSearch = (newQuery) => {
        if(query !== newQuery) {
            newQuery ? fetchCollaborators({'query': newQuery}) : fetchCollaborators();
        }
    };

    const handleClick = () => {
        !modalIsOpen && createAuthorShowModal();
    };

    return (
        <>
            <ContentHeader title="Редакция">
                <ContentButton text="Добавить нового" onClick={handleClick}/>
            </ContentHeader>
            <FilterBar placeholder="Поиск по имени" onSearch={handleSubmitSearch}>
                <PaginationAuthorsContainer/>
            </FilterBar>
            {
                loading
                    ? <AuthorsTable loading={loading}/>
                    : <AuthorsTable collaborators={collaborators.collaborators} fetchCollaborators={fetchCollaborators} dataService={dataService}/>
            }
        </>
    );
};

const mapStateToProps = ({
        collaboratorsList: {collaborators, query, loading, error},
        authorModal: {open}
    }) => {
    return {collaborators, query, loading, error, modalIsOpen: open};
};

const mapDispatchToProps = (dispatch, {dataService}) => {
    return {
        fetchCollaborators: (filter ={}) => fetchCollaborators(filter, dataService, dispatch),
        hideModal: () => hideModal(dispatch),
        createAuthorShowModal: () => createAuthorShowModal(dispatch),
    };
};

export default compose(
    withDataService(),
    connect(mapStateToProps, mapDispatchToProps),
)(Authors);