import React from 'react';

import Header from './common/header';
import Footer from './common/footer';
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