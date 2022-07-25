import React, {useEffect, useState} from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import ProductList from "./components/ProductList"
import Login from "./components/Login"
// import Signup from './components/Signup'
import AddProduct from './components/AddProduct'
import './App.css';
import Register from './components/Register'
import AuthService from './services/auth.service'
import DetailProduct from './components/DetailProduct'
import Order from './components/Order'
import Mypage from './components/Mypage'
import MypageOne from './components/MypageOne'

function App() {

  const [currentUser, setCurrentUser] = useState();

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
            <div className="login-box">
              <li className="">
                <Link to={"/user"} className="">
                  {currentUser.username}님
                </Link>
              </li>
              <li className='middleline'>|</li>
              <li className="nav-item">
                <a href="/product" className="" onClick={logOut}>
                  로그아웃
                </a>
              </li>
            </div>
          ) : (
            <div className="login-box">
              <li className="nav-item">
                <Link to={"/login"} className="">
                  로그인
                </Link>
              </li>
              <li className='middleline'>|</li>
              <li className="nav-item">
                <Link to={"/register"} className="">
                  회원가입
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
          <li><Link to={"/product"}>상품목록</Link></li>
        </ul>
      </nav>
      <div className='container'>
        <Routes>
          <Route path='/' element={<ProductList/>} />
          <Route path='/product' element={<ProductList/>} />
          <Route path='/login' component={setCurrentUser} element={<Login/>}/>
          <Route path='/register' element={<Register/>} />
          <Route path='/add' element={<AddProduct/>} />
          <Route path='/product/:id' element={<DetailProduct/>} />
          <Route path='/orders' element={AuthService.getCurrentUser() ? <Order/> : <Navigate to="/login" />}/>
          <Route path='/user' element={<Mypage /> } />
          <Route path='/orderinfo' element={<MypageOne />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
