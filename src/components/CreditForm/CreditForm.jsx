import { useState, useEffect, useContext } from 'react'
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import axios from "axios"
import './CreditForm.scss'
import { CartContext } from "../../context/CartContext"
import { Check } from "lucide-react"
 
 
export default function CreditForm({totalMoney, setCreditFormOpen}) {
  
  const {clearCart, error} = useContext(CartContext)
  
  const stripe = useStripe()
  const elements = useElements()

  const [clientSecret, setClientSecret] = useState(null)
  const [paymentIntentId, setPaymentIntentId] = useState(null)
  const [status, setStatus] = useState("idle")
  const [errorMsg, setErrorMsg] = useState("")
  const [closing, setClosing] = useState(false)
  

  // Step 2: get clientSecret from your backend when form opens
  useEffect(() => {
    async function createPaymentIntent(){
      try{
        const res = await axios.post("http://localhost:3001/orders/create-payment-intent", {}, { withCredentials: true })
        console.log(res.data)
        setClientSecret(res.data.clientSecret)
        setPaymentIntentId(res.data.paymentIntentId)
      } catch(err){
        setErrorMsg(err.response?.data?.error || "Something went wrong")
        setStatus("error")
      }
    }
    createPaymentIntent()
  }, [])

  function handleCloseComponent(){
    setClosing(true)
    setTimeout(() => {
      setCreditFormOpen(false)
    }, 500)
  }


  // Step 3: confirm payment with Stripe, then tell your backend
  async function handleSubmit(e){
    e.preventDefault()
    if(!stripe || !elements || !clientSecret) return;

    setStatus("loading")
    setErrorMsg("")

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement(CardElement)}
    })
    
    if(error){
      setErrorMsg(error.message)
      setStatus("error")
      return;
    }

    if(paymentIntent.status === "succeeded"){
      try{
        await axios.post("http://localhost:3001/orders", { paymentIntentId }, { withCredentials: true })
        setStatus("success")
        await clearCart()
      } catch(err){
        setErrorMsg(err.response?.data?.error || "Order creation failed")
        setStatus("error")
      }
    }

  }



  return (
    <div className='creditForm'>
      <div onClick={handleCloseComponent} className={`creditForm__dark-bg ${closing ? "creditForm__dark-bg--closing" : ""}`}>
        <div onClick={e => e.stopPropagation()} className={`creditForm__main-container ${closing ? "creditForm__main-container--closing" : ""}`}>
          {status === "success" ? (
            <div className='creditForm__success'>
              <p className='creditForm__success-text'>Payment successful! <Check className='creditForm__check-icon' size={20} strokeWidth={2.8} /></p>
              <button className='creditForm__close-btn' onClick={handleCloseComponent}>Close</button>
            </div>
          ):(
            <form onSubmit={handleSubmit}>
              <h2 className='creditForm__checkout-text'>Checkout</h2>
              <p className='creditForm__total'>Total: {totalMoney}₾</p>

              <div className='creditForm__card-element'>
                <CardElement options={{ 
                  hidePostalCode: true, 
                  style: {
                    base:{
                      fontSize: "16px"
                    }
                  }
                }} />
              </div>

              {errorMsg && <p className='creditForm__error'>{errorMsg}</p>}
              <button className='creditForm__submit-btn' type='submit' disabled={!stripe || !clientSecret || status === "loading"}>
                {status === "loading" ? "Processing..." : `Pay ${totalMoney}₾`}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}