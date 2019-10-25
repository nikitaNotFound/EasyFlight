import React from 'react';
import Content from './sign-up/content';
import Footer from './common/footer';
import Header from './common/header';

export default function SignUp() {
    return (
        <div className="wrapper container-fluid content">
            <Header/>
            <Content/>
            <Footer/>
        </div>
    );
}