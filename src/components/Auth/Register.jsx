import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { ThreeDots } from 'react-loader-spinner';
import toast from 'react-hot-toast';

export default function Register({ toggle }) {
  const [signUpError, setSignUpError] = useState(null)
  const [signUpSuccess, setSignUpSuccess] = useState(null)
  const [signUpLoading, setSignUpLoading] = useState(false)



  async function signUp(values) {
    setSignUpLoading(true);
    const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
      .catch(function (error) {
        setSignUpError(error.response.data.message);
        setSignUpLoading(false);
        console.log(error);
      })
    if (data.message === 'success') {
      setSignUpSuccess('Registered Successfully');
      setSignUpError(null);
      setTimeout(() => {
        document.getElementById('container').classList.remove('change')
        toggle();
        console.log(document.getElementById('container'));
      }, 1000);

    }
    setSignUpLoading(false);
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    validate: values => {
      setSignUpError(null);
      const errors = {};
      if (!values.name) {
        errors.name = 'This Field is Required';
      }
      else if (values.name.length > 15) {
        errors.name = 'Must be 15 characters or less';
      }
      if (!values.password) {
        errors.password = 'This Field is Required';
      } else if (values.password.length < 8) {
        errors.password = 'Password Must be 8 characters or more';
      }
      if (!values.rePassword) {
        errors.rePassword = 'This Field is Required';
      } else if (values.rePassword !== values.password) {
        errors.rePassword = 'Passwords must match';
      }
      if (!values.phone) {
        errors.phone = 'This Field is Required';
      } else if (!/^[0-9]{11}$/i.test(values.phone)) {
        errors.phone = 'Invalid phone number, must be 11 digits';
      }
      if (!values.email) {
        errors.email = 'This Field is Required';
      } else if (!/\S+@\S+\.\S+/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      return errors;
    },
    onSubmit: signUp,
  })

  return (
    <>
      {signUpError ? toast.error(signUpError, { position: 'bottom-right' }) : null}
      {signUpSuccess ? toast.success(signUpSuccess, { position: 'bottom-right' }) : null}


      <div className="form-container signup-container d-flex justify-content-center align-items-center text-center flex-col flex-column flex-wrap position-absolute top-0 start-0 w-50 h-100 px-5 bg-white">
        <h2 className="mb-3 fw-bold ">Create Account</h2>
        <div className="social-container d-flex justify-content-center align-items-center text-center">
          <a style={{ cursor: 'pointer' }} className='d-flex justify-content-center align-items-center rounded-circle bg-transparent text-decoration-none mx-2 text-dark border border-dark'><i className="fab fa-google"></i></a>
          <a style={{ cursor: 'pointer' }} className='d-flex justify-content-center align-items-center rounded-circle bg-transparent text-decoration-none mx-2 text-dark border border-dark'><i className="fab fa-facebook"></i></a>
          <a style={{ cursor: 'pointer' }} className='d-flex justify-content-center align-items-center rounded-circle bg-transparent text-decoration-none mx-2 text-dark border border-dark'><i className="fab fa-linkedin-in"></i></a>
        </div>
        <span className="mt-3 ">
          or use your email for registration
        </span>
        <form onSubmit={formik.handleSubmit}>
          <input type="text" name="name" placeholder="Name" onChange={formik.handleChange} value={formik.values.name} id='name' />
          {formik.touched.name && formik.errors.name ? (<span className='text-danger py-2'>{formik.errors.name}</span>) : null}

          <input type="email" name="email" placeholder="Email" onChange={formik.handleChange} value={formik.values.email} id='email' />
          {formik.touched.email && formik.errors.email ? (<span className='text-danger py-2'>{formik.errors.email}</span>) : null}

          <input type="password" name="password" placeholder="Password" id='password' onChange={formik.handleChange} value={formik.values.password} />
          {formik.touched.password && formik.errors.password ? (<span className='text-danger py-2'>{formik.errors.password}</span>) : null}

          <input onChange={formik.handleChange} value={formik.values.rePassword} type="password" name="rePassword" id="rePassword" placeholder="Re-Enter Your Password" />
          {formik.touched.rePassword && formik.errors.rePassword ? (<div className='text-danger py-2'>{formik.errors.rePassword}</div>) : null}

          <input onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" id="phone" placeholder='Phone' />
          {formik.touched.phone && formik.errors.phone ? (<div className='text-danger py-2'>{formik.errors.phone}</div>) : null}
          <button type="submit" className="mt-2 px-5 py-2 rounded-pill outline-none btn btn-primary">
            {signUpLoading ?
              <ThreeDots
                height="30"
                width="50"
                radius="3"
                color="#fff"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
              : 'Register'}
          </button>
        </form>
      </div>
    </>
  )
}
