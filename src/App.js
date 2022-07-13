import React, {useEffect, useState} from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import ProductList from "./components/ProductList"
import Login from "./components/Login"
// import Signup from './components/Signup'
import AddProduct from './components/AddProduct'
import './App.css';
import Register from './components/Register'
import AuthService from './services/auth.service'
import DetailProduct from './components/DetailProduct'

function App() {

  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <nav className='login'>
        <ul>
          {currentUser ? (
            <div className="">
              <li className="">
                <Link to={"/product"} className="">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/register"} className="">
                  Sign Up
                </Link>
              </li>
            </div>
          )}

          {/* <li><Link to={"/login"} className="">Login</Link></li>
          <li><Link to={"/register"} className="">Sign Up</Link></li> */}
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
          <Route path='/register' element={<Register/>} />
          <Route path='/add' element={<AddProduct/>} />
          <Route path='/product/:id' element={<DetailProduct/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
