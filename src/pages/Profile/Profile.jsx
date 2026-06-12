import './Profile.scss'
import { Outlet, useLocation, Navigate, useNavigate } from "react-router-dom"
import { useState, useEffect, useContext } from 'react'
import MenuList from "./MenuList/MenuList"
import { AuthContext } from "../../context/AuthContext"




function useIsDesktop(){
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024)

  useEffect(() => {
    function handler(){
      setIsDesktop(window.innerWidth >= 1024)
    }
    window.addEventListener("resize", handler)
    return () => removeEventListener("resize", handler)
  }, [])
  return isDesktop;
}




 
export default function Profile() {
  const isDesktop = useIsDesktop()
  const location = useLocation()
  const isIndex = location.pathname === "/profile" || location.pathname === "/profile/"

  const {isAuthenticated, isLoading} = useContext(AuthContext) 
  const navigate = useNavigate()
  useEffect(() => {
    if(!isLoading && !isAuthenticated){
      navigate("/")
    }
  }, [isAuthenticated])

  if(isAuthenticated && isDesktop && isIndex){
    return <Navigate to="/profile/orders" replace />
  }
  
  if(isAuthenticated && !isDesktop && isIndex){
    return <MenuList />
  }

  return (
    <section className='profile-layout'>
      {isAuthenticated && isDesktop && <MenuList />}
      <Outlet />
    </section>
  )
}