import { useContext } from 'react'
import './Buy.scss'
import {ShoppingCart} from "lucide-react"
import {CartContext} from "../../../../context/CartContext" 
 
export default function Buy({product}) {
 
  const {addToCart} = useContext(CartContext) 

  async function handleAddToCart(product){
    try{
      await addToCart({...product, productId: product.id, quantity: 1, Product: product})
    } catch(err){
      console.log(err)
    }
  }

  return (
    <div className='buy'>
      <div className='buy__price-contianer'>
        <h1 className='buy__price'>{product.price}₾</h1>
      </div>
      <div className='buy__cart-container'>
        <div onClick={() => handleAddToCart(product)} className='buy__cart-icon-container'><ShoppingCart className='buy__cart-icon' size={16}/></div>
        <button className='buy__buy-button'>Buy</button>
      </div>
    </div>
  )
}