import React from 'react';
import Header from './components/header';
import Footer from './components/footer';
import Content from './components/content';


function App() {
  return (
    <div class="wrapper container-fluid content">
      <Header />

      <main class="rounded" ame="page-content" id="page-content">
        <Content />
      </main>

      <Footer />
    </div>
  );
}

export default App;