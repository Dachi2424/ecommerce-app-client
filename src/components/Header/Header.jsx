import { lazy, Suspense, useState, useContext } from 'react'
import { CircleUser, ShoppingCart } from "lucide-react"
import { AuthContext } from '../../context/AuthContext'
import { CartContext } from "../../context/CartContext"
import { useNavigate } from "react-router-dom"
import './Header.scss'
const Cart = lazy(() => import("../Cart/Cart"))
import Logo from "../../assets/logo-text.png"
 
export default function Header({setAuthOpen}) {
 
  const navigate = useNavigate()
  const [openCart, setOpenCart] = useState(false) 
  
  const {loggedin} = useContext(AuthContext)
  const {items} = useContext(CartContext)

  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0)
  const totalMoney = items.reduce((acc, item) => acc + (item.quantity * Number(item.Product?.price)), 0)

  function handleNavigateProfile(){
    navigate("/profile")
  }

  function handleNavigateCart(){
    setOpenCart(false)
    navigate("/cart")
  }

  return (
    <header className='header'>
      <img onClick={() => navigate("/")} className='header__logo' src={Logo} alt="EliteByte" />
        <div className='header__right-container'>
          {/* cart */}
          <div 
            className='header__cart-main-container'
            onMouseEnter={() => setOpenCart(true)}
            onMouseLeave={() => setOpenCart(false)}  
          >
            <div onClick={handleNavigateCart} className='header__cart-container'>
              <ShoppingCart className='header__cart-icon' size={24}/> 
              <span className={`header__cart-quantity ${totalQuantity > 0 ? "header__cart-quantity--active" : ""}`}>{totalQuantity}</span> 
            </div>
            <Suspense fallback={<div className='header__cart-fallback'></div>}>
              {openCart && <Cart handleNavigateCart={handleNavigateCart} totalQuantity={totalQuantity} totalMoney={totalMoney} setOpenCart={setOpenCart} />}
            </Suspense>
          </div>

          {/* auth */}
          {!loggedin ? (
            <div onClick={() => setAuthOpen(true)} className='header__loggedout-auth'>
              <CircleUser className='header__user-icon header__user-icon--loggedout' size={20} strokeWidth={2.4} />
              <span className='header__signin-text'>Sign In</span>
            </div>
          ) : (
            <div onClick={handleNavigateProfile} className='header__loggedin-auth'>
              <CircleUser className='header__user-icon header__user-icon--loggedin' size={24}/>
            </div>
          )}

          {/* language switch -- temporarily just an icon */}
          <div className='header__language-container'>
            <span className='header__language-text'>EN</span>
          </div>
        </div>
    </header>
  )
}