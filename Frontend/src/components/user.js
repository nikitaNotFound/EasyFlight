import React from 'react';
import Header from './user/header';
import Footer from './user/footer';
import Content from './user/content';

function User() {
    return (
        <div className="wrapper container-fluid content">
            <Header />
            <Content />
            <Footer />
        </div>
    );
}

export default User;