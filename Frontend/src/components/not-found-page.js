import React from 'react';
import Header from './not-found-page/header';
import Content from './not-found-page/content';
import Footer from './not-found-page/footer';

export default function NotFoundPage() {
    return (
        <div className="wrapper container-fluid content">
            <Header/>
            <Content/>
            <Footer/>
        </div>
    );
}