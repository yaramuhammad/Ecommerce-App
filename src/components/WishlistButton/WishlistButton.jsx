import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { wishlistContext } from '../../Contexts/WishlistContext';
import { Hearts } from 'react-loader-spinner';
import { authContext } from '../../Contexts/AuthContext';

export default function WishlistButton({ productID }) {

    const { addProductToWishlist, deleteFromWishlist, wishlist, getWishlist } = useContext(wishlistContext)
    const { Token } = useContext(authContext)
    const [loading, setLoading] = useState(false)

    async function addToWishlist(id) {
        setLoading(true)
        try {
            let res = await addProductToWishlist(id)
            if (res.status === 'success') {
                toast.success('Product added to wishlist successfully');
                getWishlist()
            }
        }
        catch (error) {
            toast.error(error.response.data.message, {
                position: 'bottom-left',
                style: { backgroundColor: '#dc3545', color: '#fff' }
            });
        }
        setLoading(false)
    }

    async function removeFromWishlist(id) {
        setLoading(true)
        await deleteFromWishlist(id)
        setLoading(false)
    }


    if (Token === null) {
        return <button className='btn' onClick={() => { addToWishlist(productID) }}>
            <i className='fa-regular fa-heart fa-2x'></i>
        </button>

    }
    else {

        if (wishlist !== null) {
            let wishlistItem = wishlist.find(wishlistItem => wishlistItem.id === productID)
            return (
                wishlistItem ?
                    <button className='btn' onClick={() => { removeFromWishlist(productID) }}>
                        {
                            loading ? <i className='fa fa-spinner fa-spin fa-2x text-primary'></i> :
                                <i className='text-primary fa fa-heart fa-2x'></i>
                        }
                    </button>
                    :
                    <button className='btn' onClick={() => { addToWishlist(productID) }}>
                        {
                            loading ? <i className='fa fa-spinner fa-spin fa-2x text-primary'></i> :
                                <i className='text-primary fa-regular fa-heart fa-2x'></i>
                        }
                    </button>
            )
        }
        if (wishlist == null) {
            return <Hearts
                height="30"
                width="100"
                color="#0D6EFD"
                ariaLabel="hearts-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        }

    }
}
