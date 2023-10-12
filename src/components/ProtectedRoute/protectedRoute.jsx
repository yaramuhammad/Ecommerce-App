import React, { useContext } from 'react'
import { authContext } from '../../Contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { Token } = useContext(authContext);

  return (
    <>
      {Token ? children :
        <div className='d-flex justify-content-center container'>
          <div className='d-flex flex-column justify-content-center w-50 text-center text-primary'>
            <h1>You are not authorized to access this route</h1>
            <Link to={'/login'} className='btn btn-primary text-white w-25 align-self-center'>Log In </Link>
          </div>
          <div className='w-50'>
            <img src={require('./images/WhatsApp Image 2023-10-11 at 15.24.14_7b1059d3.jpg')} className='w-100' alt="" />
          </div>
        </div>
      }
    </>
  )
}
