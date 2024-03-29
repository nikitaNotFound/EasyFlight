import React from 'react';

import Header from './common/header';
import Content from './booking/content';
import Footer from './common/footer';

export default function Booking({props=props}) {
    return (
        <div className="wrapper container-fluid content">
            <Header />
            <Content flightId={props.computedMatch.params.id} />
            <Footer />
        </div>
    );
}