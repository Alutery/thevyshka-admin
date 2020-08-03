import React from 'react';

import Header from '../header/header';
import SideBar from '../sidebar/sidebar';
import Main from '../main/main';
import AuthorsModal from '../pages/authors/authors-modal';

const App = () => {
    return (
        <>
            <Header/>
            <SideBar/>
            <Main/>
            <AuthorsModal/>
        </>
    );
};

export default App;
