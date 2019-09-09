import React from 'react';
import Header from './profile/header';
import Content from './profile/content';
import Footer from './profile/footer';

function Profile() {
    return (
        <div className="wrapper container-fluid content">
            <Header/>
            <Content/>
            <Footer/>
        </div>
    );
}

export default Profile;