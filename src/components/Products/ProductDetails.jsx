import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { RotatingLines } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import Button from '../Button/button';
import WishlistButton from '../WishlistButton/WishlistButton';

export default function ProductDetails() {

  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState(null)
  const { id } = useParams();

  useEffect(() => {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(res => {
        setLoading(false)
        setProduct(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [id])





  return <>
    {
      loading ?

        <div className='d-flex justify-content-center align-items-center min-vh-100'>
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>


        :
        <div className='container py-5'>
          <div className='row'>
            <div className='col-md-3'>
              <img src={product.imageCover} className='w-100' alt={product.title} />
            </div>
            <div className='col-md-9 d-flex justify-content-center flex-column'>
              <h1>{product.title}</h1>
              <p className='fs-5 text-muted'>{product.description}</p>
              <p>{product.category.name}</p>
              <div className="card-text d-flex justify-content-between">
                <p>{product.price} EGP</p>
                <p><i className='fa fa-star text-warning'></i> {product.ratingsAverage}</p>
              </div>
              <div className='d-flex justify-content-between'>
                <Button productID={product.id} />
                <WishlistButton productID={product.id} />
              </div>
            </div>
          </div>

        </div>
    }
  </>

}
