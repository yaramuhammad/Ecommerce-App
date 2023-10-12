import React, { useContext, useState } from 'react'
import { cartContext } from '../../Contexts/CartContext'
import toast from 'react-hot-toast';
import { ThreeDots } from 'react-loader-spinner';
import Counter from '../Counter/Counter';
import { authContext } from '../../Contexts/AuthContext';

export default function Button({ productID }) {

    const { addProductToCart, products } = useContext(cartContext)
    const { Token } = useContext(authContext)
    const [loading, setLoading] = useState(false)

    let btn =
        <button onClick={() => addToCart(productID)} className="btn btn-primary w-100 my-1 d-flex justify-content-center align-items-center">
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

            '+ Add to cart'
            }
        </button>

    async function addToCart(id) {
        setLoading(true)
        try {
            let res = await addProductToCart(id)
            if (res.status === 'success') {
                toast.success('Product added to cart successfully');
                setLoading(false)
            }
        }
        catch (error) {
            toast.error(error.response.data.message);
            setLoading(false)
        }
    }
    if (Token === null) {
        return btn
    }
    else {

        if (products !== null) {
            let cartProducts = products.map(
                function (product) {
                    return {
                        id: product.product.id, quantity: product.count
                    }
                })
            let cartProduct = cartProducts.find(cartProduct => cartProduct.id === productID)

            return (
                cartProduct ?
                    <Counter productID={productID} count={cartProduct.quantity} />
                    :
                    btn
            )
        }
        if (products === null) {
            return (
                <button className='btn btn-primary w-100 my-1 d-flex justify-content-center'>
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
                </button>
            )
        }
    }

}
