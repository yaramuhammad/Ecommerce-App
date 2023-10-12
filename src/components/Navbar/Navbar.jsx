import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../../Contexts/AuthContext';

export default function Navbar() {
  const { Token, setToken,setEmail,setPhone } = useContext(authContext);
  const navigate = useNavigate();

  function Logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('phone');
    setToken(null);
    setEmail(null);
    setPhone(null);
    navigate('/login');
    window.location.reload();
  }
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light bg-transparnet">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center bg-white px-3 rounded-pill" to="/">
            <img src={require('../../Assets/images/download.png')} alt="logo" width='50'/>
            <h1 style={{color:'blue'}}>Fresh Cart</h1>
          </Link>
          <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">

              <li className="nav-item" style={{marginLeft:'-320px'}}>
                <Link className="nav-link active ps-5 toggle-white-register" to="/" aria-current="page"> Home <span className="visually-hidden">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link toggle-white-register" to="/products">Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link toggle-white-login" to="/categories">Categories</Link>
              </li>
              <li className="nav-item ">
                <Link className="nav-link toggle-white-login" to="/brands">Brands</Link>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">

              {Token ?
                <>
                  <li className="nav-item dropdown">
                    <span className="nav-link dropdown-toggle text-primary" id="dropdownId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{cursor:'pointer'}}>
                      <i className='fa fa-user'></i>
                    </span>
                    <div className="dropdown-menu" aria-labelledby="dropdownId">
                      <Link className="dropdown-item" to="/profile">Profile</Link>
                      <Link className="dropdown-item" to="/orders">My Orders</Link>
                      <Link className="dropdown-item" to="/wishlist">My Wishlist</Link>
                      <span className="dropdown-item" onClick={Logout} style={{ cursor: 'pointer' }}>Logout</span>
                    </div>
                  </li>
                </>
                :
                <>
                  <li className="nav-item">
                    <Link className="nav-link bg-primary text-white mx-2 rounded-pill py-2 px-3 hide-on-toggle" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link bg-primary text-white mx-2 rounded-pill py-2 px-3 hide-on-toggle" to="/register">Register</Link>
                  </li>
                </>
              }

            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
