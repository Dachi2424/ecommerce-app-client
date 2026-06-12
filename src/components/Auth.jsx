import {useForm} from "react-hook-form"
import Logo from "../assets/logo.png"
import './Auth.scss'
import { useContext, useState } from "react"
import {X, Loader2, CircleCheck} from "lucide-react"
import { AuthContext } from "../context/AuthContext"
import { CartContext } from "../context/CartContext"
 

 
export default function Auth({setAuthOpen}) {
 
  const {register, handleSubmit, formState: {errors}, setError, reset} = useForm()
  const [signinForm, setSigninForm] = useState(true)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const {logIn, signUp} = useContext(AuthContext)
  const {fetchCart} = useContext(CartContext)



  function handleChangeForm(){
    reset()
    setSigninForm(prev => !prev)
  }

  async function handleAuth(data){
    setLoading(true)
    if(!signinForm){
      try{
        await signUp(data);
        reset();
        setSigninForm(true);
      }catch(err){
        console.log(err)
        setError("password", {message: err.response?.data?.error || err.message})
      } finally{
        setLoading(false)
      }
    } 
    
    else if(signinForm){
      try{
        await logIn(data)
        await fetchCart()
        setSuccess(true)
        setTimeout(() => {
          handleClose()
        }, 900)
      } catch(err){
        setError("password", {message: err.response?.data?.error || err.message})
        console.log(err)
      } finally{
        setLoading(false)
      }      
    }
  }



  function handleClose(){
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      setAuthOpen(false)
    }, 300)
  }


  return (
    <div className="auth">
      <div className={`auth__dark-bg ${!isClosing ? "auth__dark-bg--visible" : "auth__dark-bg--closing"}`} onClick={handleClose}>
        <div className="auth__form-container" onClick={e => e.stopPropagation()}>
          <X 
            className="auth__xmark" 
            size={17} 
            strokeWidth={1.4} 
            onClick={handleClose}
          />
          <form className="auth__form" onSubmit={handleSubmit(data => handleAuth(data))}>
            <img className="auth__logo-image" src={Logo} alt="EliteByte logo" />
            <div className="auth__heading-container">
              <span className="auth__heading">Profile</span>
              <span className="auth__text">Authorize In The System</span>
            </div>
            {signinForm ? (
              <>
                <div className="auth__input-container">
                  <input 
                    className="auth__input"
                    placeholder="Email" 
                    {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address"
                    },
                    maxLength: {
                      value: 254,
                      message: "Email must be under 254 characters"
                    }
                  })} />
                  <p className="auth__error">{errors.email && errors.email.message}</p>
                </div>

                <div className="auth__input-container">
                  <input 
                    className="auth__input"
                    placeholder="Password" 
                    type="password" 
                    {...register("password", {
                    required: "password is required",
                    maxLength: {
                      value: 30,
                      message: "Password must be max 30 characters"
                    }
                  })} />
                  <p className="auth__error">{errors.password && errors.password.message}</p>
                </div>
              </>
            ) : (
              <>
                <div className="auth__input-container">
                  <input 
                    className="auth__input"
                    placeholder="Username" 
                    type="text" 
                    {...register("username", {
                    required: "Username is required",
                    maxLength: {
                      value: 30,
                      message: "Username cannot extend 30 characters"
                    }
                  })} />
                  <p className="auth__error">{errors.username && errors.username.message}</p>
                </div>
                <div className="auth__input-container">
                  <input 
                    className="auth__input"
                    placeholder="Email" 
                    type="text"
                    {...register("email", {
                    required: "Email is required",
                    maxLength: {
                      value: 254,
                      message: "Email cannot extend 254 characters"
                    },
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address"
                    }
                  })} />
                  <p className="auth__error">{errors.email && errors.email.message}</p>
                </div>
                <div className="auth__input-container">
                  <input 
                    className="auth__input"
                    placeholder="Password" 
                    type="password" 
                    {...register("password", {
                    required: "password is required",
                    maxLength: {
                      value: 30,
                      message: "Password cannot extend 30 characters"
                    },
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters"
                    }
                  })} />
                  <p className="auth__error">{errors.password && errors.password.message}</p>
                </div>
              </>
            )}
            <hr />
            <button 
              className={`auth__submit-button ${loading && "auth__submit-button--loading"}`} 
              type="submit"
            >{success ? <span className="auth__success-text" >Login Success <CircleCheck className="auth__check" size={20} strokeWidth={2}/></span> : loading ? <Loader2 className="auth__button-loader"/> : signinForm ? "Authorize" : "Sign Up"}</button>
            <hr />
            <button 
              className="auth__link-button"
              type="button"
              onClick={handleChangeForm}
            >{signinForm ? "Sign Up" : "Sign In"}</button>
          </form>
        </div>
      </div>
    </div>
  )
}