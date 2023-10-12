import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { RotatingLines, ThreeDots } from 'react-loader-spinner'


export default function Address() {


    const [addresses, setAddresses] = useState(null)
    const [loading, setLoading] = useState(false)

    const addAddress =
        <form id='addForm'>
            <div className="row">
                <hr className='mt-3' />
                <div className="col-md-12">
                    <h5 className='py-2'>Add Address</h5>
                    <div>
                        <label htmlFor="details">Address</label>
                        <input id="details" className="form-control mt-2 mb-3" placeholder="building no. street, district" type="text" />
                    </div>

                </div>
                <div className="col-4">
                    <div>
                        <label htmlFor="city">City</label>
                        <input type="text" id="city" className="form-control mt-2 mb-3" placeholder="City" />
                    </div>
                </div>
                <div className="col-4">
                    <div>
                        <label htmlFor="phone">Phone</label>
                        <input type="tel" id="phone" className="form-control mt-2 mb-3" placeholder="Phone" />
                    </div>
                </div>
                <div className="col-4">
                    <div>
                        <label htmlFor="name">Address Label</label>
                        <input type="text" id="name" className="form-control mt-2 mb-3" placeholder="eg:Home/Work" />
                    </div>
                </div>
                <div className='text-end py-3'>
                    <button className='btn btn-primary' type='button' onClick={addNewAddress}>
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
                                'Save'
                        }
                    </button>
                </div>
            </div>
        </form>

    function showAddPanel() {
        document.querySelector('.addPanel').classList.toggle('d-none')
    }
    function addNewAddress() {
        setLoading(true)
        axios.post('https://ecommerce.routemisr.com/api/v1/addresses', {
            details: document.getElementById('details').value,
            city: document.getElementById('city').value,
            phone: document.getElementById('phone').value,
            name: document.getElementById('name').value,
        }, {
            headers: {
                token: localStorage.getItem('token')
            }
        }).then(res => {
            if (res.data.status == 'success') {
                getAddresses()
                toast.success('Address added successfully')
                document.getElementById('addForm').reset()
                document.querySelector('.addPanel').classList.add('d-none')
                setLoading(false)
            }
        })
            .catch(err => {
                console.log(err);
                setLoading(false)
                toast.error('Something went wrong')
            })
    }
    function deleteAddress(id) {
        axios.delete(`https://ecommerce.routemisr.com/api/v1/addresses/${id}`, {
            headers: {
                token: localStorage.getItem('token')
            }
        }).then(res => {
            if (res.data.status == 'success') {
                getAddresses()
                toast.success('Address deleted successfully')
            }
        })
            .catch(err => { console.log(err) })

    }

    useEffect(() => {
        getAddresses()
    }, [])
    function getAddresses() {
        axios.get('https://ecommerce.routemisr.com/api/v1/addresses', {
            headers: {
                token: localStorage.getItem('token')
            }
        }).then(res => {
            setAddresses(res.data.data)
            console.log(res.data.data)
        })
            .catch(err => { console.log(err) })
    }
    return (
        <div>
            <div className='d-flex justify-content-between align-items-center'>
                <h6 className=" text-muted">Addresses</h6>
                {
                    addresses && addresses.length > 0 ?
                        <button className='btn btn-primary' type='button' onClick={showAddPanel}> Add</button> : ''
                }
            </div>

            {addresses ? (addresses.length == 0 ? addAddress :
                <>
                    <div className='addPanel d-none'>{addAddress}</div>
                    {
                        addresses.map((address, idx) => {
                            return <div className="row" key={idx}>
                                <hr className='mt-3' />
                                <div className="col-md-12">
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div>
                                            <label htmlFor="input-address">Address</label>
                                            <input disabled id="input-address" className="w-100 form-control mt-2 mb-3" type="text" value={address.details} />
                                        </div>
                                        <div>
                                            <button className='btn text-danger' onClick={() => { deleteAddress(address._id) }} type='button'>
                                                <i className='fa fa-trash'></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-4">
                                    <div>
                                        <label htmlFor="input-city">City</label>
                                        <input disabled type="text" id="input-city" className="form-control mt-2 mb-3" value={address.city} />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div>
                                        <label htmlFor="country">Phone</label>
                                        <input disabled type="text" id="country" className="form-control mt-2 mb-3" value={address.phone} />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div>
                                        <label htmlFor="input-country">Address Label</label>
                                        <input disabled type="text" id="input-postal-code" className="form-control mt-2 mb-3" placeholder="Postal code" value={address.name} />
                                    </div>
                                </div>

                            </div>


                        }
                        )
                    }
                </>

            ) :
                <div className='d-flex justify-content-center align-items-center'>
                    <RotatingLines
                        strokeColor="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="96"
                        visible={true}
                    />
                </div>
            }
        </div>
    )
}
