import React from 'react';
import Header from './components/header';
import Footer from './components/footer';
import UserContent from './components/user-content';


function App() {
  return (
    <div class="wrapper container-fluid content">
      <Header />

      <main class="rounded" ame="page-content" id="page-content">
        <UserContent />
      </main>

      <Footer />
    </div>
  );
}

export default App;