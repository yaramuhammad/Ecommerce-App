import React, { useContext } from 'react'
import { cartContext } from '../../Contexts/CartContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { authContext } from '../../Contexts/AuthContext'

export default function Checkout() {

    const { cartID, getCart } = useContext(cartContext)
    const { setPhone } = useContext(authContext)
    let navigator = useNavigate()

    async function checkout() {

        let method = document.querySelector('input[name="method"]:checked').id

        let phone = document.querySelector('#phone').value;
        let city = document.querySelector('#city').value;
        let details = document.querySelector('#details').value;
        let shippingAddress = {
            shippingAddress: {
                phone: phone,
                city: city,
                details: details
            }
        }
        setPhone(phone)
        localStorage.setItem('phone', phone)

        if (method === 'cash') {
            try {
                const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartID}`, { shippingAddress }, {
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                getCart();
                if (data.status === 'success') {
                    toast.success('Order created successfully')
                    navigator('/orders')
                }

            }
            catch (error) {
                console.log(error)
                toast.error('Something went wrong')
            }
        }
        if (method === 'credit') {
            try {
                const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=${window.location.href}`, {
                    shippingAddress: {
                        phone: phone,
                        city: city,
                        details: details

                    }
                }, {
                    headers: {
                        token: localStorage.getItem('token'),
                    },


                })

                if (data.status === 'success') {
                    getCart();
                    window.open(data.session.url, '_blank')
                    navigator('/orders')
                }
                console.log(data)

            }
            catch (error) {
                console.log(error)
                toast.error('Something went wrong')
            }
        }

    }



    return (
        <>
            <div className="mb-3 container py-5">
                <h1>Checkout</h1>

                <label htmlFor="" className="form-label mt-3">Phone</label>
                <input type="email" className="form-control my-2" name="" id="phone" />

                <label htmlFor="" className="form-label mt-3">City</label>
                <input type="email" className="form-control my-2" name="" id="city" />

                <label htmlFor="" className="form-label mt-3">Address Details</label>
                <textarea className="form-control my-2" name="" id="details" rows="3"></textarea>

                <label htmlFor="" className="form-label mt-3">Choose Your Payment Method</label>
                <div className='d-flex mt-3'>

                    <div class="form-check d-flex align-items-center me-5">
                        <input class="form-check-input me-2" type="radio" name="method" id="cash" />
                        <label class="form-check-label" for="cash">
                            <div className='border p-3'>
                                <h5>Cash</h5>
                                <p>Pay when you receive your order</p>

                            </div>
                        </label>
                    </div>

                    <div class="form-check d-flex align-items-center">
                        <input class="form-check-input me-2" type="radio" name="method" id="credit" />
                        <label class="form-check-label" for="credit">
                            <div className='border p-3'>
                                <h5>Credit Card</h5>
                                <p>Pay with your credit card</p>
                            </div>
                        </label>
                    </div>
                </div>

                <div className='text-center py-3'>
                    <button className='btn btn-primary mt-3 w-25' onClick={checkout}>Checkout</button>
                </div>

            </div>
        </>
    )
}
