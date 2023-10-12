import React from 'react'
import toast from 'react-hot-toast'

export default function Footer() {
  function toaster() {
    if (document.getElementById('newsletter').value === '') {
      toast.error('Please enter your email')
    }
    else {
      toast.success('You have subscribed successfully')
    }
  }

  return (
    <div className='py-5 mt-5' style={{ background: '#eee' }}>
      <div className="container">
        <div className='row'>
          <div className='col-3'>
            <div className='p-4'>
              <div className="d-flex align-items-center">
                <img src={require('../../Assets/images/download-removebg-preview.jpg')} alt="logo" width='50' />
                <h1 style={{ color: 'blue' }}>Fresh Cart</h1>
              </div>
              <div className='d-flex'>
                <span className='me-3 rounded-circle d-flex justify-content-center align-items-center border border-dark' style={{ width: '40px', height: '40px' }}>
                  <i className='fab fa-facebook-f'></i>
                </span>
                <span className='me-3 rounded-circle d-flex justify-content-center align-items-center border border-dark' style={{ width: '40px', height: '40px' }}>
                  <i className='fab fa-youtube'></i>
                </span>
                <span className='me-3 rounded-circle d-flex justify-content-center align-items-center border border-dark' style={{ width: '40px', height: '40px' }}>
                  <i className='fab fa-linkedin'></i>
                </span>
                <span className='me-3 rounded-circle d-flex justify-content-center align-items-center border border-dark' style={{ width: '40px', height: '40px' }}>
                  <i className='fab fa-twitter'></i>
                </span>
              </div>
            </div>
          </div>
          <div className='col-4'>
            <div className='pe-2'>
              <h3 className='pb-4'>Contact Us</h3>
              <p><i className='pe-2 fa fa-envelope'></i> brand@mail.com</p>
              <p><i className='pe-2 fa fa-phone'></i> (614) 991-5797</p>
              <p><i className='pe-2 fa fa-location-pin'></i>    3395 McDowell Rd, Grove City, United States </p>
            </div>
          </div>
          <div className='col-5'>
            <div className='px-4'>
              <h3 className='pb-4'>Subscribe to our newsletter</h3>
              <form className='d-flex'>
                <input type="email" name="email" id="newsletter" placeholder='Enter Your Email' className='form-control me-2' />
                <button className='btn btn-primary' type='reset' onClick={toaster}>Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
