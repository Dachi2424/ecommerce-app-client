import { lazy, Suspense, useState } from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
const Home = lazy(() => import("./pages/Home/Home"))
const Auth = lazy(() => import("./components/Auth"))
const Details = lazy(() => import("./pages/Details/Details"))
const Products = lazy(() => import("./pages/Products/Products"))
import Header from "./components/Header/Header"
import './App.scss'

function App() {
  
  const [authOpen, setAuthOpen] = useState(false)

  return (
    <>
      <BrowserRouter>
        <Header setAuthOpen={setAuthOpen} />
        <Suspense fallback={<div className="suspense"></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/details/:id" element={<Details />} />
          </Routes>
        
        {authOpen && <Auth setAuthOpen={setAuthOpen} />}
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
