import React from 'react';
import Header from './common/header';
import Content from './not-found-page/content';
import Footer from './common/footer';

export default function NotFoundPage() {
    return (
        <div className="wrapper container-fluid content">
            <Header/>
            <Content/>
            <Footer/>
        </div>
    );
}