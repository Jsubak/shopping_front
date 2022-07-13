import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import ProductList from "./components/ProductList"
import Login from "./components/Login"
import Signup from './components/Signup'
import AddProduct from './components/AddProduct'
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div>
      <nav className='login'>
        <ul>
          <li><Link to={"/login"}>로그인 | </Link></li>
          <li><Link to={"/signup"}>회원가입</Link></li>
        </ul>
      </nav>
      <nav className='menu'>
        <ul>
          <li><Link to={"/add"}>상품등록</Link></li>
        </ul>
      </nav>
      <div className='container'>
        <Routes>
          <Route path='/' element={<ProductList/>} />
          <Route path='/product' element={<ProductList/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/add' element={<AddProduct/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
