import React, {Component} from 'react';
import Header from './admin/header';
import Footer from './admin/footer';

class Admin extends Component {
    render () {
        return (
            <div class="wrapper container-fluid content">
                <Header />

                <Footer />
            </div>
        );
    }
}

export default Admin;