import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Address from '../Address/Address'
import jwtDecode from 'jwt-decode'
import { authContext } from '../../Contexts/AuthContext'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'
export default function Profile() {

    const [name, setName] = useState('')
    const { email, phone } = useContext(authContext)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setName(jwtDecode(localStorage.getItem('token')).name)
    }
        , [])


    const formik = useFormik({
        initialValues: {
            name: name,
            phone: phone,
            email: email
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            setLoading(true)
            axios.put('https://ecommerce.routemisr.com/api/v1/users/updateMe', values, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(res => {
                    console.log(res)
                    if (res.status === 200) {
                        setLoading(false)
                        toast.success(res.data.message)
                        document.querySelectorAll('.info-form .editable').forEach(input => {
                            input.setAttribute('readOnly', true)
                        })
                        document.getElementById('saveBtn').classList.add('d-none')
                        document.getElementById('changePassBtn').classList.add('d-none')
                        localStorage.setItem('phone', values.phone)
                        localStorage.setItem('email', values.email)
                    }
                })
                .catch(err => {
                    console.log(err)
                    setLoading(false)
                    toast.error(err.response ? err.response.data.errors.msg : 'Something went wrong')
                })
        }
    })

    function editInfo() {
        document.querySelectorAll('.info-form .editable').forEach(input => {
            input.removeAttribute('readOnly')
        })
        document.getElementById('saveBtn').classList.remove('d-none')
        document.getElementById('changePassBtn').classList.remove('d-none')
    }



    return (
        <>
            <div className="main-content">

                <div className="container py-5">
                    <div className="row">

                        <div className="col-8 card shadow">
                            <div className="card-header bg-white border-0 d-flex justify-content-between pt-4 pb-2">
                                <h3 className="mb-0">My account</h3>
                                <button className='btn btn-primary' onClick={editInfo}> Edit</button>
                            </div>
                            <hr />

                            <div className="card-body">

                                <form className='info-form' onSubmit={formik.handleSubmit}>
                                    <h6 className="text-muted mb-4">User information</h6>
                                    <div className="row">
                                        <div className="col-6">
                                            <div>
                                                <label htmlFor="input-first-name">Name</label>
                                                <input type="text" id="input-first-name" className="form-control mt-2 mb-3" readOnly onChange={formik.handleChange} value={formik.values.name} name='name' />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div>
                                                <label htmlFor="input-last-name">Phone</label>
                                                <input type="text" id="input-last-name" className="form-control mt-2 mb-3 editable" readOnly onChange={formik.handleChange} value={formik.values.phone} name='phone' />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div>
                                                <label htmlFor="input-email">Email address</label>
                                                <input type="email" id="input-email" className="form-control mt-2 mb-3 editable" readOnly onChange={formik.handleChange} value={formik.values.email} name='email' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <Link className='btn btn-danger d-none text-white' to='/change-password' id='changePassBtn'>Change Password</Link>
                                        <button className='btn btn-primary d-none' type='submit' id='saveBtn'>
                                            {
                                                loading ?
                                                    <ThreeDots
                                                        height="10"
                                                        width="100"
                                                        radius="3"
                                                        color="#fff"
                                                        ariaLabel="three-dots-loading"
                                                        wrapperStyle={{}}
                                                        wrapperClassName=""
                                                        visible={true}
                                                    />
                                                    :
                                                    'Save changes'
                                            }
                                        </button>
                                    </div>
                                    <hr className="my-4" />
                                </form>


                                <Address />

                            </div>
                        </div>

                        <div className="col-4">
                            <div className="shadow">
                                <div className="text-center py-3">
                                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" className="rounded-circle w-50" alt='profile' />
                                </div>
                                <hr />
                                <div className="text-center py-3">
                                    <h3>
                                        {name}
                                    </h3>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
