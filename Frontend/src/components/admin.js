import React from 'react';

import Header from './admin/header';
import Footer from './admin/footer';
import Content from './admin/content';

import '../styles/admin.css';


export default function Admin() {
    return (
        <div className="wrapper container-fluid content">
            <Header />
            <Content />
            <Footer />
        </div>
    );
}