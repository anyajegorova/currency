import React from 'react';
import './App.css';
import { RateTable } from './components/RateTable';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CurrencyConverter from './views/CurrencyConverter';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<RateTable />} />
          <Route path="/converter" element={<CurrencyConverter />} />
        </Routes>
      </Router>
    </>

  )
}

export default App
