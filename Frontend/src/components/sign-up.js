import React, {Component} from 'react';
import Content from './sign-up/content';
import Footer from './sign-up/footer';
import Header from './sign-up/header';

class SignUp extends Component {
    render () {
        return (
            <div className="wrapper container-fluid content">
                <Header/>
                <Content/>
                <Footer/>
            </div>
        );
    }
}

export default SignUp;