import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import App from './components/app/app';
import {DataServiceProvider} from './components/contexts/service-context';
import DataService from './services/data-service';
import store from './store';

import './stylesheets/style.scss';

const dataService = new DataService();

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <DataServiceProvider value={dataService}>
                <Router>
                    <App/>
                </Router>
            </DataServiceProvider>
        </Provider>,
    </React.StrictMode>,
    document.getElementById('root')
);