import React from 'react';

import Header from './main-page/header';
import Footer from './common/footer';
import Content from './main-page/content';

export default function MainPage() {
    return (
        <div className="wrapper container-fluid content">
            <Header />
            <Content />
            <Footer />
        </div>
    );
}