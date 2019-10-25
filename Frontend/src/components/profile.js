import React from 'react';
import Header from './common/header';
import Content from './profile/content';
import Footer from './common/footer';

export default function Profile() {
    return (
        <div className="wrapper container-fluid content">
            <Header/>
            <Content/>
            <Footer/>
        </div>
    );
}