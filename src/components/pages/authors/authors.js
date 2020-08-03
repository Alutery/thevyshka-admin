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
import {hideModal, showModal} from '../../../actions/modal-actions';

const Authors = ({fetchCollaborators, collaborators, loading, error, modalIsOpen,  hideModal, showModal}) => {
    useEffect(() => {
        fetchCollaborators();
    }, [fetchCollaborators]);

    if (error) {
        return <div>Error</div>;
    }

    const handleSubmitSearch = (query) => {
        console.log(query)
        // searchTags(query);
    };

    const handleClick = () => {
        console.log('modalIsOpen:', modalIsOpen)
        modalIsOpen ? hideModal() : showModal();
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
                loading ?
                    <AuthorsTable loading={loading}/>
                    : <AuthorsTable collaborators={collaborators.collaborators}/>
            }
        </>
    );
};

const mapStateToProps = ({
        collaboratorsList: {collaborators, loading, error},
        modal: {open}
    }) => {
    return {collaborators, loading, error, modalIsOpen: open};
};

const mapDispatchToProps = (dispatch, {dataService}) => {
    return {
        fetchCollaborators: fetchCollaborators(dataService, dispatch),
        hideModal: () => hideModal(dispatch),
        showModal: () => showModal(dispatch),
    };
};

export default compose(
    withDataService(),
    connect(mapStateToProps, mapDispatchToProps),
)(Authors);