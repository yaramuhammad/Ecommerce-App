import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import Button from '../Button/button';
import WishlistButton from '../WishlistButton/WishlistButton';


export default function Products() {

  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState(null)


  useEffect(() => {
    axios.get('https://ecommerce.routemisr.com/api/v1/products')
      .then(res => {
        setLoading(false)
        setProducts(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])



  return <>{

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
        <div className='row g-4'>

          {products.map((product, idx) => {
            return <div className=' col-md-3 col-sm-6 col-12' key={idx}>
              <div className="card">
                <Link to={'/product/' + product.id}>
                  <img src={product.imageCover} className="card-img-top" alt="..." />
                </Link>
                <div className="card-body">
                  <small className='text-primary fw-bold'>{product.category.name}</small>
                  <Link to={'/product/' + product.id}>
                    <h5 className="card-title">{product.title.split(' ').splice(0, 2).join(' ')}</h5>
                    <div className="card-text d-flex justify-content-between">
                      <p>{product.price} EGP</p>
                      <p><i className='fa fa-star text-warning'></i> {product.ratingsAverage}</p>
                    </div>
                  </Link>

                  <div className='d-flex justify-content-between'>
                    <Button productID={product.id} />
                    <WishlistButton productID={product.id} />
                  </div>
                </div>
              </div>
            </div>
          })}

        </div>
      </div>
  }
  </>
}

