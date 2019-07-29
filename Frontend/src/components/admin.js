import React, {Component} from 'react';
import Header from './admin/header';
import Footer from './admin/footer';
import Content from './admin/content';
import '../styles/admin.css';

class Admin extends Component {
    render () {
        return (
            <div class="wrapper container-fluid content">
                <Header />
                <Content />
                <Footer />
            </div>
        );
    }
}

export default Admin;