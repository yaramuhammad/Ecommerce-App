import axios from 'axios'
import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import { RotatingLines } from 'react-loader-spinner'

export default function Orders() {

    const [orders, setOrders] = useState(null)
    const [userID, setUserID] = useState(null)

    useEffect(() => {
        const id = jwtDecode(localStorage.getItem('token')).id
        setUserID(id)
    }, [])

    useEffect(() => {
        if (userID) {
            axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userID}`, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(res => setOrders(res.data))
                .catch(err => console.log(err))
        }
    }, [userID])




    if (orders === null) {
        return <div className='d-flex justify-content-center align-items-center min-vh-100'>
            <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
            />
        </div>
    }

    return (
        orders.length > 0 ?
            <>
                <div className="accordion container py-5 min-vh-50" id="accordionExample">

                    {
                        orders.map((order, idx) => {
                            console.log(order);
                            return <div key={idx} >
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#order-${idx}`} aria-expanded="false" aria-controls={`order-${idx}`}>
                                            <div className='row'>
                                                <div className='col-8'>
                                                    Order {idx + 1} - {Date(order.createdAt).slice(0, 15)}

                                                </div>
                                                <div className='col-4'>
                                                    {order.isPaid ? <div className='bg-success text-white rounded-pill px-2 py-1 text-center'> Paid</div> : <div className='bg-danger text-white rounded-pill px-2 py-1 text-center'> Not Paid</div>}
                                                </div>
                                            </div>
                                        </button>
                                    </h2>
                                    <div id={`order-${idx}`} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <div className='row'>
                                                {order.cartItems.map(
                                                    function (item, idx) {
                                                        return <div className='col-6' key={idx}>
                                                            <div className='row'>
                                                                <div className='col-1'>
                                                                    <img src={item.product.imageCover} alt="" className='w-100' />
                                                                </div>
                                                                <div className='col-5'>
                                                                    <h5>{item.product.title.split(' ').splice(0, 2).join(' ')}</h5>
                                                                    <h6 className='text-primary'>Price: {item.price}</h6>
                                                                    <h6 className='text-primary'>Quantity: {item.count}</h6>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>

            </>
            : <div className='d-flex justify-content-center align-items-center min-vh-100'>
                <h5 className='text-primary'>You Have Not Made Any Orders Yet</h5>
            </div>
    )
}


