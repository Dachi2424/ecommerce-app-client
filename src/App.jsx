import { lazy, Suspense, useState } from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
const Home = lazy(() => import("./pages/Home/Home"))
const Auth = lazy(() => import("./components/Auth"))
const Details = lazy(() => import("./pages/Details/Details"))
const Products = lazy(() => import("./pages/Products/Products"))
const Profile = lazy(() => import("./pages/Profile/Profile"))
const Cards = lazy(() => import("./pages/Profile/Cards/Cards"))
const UserDetails = lazy(() => import("./pages/Profile/UserDetails/UserDetails"))
const Orders = lazy(() => import("./pages/Profile/Orders/Orders"))
import Header from "./components/Header/Header"
import MobileMenu from "./components/MobileMenu/MobileMenu"
import './App.scss'

import Cart from "./pages/Cart/Cart"

function App() {
  
  const [authOpen, setAuthOpen] = useState(false)

  return (
    <>
      <BrowserRouter>
        <Header setAuthOpen={setAuthOpen} />
        <MobileMenu setAuthOpen={setAuthOpen}/>
        <Suspense fallback={<div className="suspense"></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/profile" element={<Profile />} >
              <Route path="user-details" element={<UserDetails />}/>
              <Route path="orders" element={<Orders />}/>
              <Route path="cards" element={<Cards />}/>
            </Route>
            <Route path="/cart" element={<Cart />} />
          </Routes>
        
        {authOpen && <Auth setAuthOpen={setAuthOpen} />}
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
