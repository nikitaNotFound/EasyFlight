import React from 'react';
import Header from './common/header';
import Content from './sign-in/content';
import Footer from './common/footer';

export default function SignIn() {
    return (
        <div className="wrapper container-fluid content">
            <Header/>
            <Content/>
            <Footer/>
        </div>
    );
}