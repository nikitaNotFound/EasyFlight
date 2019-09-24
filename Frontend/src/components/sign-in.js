import React from 'react';
import Header from './sign-in/header';
import Content from './sign-in/content';
import Footer from './sign-in/footer';

export default function SignIn() {
    return (
        <div className="wrapper container-fluid content">
            <Header/>
            <Content/>
            <Footer/>
        </div>
    );
}