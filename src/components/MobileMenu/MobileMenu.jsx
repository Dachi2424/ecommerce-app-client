import './MobileMenu.scss'
import {Home, ShoppingCart, CircleUser, Store} from "lucide-react"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext" 
import { CartContext } from "../../context/CartContext"
import { NavLink } from "react-router-dom"

export default function MobileMenu({setAuthOpen}) {
 
  const {user} = useContext(AuthContext)
  const {items} = useContext(CartContext)


  const totalQuantity = items.reduce((acc, item) => {
    return acc + item.quantity 
  }, 0)

  return (
    <div className='menu'>
      
      <NavLink to="/" className={({isActive}) => `menu__div ${isActive ? "menu__div--active" : ""}`}>
        <Home className='menu__icon' size={22} />
        <span className='menu__link-text'>Home</span>
      </NavLink>

      <NavLink to="/products" className={({isActive}) => `menu__div ${isActive ? "menu__div--active" : ""}`}>
        <Store className='menu__icon' size={22} />
        <span className='menu__link-text'>Shop</span>
      </NavLink> 

      <NavLink to="/cart" className={({isActive}) => `menu__div ${isActive ? "menu__div--active" : ""}`}>
        <ShoppingCart className='menu__icon' size={22} />
        <span className='menu__link-text'>Cart</span>
        <span className='menu__product-quantity'>{totalQuantity}</span>
      </NavLink>  
      
      {!user ? (
        <div onClick={() => setAuthOpen(true)} className='menu__div'>
          <CircleUser className='menu__icon' size={22} />
          <span className='menu__link-text'>Sign In</span>
        </div>
      ) : (
        <NavLink to="/profile" className='menu__div'>
          <CircleUser className='menu__icon' size={22} />
          <span className='menu__link-text'>Profile</span>
        </NavLink>
      )}  
    </div>
  )
}