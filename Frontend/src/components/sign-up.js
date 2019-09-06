import React from 'react';
import Content from './sign-up/content';
import Footer from './sign-up/footer';
import Header from './sign-up/header';

function SignUp() {
    return (
        <div className="wrapper container-fluid content">
            <Header/>
            <Content/>
            <Footer/>
        </div>
    );
}

export default SignUp;