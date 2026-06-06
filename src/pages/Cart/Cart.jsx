import { useContext, useEffect, useState } from 'react'
import { CartContext } from "../../context/CartContext"
import { Trash2, BrushCleaning } from "lucide-react"
import './Cart.scss'
import EmptyCart from "../../assets/empty-cart.png"
import { useNavigate } from "react-router-dom"
 
export default function Cart() {

  const navigate = useNavigate()
  const {items, loading, error, updateQuantity, deleteProduct, clearCart} = useContext(CartContext)
  const [pageLoading, setPageLoading] = useState(true)

  const totalMoney = items.reduce((acc, item) => acc + (Number(item.Product?.price) * item.quantity), 0)

  // in order to stop rendering elements on every API call:
  useEffect(() => {
    if(!loading && pageLoading === true){
      setPageLoading(false)
    }
  }, [loading])


  
  async function decrementQuantity(item) {
    if(item.quantity <= 1){
      await deleteOneProduct(item.productId)
      return;
    } /// HERE I SHOULD CALL DELETEITEM
    try{
      await updateQuantity({productId: item.productId, quantity: item.quantity - 1})
    } catch(err){
      console.log(err)
    }
  }
  async function incrementQuantity(item){
    try{
      await updateQuantity({productId: item.productId, quantity: item.quantity + 1})
    } catch(err){
      console.log(err)
    }
  }

  async function deleteOneProduct(productId){
    try{
      await deleteProduct(productId)
    } catch(err){
      console.log(err)
    }
  }

  return (
    <section className='cartpage'>
      <div className='cartpage__heading-container'>
        <h1 className='cartpage__heading'>Cart</h1>
        {!pageLoading && items.length >= 1 && <span onClick={clearCart} className='cartpage__clear-text'><BrushCleaning size={14} /> Clear</span>}  
      </div>
      
      {pageLoading ? (
        //loading
        <div className='cartpage__loading-container'>
          LOADING...
        </div>
      ) : !pageLoading && items.length === 0 ? (
        //empty
        <div className='cartpage__empty-cart-container'>
          <img className='cartpage__empty-image' src={EmptyCart} alt="empty cart" />
          <span className='cartpage__empty-cart-text'>Your Cart Is Empty</span>
          <span className='cartpage__another-empty-cart-text'>view our production and add to cart to view them</span>
          <button onClick={() => navigate("/products")} className='cartpage__view-button'>View Products</button>
        </div>
      ) : (
        //not empty
        <div className='cartpage__filled-cart-container'>
          <div className='cartpage__grid-container'>
            {items.map(item => (
              // product box
              <div key={item.productId} className='cartpage__product'>
                <div className='cartpage__image-container'>
                  <img className='cartpage__product-image' src={item.Product?.imageUrl?.[0]} alt="" />
                </div>
                <p className='cartpage__product-name'>{item.Product?.name}</p>
                <div className='cartpage__quantity-container'>
                  <span onClick={() => decrementQuantity(item)} className='cartpage__quantity-button'>-</span>
                  <span className='cartpage__quantity'>{item.quantity}</span>
                  <span onClick={() => incrementQuantity(item)} className='cartpage__quantity-button'>+</span>
                </div>
                <span className='cartpage__product-price'>{item.Product?.price}₾</span>
                <Trash2 onClick={() => deleteOneProduct(item.productId)} className='cartpage__trash-icon' size={16} strokeWidth={1.6} />
              </div>
            ))}
          </div>
          <div className='cartpage__checkout-container'>
            <div className='cartpage__overall-price-container'>
              <span className='cartpage__sum-text'>Sum Amount:</span>
              <span className='cartpage__overall-price'>{totalMoney}₾</span>
            </div>
            <button className='cartpage__next-button'>Next</button>
          </div>
        </div>
      )}
    </section>
  )
}