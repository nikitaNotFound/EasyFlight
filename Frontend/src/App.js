import React from 'react';
import Header from './components/header';
import Footer from './components/footer';
import Content from './components/content';


function App() {
  return (
    <div className="wrapper container-fluid content">
      <Header />

      <main className="rounded" ame="page-content" id="page-content">
        <Content />
      </main>

      <Footer />
    </div>
  );
}

export default App;