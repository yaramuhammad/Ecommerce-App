import React, { useContext } from 'react';
import { cartContext } from '../../Contexts/CartContext';
import { RotatingLines } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import Counter from '../Counter/Counter';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { emptyCart, emptyError, products, totalPrice, removeProductFromCart } = useContext(cartContext)

  async function removeProduct(id) {
    const res = await removeProductFromCart(id);
    if (res.status === 'success') {
      toast.success('Product removed from cart successfully');
    }
    else {
      toast.error('Something went wrong');
    }
  }

  async function clearCart() {
    emptyCart();
  }

  if (emptyError) {
    return <div className='d-flex justify-content-center align-items-center min-vh-100 flex-column'>
      <img src={require('./images/WhatsApp Image 2023-10-11 at 15.24.33_4939a049.jpg')} alt="" className='w-25' />
      <h1 className='mt-5' style={{ color: '#3A79AF', 'marginBottom': '250px' }}>Your Cart is empty</h1>
    </div>
  }
  if (products === null) {
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
    <>
      <div className='container py-5'>
        <div className='row'>
          <div className='col-8 '>
            <div className='me-5'>
              <div className='d-flex justify-content-between align-items-center'>
                <h1>Your Cart</h1>
                <button className='btn btn-danger' onClick={() => { clearCart() }}>Clear Cart</button>
              </div>
              {products.map((product, idx) => {
                console.log(product)
                return <div className='row py-2 my-3 border-bottom border-2' key={idx}>
                  <div className='col-1 align-items-center d-flex'>
                    <button className='text-danger btn ' onClick={() => { removeProduct(product.product.id) }}>
                      <small>
                        <i className='fa fa-x'></i>
                      </small></button>
                  </div>
                  <div className='col-2'>
                    <img src={product.product.imageCover} alt="" className='w-75' />
                  </div>
                  <div className='col-5'>
                    <div className='justify-content-center d-flex flex-column h-100'>
                      <h5>{product.product.title}</h5>
                      <p className='text-muted'>{product.product.category.name}</p>
                    </div>
                  </div>
                  <div className='col-2'>
                    <div className='justify-content-center d-flex flex-column h-100'>
                      <p>{product.price} EGP</p>
                    </div>
                  </div>
                  <div className='col-2'>
                    <div className='justify-content-center d-flex flex-column h-100'>
                      <Counter productID={product.product.id} count={product.count} />
                    </div>
                  </div>

                </div>
              })
              }

            </div>
          </div>
          <div className='col-4 border-start'>
            <div className='ps-5'>
              <h1>Summary</h1>
              <div className='py-5'>
                <div className='d-flex justify-content-between'>
                  <h5>Subtotal</h5>
                  <h5>{totalPrice} EGP</h5>
                </div>
                <div className='d-flex justify-content-between'>
                  <h5>Shipping</h5>
                  <h5>0 EGP</h5>
                </div>
                <hr />
                <div className='d-flex justify-content-between'>
                  <h5>Total</h5>
                  <h5>{totalPrice} EGP</h5>
                </div>
                <div className='d-flex justify-content-end py-4'>
                  <Link to='/checkout' className='btn btn-primary text-white'>Checkout</Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </>

  )

}