import './Cart.scss'
import EmptyCart from "../../assets/empty-cart.png"
import {X} from "lucide-react"
import axios from "axios"
import {useNavigate} from "react-router-dom"
 
 
export default function Cart({cartData, totalQuantity, totalMoney, setOpenCart, refreshCart}) {
 
  const navigate = useNavigate()


  function navigateToProduct(id){
    setOpenCart(false)
    navigate(`/details/${id}`)
  }

  async function deleteOne(productId){
    try{
      const res = await axios.delete(`http://localhost:3001/cart/${productId}`, {withCredentials: true})
      console.log(res)
      await refreshCart()
    } catch(err){
      console.log(err)
    }
  }


  async function handleDecrementQuantity(productId, quantity){
    if(quantity === 1){
      deleteOne(productId)
      return;
    }
    try{
      const res = await axios.patch(`http://localhost:3001/cart/${productId}`, {quantity: quantity - 1}, {withCredentials: true})
      console.log(res)
      await refreshCart()
    } catch(err){
      console.log(err)
    }
  }
  async function handleIncrementQuantity(productId, quantity){
    try{
      const res = await axios.patch(`http://localhost:3001/cart/${productId}`, {quantity: quantity + 1}, {withCredentials: true})
      console.log(res)
      await refreshCart()
    } catch(err){
      console.log(err)
    }
  }


  function handleNavigateCart(){
    setOpenCart(false)
    navigate("/cart")
  }
  
  return (
    <div className='cart'>
      {cartData.length !== 0 ? (
        //filled cart
        <div className='cart__filled-cart-container'>
          <div className='cart__filled-upper-container'>
            <span className='cart__cart-text'>Cart</span>
            <span className='cart__quantity-text'>{totalQuantity} products</span>
          </div>
          <div className='cart__product-container'>
            {cartData.map((item, index) => (
              <div className='cart__product-box' key={index}>
                <X onClick={() => deleteOne(item.productId)} className='cart__xmark' size={14} />
                <img onClick={() => navigateToProduct(item.productId)} className='cart__product-image' src={item.Product?.imageUrl?.[0]} alt={item.Product?.name} />
                <p onClick={() => navigateToProduct(item.productId)} className='cart__product-name'>{item.Product?.name}</p>
                <span className='cart__product-price'>{item.Product?.price}₾</span>
                <div className='cart__quantity-button-container'>
                  <span onClick={() => handleDecrementQuantity(item.productId, item.quantity)} className='cart__quantity-button'>-</span>
                  <span className='cart__product-quantity'>{item.quantity}</span>
                  <span onClick={() => handleIncrementQuantity(item.productId, item.quantity)} className='cart__quantity-button'>+</span>
                </div>
              </div>
            ))}
          </div>
          <div className='cart__cart-link'>
            <div className='cart__total-amount-container'>
              <span className='cart__total-text'>Total Amount To Pay</span>
              <span className='cart__total-money'>{totalMoney}₾</span>
            </div>
            <button onClick={handleNavigateCart} className='cart__cart-button'>Open Cart</button>
          </div>
        </div>
      ) : (
        // empty cart
        <div className='cart__empty-cart-container'>
          <h2 className='cart__empty-cart-text'>The Cart Is Empty</h2>
          <p className='cart__add-items-text'>Add items in order to purchase them</p>
          <div className='cart__empty-cart-image-div'>
            <img className='cart__empty-cart-image' src={EmptyCart} alt="empty cart" />
          </div>
          <button onClick={handleNavigateCart} className='cart__cart-button cart__cart-button--empty'>Open Cart</button>
        </div>
      )}
    </div>
  )
}