import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AuthProvider from './context/AuthContext.jsx'
import CartProvider from './context/CartContext.jsx'
import {loadStripe} from "@stripe/stripe-js"
import {Elements} from "@stripe/react-stripe-js"
import App from './App.jsx'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)


createRoot(document.getElementById('root')).render(

  <StrictMode>
    <Elements stripe={stripePromise}>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </Elements>
  </StrictMode>,
)
