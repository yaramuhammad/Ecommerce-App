import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../Contexts/AuthContext';

export default function ForgotPassword() {

    const navigate = useNavigate();
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [loading, setLoading] = useState(false)
    const { setEmail } = useContext(authContext)

    function setNavColors() {
        let links = document.querySelectorAll('.toggle-white-login');
        links.forEach(link => {
            link.classList.add('text-white');
            link.classList.remove('text-body');
        });


        let linkss = document.querySelectorAll('.toggle-white-register');
        linkss.forEach(link => {
            link.classList.add('text-body');
            link.classList.remove('text-white');
        });
    }

    useEffect(() => {

        document.querySelector('.cart').classList.add('d-none');
        let hidden = document.querySelectorAll('.hide-on-toggle')
        hidden.forEach(link => {
            link.classList.add('d-none')
        })
        setNavColors();

    }, [])

    async function sendEmail(values) {
        setLoading(true);
        await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values)
            .then(function (response) {
                if (response.status == 200) {
                    setSuccess('Email Sent Successfully');
                    setError(null);
                    setLoading(false);
                    setTimeout(() => {
                        setSuccess(null);
                    }, 1000);

                    document.getElementById('emailForm').classList.add('d-none');
                    document.getElementById('resetForm').classList.remove('d-none');
                }
            }).catch(function (error) {
                setError(error.response.data.message);
                setLoading(false);
            })
    }
    async function verifyResetCode(values) {
        setLoading(true);
        await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values)
            .then(function (response) {
                if (response.status == 200) {
                    setSuccess('Code Verified Successfully');
                    setLoading(false);
                    setEmail(formik.values.email)
                    setTimeout(() => {
                        navigate('/resetPassword');
                    }, 1000);
                }
            })
            .catch(function (error) {
                setError(error.response.data.message);
                setLoading(false);
            })
    }

    const resetFormik = useFormik({
        initialValues: {
            resetCode: '',
        },
        validate: values => {
            setError(null);
            const errors = {};
            if (!values.resetCode) {
                errors.resetCode = 'This Field is Required';
            }
            return errors;
        },
        onSubmit: verifyResetCode,
    })
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate: values => {
            setError(null);
            const errors = {};
            if (!values.email) {
                errors.email = 'This Field is Required';
            } else if (!/\S+@\S+\.\S+/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            return errors;
        },
        onSubmit: sendEmail,
    })
    return (
        <>
            {error ? toast.error(error) : null}
            {success ? toast.success(success) : null}
            <div className="w-100 min-vh-100 shadow rounded position-fixed top-0 d-flex">
                <div className="panel-sign-up d-flex justify-content-center align-items-center text-center flex-col flex-column flex-wrap align-center position-absolute top-0 start-50 w-50 h-100 px-5 bg-primary">
                    <h2 className="mb-3 fw-bold text-white">Forgot Your Password?</h2>
                    <p className="mt-2 text-white">Enter your email and wait for your confirmation code</p>
                </div>

                <div className="form-container signin-container d-flex justify-content-center align-items-center text-center flex-column position-absolute top-0 start-0 w-50 h-100 px-5 bg-white">
                    <h2 className="mb-3 fw-bold ">Reset Password</h2>

                    <form onSubmit={formik.handleSubmit} id='emailForm'>
                        <input type="email" name="email" placeholder="Email" onChange={formik.handleChange} value={formik.values.email} id='email' />
                        {formik.touched.email && formik.errors.email ? (<span className='text-danger py-2'>{formik.errors.email}</span>) : null}
                        <br />

                        <button type="submit" className="mt-2 px-5 py-2 rounded-pill outline-none btn btn-primary">
                            {loading ?
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
                                : 'Send Link'}
                        </button>
                    </form>
                    <form onSubmit={resetFormik.handleSubmit} id='resetForm' className='d-none'>
                        <input type="email" name="email" placeholder="Email" onChange={formik.handleChange} value={formik.values.email} id='email' disabled />
                        <input type="text" name="resetCode" placeholder="Enter your reset code" onChange={resetFormik.handleChange} value={resetFormik.values.resetCode} id='email' />
                        {resetFormik.touched.resetCode && resetFormik.errors.resetCode ? (<span className='text-danger py-2'>{resetFormik.errors.resetCode}</span>) : null}

                        <br />
                        <button type="submit" className="mt-2 px-5 py-2 rounded-pill outline-none btn btn-primary">
                            {loading ?
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
                                : 'Submit'}
                        </button>
                    </form>
                </div>

            </div>
        </>
    )
}
