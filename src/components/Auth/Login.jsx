import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner';
import { Link, useNavigate, } from 'react-router-dom';
import { authContext } from '../../Contexts/AuthContext';
import toast from 'react-hot-toast';



export default function Login() {

  const [signInError, setSignInError] = useState(null)
  const [signInSuccess, setSignInSuccess] = useState(null)
  const [signInLoading, setSignInLoading] = useState(false)
  const { setToken, setEmail } = useContext(authContext);
  const navigate = useNavigate();

  async function signIn(values) {
    setSignInLoading(true);
    const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
      .catch(function (error) {
        setSignInError(error.response.data.message);
        setSignInLoading(false);
      })
    if (data.message == 'success') {
      setToken(data.token);
      localStorage.setItem('token', data.token);
      setSignInSuccess('Welcome Back');
      setSignInError(null);
      setEmail(values.email);
      localStorage.setItem('email', values.email);
      setTimeout(() => {
        navigate('/')
        window.location.reload();
      }, 1000);

    }
    setSignInLoading(false);
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate: values => {
      setSignInError(null);
      const errors = {};
      if (!values.password) {
        errors.password = 'This Field is Required';
      } else if (values.password.length < 8) {
        errors.password = 'Password Must be 8 characters or more';
      }
      if (!values.email) {
        errors.email = 'This Field is Required';
      } else if (!/\S+@\S+\.\S+/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      return errors;
    },
    onSubmit: signIn,
  })


  return (
    <>
      {signInError ? toast.error(signInError) : null}
      {signInSuccess ? toast.success(signInSuccess) : null}

      <div className="form-container signin-container d-flex justify-content-center align-items-center text-center flex-column flex-wrap position-absolute top-0 start-0 w-50 h-100 px-5 bg-white">
        <h2 className="mb-3 fw-bold ">Sign in</h2>
        <div className="social-container d-flex justify-content-center align-items-center text-center">
          <a href="#" className='d-flex justify-content-center align-items-center rounded-circle bg-transparent text-decoration-none mx-2 text-dark border border-dark'><i className="fab fa-google"></i></a>
          <a href="#" className='d-flex justify-content-center align-items-center rounded-circle bg-transparent text-decoration-none mx-2 text-dark border border-dark'><i className="fab fa-facebook"></i></a>
          <a href="#" className='d-flex justify-content-center align-items-center rounded-circle bg-transparent text-decoration-none mx-2 text-dark border border-dark'><i className="fab fa-linkedin-in"></i></a>
        </div>
        <span className="mt-3 ">or use your account</span>
        <form onSubmit={formik.handleSubmit}>
          <input type="email" name="email" placeholder="Email" onChange={formik.handleChange} value={formik.values.email} id='email' />
          {formik.touched.email && formik.errors.email ? (<span className='text-danger py-2'>{formik.errors.email}</span>) : null}
          <input type="password" name="password" placeholder="Password" id='password' onChange={formik.handleChange} value={formik.values.password} />
          {formik.touched.password && formik.errors.password ? (<span className='text-danger py-2'>{formik.errors.password}</span>) : null}
          <br />
          <button type="submit" className="mt-2 px-5 py-2 rounded-pill outline-none btn btn-primary mt-2 px-5 py-2 rounded-pill outline-none">
            {signInLoading ?
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
              : 'Login'}
          </button>
        </form>
        <Link to='/forgot-password' className="mt-2">Forgot your password?</Link>

      </div>
    </>
  )
}
