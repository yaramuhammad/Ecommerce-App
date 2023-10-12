import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../Contexts/AuthContext';

export default function ResetPassword() {
    const navigate = useNavigate();
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [loading, setLoading] = useState(false)
    const { email } = useContext(authContext)


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


    async function resetPassword(values) {
        setLoading(true);
        await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
            {
                email: email,
                newPassword: values.password
            })
            .then(function (response) {
                if (response.status == 200) {
                    setSuccess('Password Reset Successfully');
                    setLoading(false);
                    setTimeout(() => {
                        navigate('/login');
                    }, 1000);
                }
            })
            .catch(function (error) {
                setError(error.response.data.message);
                setLoading(false);
            })
    }

    const formik = useFormik({
        initialValues: {
            password: '',
            rePassword: '',
        },
        validate: values => {
            setError(null);
            const errors = {};
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
            return errors;
        },
        onSubmit: resetPassword
    });


    return (
        <>
            {error ? toast.error(error) : null}
            {success ? toast.success(success) : null}
            <div className="w-100 min-vh-100 shadow rounded position-fixed top-0 d-flex">
                <div className="panel-sign-up d-flex justify-content-center align-items-center text-center flex-col flex-column flex-wrap align-center position-absolute top-0 start-50 w-50 h-100 px-5 bg-primary">
                    <h2 className="mb-3 fw-bold text-white">Reset Your Password</h2>
                </div>

                <div className="form-container signin-container d-flex justify-content-center align-items-center text-center flex-column position-absolute top-0 start-0 w-50 h-100 px-5 bg-white">
                    <h2 className="mb-3 fw-bold ">Reset Password</h2>

                    <form onSubmit={formik.handleSubmit} id='emailForm'>
                        <input type="password" placeholder='Enter Your Password' name='password' id='password' value={formik.values.password} onChange={formik.handleChange} />
                        {formik.touched.password && formik.errors.password ? (<span className='text-danger py-2'>{formik.errors.password}</span>) : null}

                        <input type="password" placeholder='Enter Your Password' name='rePassword' id='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} />
                        {formik.touched.rePassword && formik.errors.rePassword ? (<span className='text-danger py-2'>{formik.errors.rePassword}</span>) : null}

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
                                : 'Reset Password'}
                        </button>
                    </form>
                </div>

            </div>
        </>
    )
}
