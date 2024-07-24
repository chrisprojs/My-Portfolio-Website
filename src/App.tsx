import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import Navbar from './navbar/Navbar';
import Home from './pages/home/Home';
import CV from './pages/cv/CV';
import Portfolio from './pages/portfolio/Portfolio';
import Contact from './pages/contact/Contact';
import Footer from './footer/Footer';

function App() {
  return (
    <Router>
      <div>
      <Navbar/>
      <div className='page-container'>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/cv" element={<CV/>} />
        <Route path="/portfolio" element={<Portfolio/>} />
        <Route path="/contact" element={<Contact/>} />
      </Routes>
      </div>
      <Footer/>
    </div>
    </Router>
  );
}

export default App;
