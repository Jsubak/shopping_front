import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import ProductList from "./components/ProductList"
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div>
      <nav className=''>
        <ul>
          <li>asd</li>
          <li>adsad</li>
        </ul>
      </nav>
      <div className='container'>
        <Routes>
          <Route path='/' element={<ProductList/>} />
          <Route path='/product' element={<ProductList/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
