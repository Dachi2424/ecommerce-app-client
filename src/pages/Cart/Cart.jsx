import {  useState } from 'react'
import './Cart.scss'
import EmptyCart from "../../assets/empty-cart.png"
import axios from "axios"
 
export default function Cart() {
  
  const [cartData, setCartData] = useState([])
  const [loadingData, setLoadingData] = useState(true)

  // I NEED TO LINK THIS TO CartContext
  
  return (
    <section className='cartpage'>
      <h1 className='cartpage__heading'>Cart</h1>
      {loadingData ? (
        //loading
        <div className='cartpage__loading-container'>
          LOADING...
        </div>
      ) : !loadingData && cartData.length === 0 ? (
        //empty
        <div className='cartpage__empty-cart-container'>
          <img className='cartpage__empty-image' src={EmptyCart} alt="empty cart" />
          <span className='cartpage__empty-cart-text'>Your Cart Is Empty</span>
          <span className='cartpage__another-empty-cart-text'>view our production and add to cart to view them</span>
          <button className='cartpage__view-button'>View Products</button>
        </div>
      ) : (
        //not empty
        <div className='cartpage__filled-cart-container'>
          <div></div>
        </div>
      )}
    </section>
  )
}