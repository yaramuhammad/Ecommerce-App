import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';

export default function Brands() {

  const [brands, setBrands] = useState(null);

  useEffect(() => {
    axios.get('https://ecommerce.routemisr.com/api/v1/brands')
      .then(res => setBrands(res.data.data))
      .catch(err => console.log(err))
  }
  )
  return <>
    {
      brands === null ?
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
            {
              brands.map((brand, idx) => {
                return <div className='col-md-3 col-sm-6 col-12' key={idx}>
                    <div className="card">
                      <img src={brand.image} className="card-img-top" alt="..." height='200' />
                    </div>
                  </div>
                
              })
            }
          </div>
        </div>

    }
  </>
}
