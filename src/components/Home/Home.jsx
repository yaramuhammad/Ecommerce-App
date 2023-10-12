import React, { useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner';
import Products from '../Products/Products';

export default function Home() {

  const [products, setProducts] = useState(null)
  const [categories, setCategories] = useState(null)

  useEffect(() => {
    axios.get('https://ecommerce.routemisr.com/api/v1/products')
      .then(res => setProducts(res.data.data))
      .catch(err => console.log(err))
    axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      .then(res => setCategories(res.data.data))
      .catch(err => console.log(err))
  }, [])

  return (
    categories === null || products === null ?
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
      <div className='container'>

        <div className='row g-0'>
          <div className='col-8'>
            <Slider {...{
              dots: true,
              infinite: true,
              slidesToShow: 1,
              slidesToScroll: 1,
              autoplay: true,
              speed: 500,
              autoplaySpeed: 2000,
              cssEase: "linear"
            }}>
              <div>
                <img src={require('../../Assets/images/slider-image-1.jpeg')} alt='img' className='w-100' height='608px' />
              </div>
              <div>
                <img src={require('../../Assets/images/slider-image-2.jpeg')} alt='img' className='w-100' height='608px' />
              </div>

            </Slider>
          </div>
          <div className='col-4'>
            <img src={require('../../Assets/images/slider-2.jpeg')} alt='img' className='w-100 ' />
            <img src={require('../../Assets/images/grocery-banner-2.jpeg')} alt='img' className='w-100 ' />
            <img src={require('../../Assets/images/slider-image-3.jpeg')} alt='img' className='w-100' />
          </div>
        </div>
        <div>
          <Slider {...{
            dots: true,
            infinite: true,
            slidesToShow: 5,
            slidesToScroll: 2,
            autoplay: true,
            speed: 500,
            autoplaySpeed: 2000,
            cssEase: "linear"
          }}>
            {categories.map((category, idx) => {
              return <div key={idx} className='mx-5'>
                <img src={category.image} alt='img' width='200px' height='200px' className='rounded-circle' />
                <div className='me-5 mt-3 text-center'>
                  <p>{category.name}</p>
                </div>
              </div>
            })}

          </Slider>
        </div>

        <Products />
      </div>

  )
}
