import React, { useContext, useState } from 'react'
import { cartContext } from '../../Contexts/CartContext';
import toast from 'react-hot-toast';

export default function Counter({ productID, count }) {

    const { updateProductQuantity } = useContext(cartContext)
    const [loading, setLoading] = useState(false)

    async function updateProduct(id, count) {
        setLoading(true)
        const res = await updateProductQuantity(id, count);
        if (res.status === 'success') {
            toast.success('Product updated successfully');
        }
        else {
            toast.error('Something went wrong');
        }
        setLoading(false)
    }
    return (
        <div className='d-flex justify-content-center align-items-center'>
            <button className='btn btn-outline-primary fw-bold' onClick={() => { updateProduct(productID, count - 1) }}>-</button>
            <p className='text-center mx-3 fs-5 pt-1'>
                {loading?
                <i className='fa fa-spinner fa-spin '></i>
                :count}
            </p>
            <button className='btn btn-outline-primary fw-bold' onClick={() => { updateProduct(productID, count + 1) }}>+</button>
        </div>
    )
}
