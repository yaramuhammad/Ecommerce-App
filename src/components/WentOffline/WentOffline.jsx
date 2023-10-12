import React from 'react'

export default function WentOffline() {
    return (
        <div className='d-flex justify-content-center align-items-center flex-column w-100 min-vh-100'>
            <div className='text-primary'>
                <h1>Oops.. You Went Offline!</h1>
            </div>
            <div>
                <img src={require('./images/WhatsApp Image 2023-10-11 at 15.24.14_083d5999.jpg')} className='w-100' alt="" />
            </div>
            <div>
                <button className='btn btn-primary m-5'>Try Again </button>
            </div>
        </div>
    )
}
