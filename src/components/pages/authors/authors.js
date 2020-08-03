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

const Authors = ({fetchCollaborators, collaborators, loading, error}) => {
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

    return (
        <>
            <ContentHeader title="Редакция">
                <ContentButton text="Добавить нового"/>
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

const mapStateToProps = ({collaboratorsList: {collaborators, loading, error}}) => {
    return {collaborators, loading, error};
};

const mapDispatchToProps = (dispatch, {dataService}) => {
    return {
        fetchCollaborators: fetchCollaborators(dataService, dispatch)
    }
};

export default compose(
    withDataService(),
    connect(mapStateToProps, mapDispatchToProps),
)(Authors);