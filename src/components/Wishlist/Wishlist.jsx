import React, { useContext, useEffect, useState } from 'react'
import { RotatingLines } from 'react-loader-spinner';
import Button from '../Button/button';
import { wishlistContext } from '../../Contexts/WishlistContext';

export default function Wishlist() {

    const [loading, setLoading] = useState(true)

    const { getWishlist, deleteFromWishlist,wishlist } = useContext(wishlistContext)


    useEffect(() => {
        
        getWishlist();
        if (wishlist) {
            setLoading(false)
        }
    }, [wishlist])

    if (loading) {
        return (
            <div className='d-flex justify-content-center align-items-center min-vh-100'>
                <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="96"
                    visible={true}
                />
            </div>
        )
    }
    if (!loading) {
        return (
            wishlist.length > 0 ?
                <div className="container p-5">

                    <div className="shadow">
                        <div className='row py-4 px-2 border-bottom ' style={{ background: '#eee' }}>
                            <div className='col-7 fw-bolder'>Products</div>
                            <div className='col-1 fw-bolder'>Price</div>
                            <div className='col-2 fw-bolder'>Category</div>
                            <div className='col-2'></div>
                        </div>
                        {wishlist.map(function (product, idx) {
                            return <div className='row py-4 px-2 border-bottom ' key={idx} style={{ background: '#eee' }}>
                                <div className='col-2'>
                                    <div>
                                        <button className='btn btn-sm' onClick={() => { deleteFromWishlist(product.id) }}>
                                            <i className='fa fa-x'></i>
                                        </button>
                                        <img src={product.imageCover} alt="" className='w-75 d-inline-block px-3' />
                                    </div>
                                </div>
                                <div className='col-5'>
                                    <div>
                                        <p className='fs-5 fw-bold'>{product.title}</p>
                                        <p className='text-muted'>{product.description}</p>
                                    </div>
                                </div>
                                <div className='col-1'>
                                    <div className='d-flex align-items-center h-100'>
                                        <p>{product.price} EGP</p>
                                    </div>
                                </div>
                                <div className='col-2'>
                                    <div className='d-flex align-items-center h-100'>
                                        <p>{product.category.name}</p>
                                    </div>
                                </div>
                                <div className='col-2'>
                                    <div className='d-flex align-items-center h-100'>
                                        <Button productID={product.id} />
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>

                </div>
                :
                <div className="w-100 min-vh-100 d-flex flex-column justify-content-center align-items-center">
                    <img src={require('./images/Mediamodifier-Design-Template.jpg')} alt="empty wishlist" className='w-25' style={{ marginTop: '-150px' }} />
                    You Have No Items in Your Wishlist
                </div>

        )
    }

}
