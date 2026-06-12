import './MenuList.scss'
import { AuthContext } from "../../../context/AuthContext"
import { useContext } from 'react'
import { ShoppingBag, CreditCard, UserPen, ChevronRight, LogOut } from "lucide-react"
import { useNavigate } from 'react-router-dom'
 
export default function MenuList() {
 
  const navigate = useNavigate()
  const {user, logOut} = useContext(AuthContext)

  async function handleLogout(){
    try{
      await logOut()
      navigate("/")
    } catch(err){
      console.log(err)
    }
  }

  return (
    <div className='menulist'>
      <h1 className='menulist__heading'>Hi, {user.username}</h1>
      <nav className='menulist__nav'>
        <div onClick={() => navigate("/profile/orders")} className='menulist__link-container'>
          <ShoppingBag size={20} strokeWidth={1.6}/>
          <span className='menuList__link-name'>Orders</span>
          <ChevronRight strokeWidth={1.6} size={22} className='menulist__chevron-icon' />
        </div>
        <div onClick={() => navigate("/profile/cards")} className='menulist__link-container'>
          <CreditCard size={20} strokeWidth={1.6}/>
          <span className='menuList__link-name'>Cards</span>
          <ChevronRight strokeWidth={1.6} size={22} className='menulist__chevron-icon' />
        </div>
        <div onClick={() => navigate("/profile/user-details")} className='menulist__link-container'>
          <UserPen size={20} strokeWidth={1.6}/>
          <span className='menuList__link-name'>Profile Details</span>
          <ChevronRight strokeWidth={1.6} size={22} className='menulist__chevron-icon' />
        </div>
      </nav>
      <span onClick={handleLogout} className='menulist__logout'><LogOut size={20} strokeWidth={1.6} /> Sign Out</span>
    </div>
  )
}