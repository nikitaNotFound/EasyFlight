import React, {Component} from 'react';
import Header from './user/header';
import Footer from './user/footer';
import Content from './user/content';

class User extends Component {
    render () {
        return (
            <div className="wrapper container-fluid content">
                <Header />
                <Content />
                <Footer />
            </div>
        );
    }
}

export default User;