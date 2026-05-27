import './Buy.scss'
import {ShoppingCart} from "lucide-react"
 
 
export default function Buy({product}) {
 
  return (
    <div className='buy'>
      <div className='buy__price-contianer'>
        <h1 className='buy__price'>{product.price}₾</h1>
      </div>
      <div className='buy__cart-container'>
        <div className='buy__cart-icon-container'><ShoppingCart className='buy__cart-icon' size={16}/></div>
        <button className='buy__buy-button'>Buy</button>
      </div>
    </div>
  )
}