import React from 'react';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Main from './components/layout/Main';

export default class App extends React.Component {
    render() { 
        return (
            <div>
                <Header />
            	<Main />
                <Footer />
            </div>
        );
    }
}

