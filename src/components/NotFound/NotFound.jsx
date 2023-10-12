import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className='d-flex py-5 align-items-center flex-column w-100 min-vh-100'>
            <div className='text-primary pt-5'>
                <h1>Not Found!</h1>
            </div>
            <div className='text-center'>
                <img src={require('./Images/WhatsApp Image 2023-10-11 at 15.24.15_e4f9f489.jpg')} className='w-50' alt="" />
            </div>
            <div>
                <Link to={'/'} className='btn btn-primary m-5 text-white'>Go Home </Link>
            </div>
        </div>
    )
}
