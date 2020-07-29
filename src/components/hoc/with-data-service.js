import React from 'react';
import {DataServiceConsumer} from '../contexts/service-context';

const withDataService = () => (Wrapped) => {
    return (props) => (
        <DataServiceConsumer>
            {
                (postsService) => {
                    return (
                        <Wrapped {...props} dataService={postsService}/>
                    );
                }
            }
        </DataServiceConsumer>
    );
};

export default withDataService;