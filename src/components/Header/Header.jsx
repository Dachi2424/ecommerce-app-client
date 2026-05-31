import { lazy, Suspense, useState, useContext, useEffect } from 'react'
import { CircleUser, ShoppingCart } from "lucide-react"
import { AuthContext } from '../../context/AuthContext'
import axios from "axios"
import './Header.scss'
const Cart = lazy(() => import("../Cart/Cart"))
import Logo from "../../assets/logo-text.png"
 
export default function Header({setAuthOpen}) {
 
  const [openCart, setOpenCart] = useState(false) 
  const {loggedin} = useContext(AuthContext)
  const [cartData, setCartData] = useState([])
  const [totalQuantity, setTotalQuantity] = useState(0)
  const [totalMoney, setTotalMoney] = useState(0)


  function calculateQuantity(data){
    const totalQuantity = data.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.quantity
    }, 0)
    const totalMoney = data.reduce((acc, current) => {
      return acc + (current.quantity * Number(current.Product?.price))
    }, 0)
    setTotalQuantity(totalQuantity)
    setTotalMoney(totalMoney)
  }
  
  
  async function getCartItems(){
    try{
      const res = await axios.get("http://localhost:3001/cart", {withCredentials: true})
      console.log(res.data)
      setCartData(res.data)
      calculateQuantity(res.data)
    } catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    getCartItems()
  }, [])


  return (
    <header className='header'>
      <img className='header__logo' src={Logo} alt="" />
        <div className='header__right-container'>
          {/* cart */}
          <div 
            className='header__cart-main-container'
            onMouseEnter={() => setOpenCart(true)}
            onMouseLeave={() => setOpenCart(false)}  
          >
            <div className='header__cart-container'><ShoppingCart className='header__cart-icon' size={24}/> <span className={`header__cart-quantity ${totalQuantity > 0 ? "header__cart-quantity--active" : ""}`}>{totalQuantity}</span> </div>
            <Suspense fallback={<div className='header__cart-fallback'></div>}>
              {openCart && <Cart cartData={cartData} totalQuantity={totalQuantity} totalMoney={totalMoney} setOpenCart={setOpenCart} refreshCart={getCartItems} />}
            </Suspense>
          </div>

          {/* auth */}
          {!loggedin ? (
            <div onClick={() => setAuthOpen(true)} className='header__loggedout-auth'>
              <CircleUser className='header__user-icon header__user-icon--loggedout' size={20} strokeWidth={2.4} />
              <span className='header__signin-text'>Sign In</span>
            </div>
          ) : (
            <div onClick={() => setAuthOpen(true)} className='header__loggedin-auth'>
              <CircleUser className='header__user-icon header__user-icon--loggedin' size={20}/>
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