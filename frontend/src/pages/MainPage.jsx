import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import MainContent from '../components/MainPage/MainContent';
import Footer from '../components/Footer/Footer';

class MainPage extends React.Component {
    render() {
        return (
            <div className='main-page'>
                <Navbar />
                <MainContent />
                <Footer />
            </div>
        )
    }
}

export default MainPage;