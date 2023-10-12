import React, { useContext } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/footer'
import { Link, Outlet } from 'react-router-dom'
import { cartContext } from '../../Contexts/CartContext';

export default function Layout() {
  const { numOfItems } = useContext(cartContext)
  return (
    <>
      <Navbar />
      <Outlet />
      <div className='position-fixed bottom-0 end-0 pb-5 pe-5 cart'>
        <div className='pb-4 pe-5'>
          <div className='pe-5'>
            <Link to='/cart'>
              <div style={{ width: '60px', height: '60px' }} className='position-relative bg-primary d-flex justify-content-center align-items-center rounded-circle'>
                <div>
                  <i className='fa fa-shopping-cart text-white fa-2x'></i>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger mt-1 ">
                    {numOfItems}
                    <span className="visually-hidden">cart items</span>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>

      </div>
      <Footer />
    </>
  )
}
