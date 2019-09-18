import React from 'react';

import Header from './booking/header';
import Content from './booking/content';
import Footer from './booking/footer';


export default function Booking(props) {
    return (
        <div className="wrapper container-fluid content">
            <Header/>
            <Content flightId={props.match.params.id}/>
            <Footer/>
        </div>
    );
}