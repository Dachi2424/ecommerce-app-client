import { createContext, useEffect, useReducer } from "react"
import axios from "axios"

const BASE_URL = "http://localhost:3001/auth"
const ACTIONS = {
  SIGN_UP: "SIGN_UP",
  LOG_IN: "LOG_IN",
  GET_USER: "GET_USER",
  LOG_OUT: "LOG_OUT",
  DELETE_ACCOUNT: "DELETE_ACCOUNT",
  CHANGE_DATA: "CHANGE_DATA",
  USER_ERROR: "USER_ERROR",
  USER_LOADING: "USER_LOADING"
}

const initialState = {
  user: null, // { id, username, email, role }
  isAuthenticated: false,
  isLoading: false,
  error: null
}


function AuthReducer(state, action){
  switch (action.type){
    case ACTIONS.USER_LOADING:
      return {...state, isLoading: true, error: null}
    case ACTIONS.USER_ERROR:
      return {...state, isLoading: false, error: action.payload}
    case ACTIONS.GET_USER:
      return {...state, user: action.payload, isAuthenticated: true, isLoading: false}
    case ACTIONS.SIGN_UP:
      return {...state, isLoading: false, error: null}
    case ACTIONS.LOG_IN:
      return {...state, isLoading: false, error: null, isAuthenticated: true}
    case ACTIONS.CHANGE_DATA:
      return {...state, isLoading: false, error: null, user: action.payload}
    case ACTIONS.LOG_OUT:
      return {...state, isLoading: false, isAuthenticated: false, error: null, user: null}
    case ACTIONS.DELETE_ACCOUNT:
      return {...state, isLoading: false, isAuthenticated: false, error: null, user: null}
    default:
      return state;
  }
}



const AuthContext = createContext(null)


function AuthProvider({children}){
  const [state, dispatch] = useReducer(AuthReducer, initialState)  


  useEffect(() => {
    async function getAuthData(){
      dispatch({ type: ACTIONS.USER_LOADING })
      try{
        const res = await axios.get(`${BASE_URL}`, {withCredentials: true})
        dispatch({type: ACTIONS.GET_USER, payload: res.data})
        console.log(res.data)
      } catch(err){
        dispatch({type: ACTIONS.USER_ERROR, payload: err.message})
      }
    }
    getAuthData()
  }, [])



  async function logIn({email, password}){
    dispatch({ type: ACTIONS.USER_LOADING })
    try{
      await axios.post(`${BASE_URL}/login`, {email, password}, {withCredentials: true})
      const res = await axios.get(`${BASE_URL}`, {withCredentials:true})
      dispatch({ type: ACTIONS.GET_USER, payload: res.data })
      console.log(res.data)
    } catch(err){
      dispatch({ type: ACTIONS.USER_ERROR, payload: err.message })
    }
  }

  async function signUp({username, password, email}){
    dispatch({ type: ACTIONS.USER_LOADING })
    try{
      await axios.post(`${BASE_URL}/signup`, {username, password, email}, {withCredentials: true})
      dispatch({ type: ACTIONS.SIGN_UP })
    } catch(err){
      dispatch({ type: ACTIONS.USER_ERROR, payload: err.message })
    }
  }


  async function changeInfo({username, email, phone, idNumber, oldPassword, newPassword}){
    dispatch({ type: ACTIONS.USER_LOADING })
    try{
      const res = await axios.patch(`${BASE_URL}/change`, {username, email, phone, idNumber, oldPassword, newPassword}, {withCredentials: true})
      dispatch({ type: ACTIONS.CHANGE_DATA, payload: res.data.user })
      console.log(res.data)
    } catch(err){
      dispatch({ type: ACTIONS.USER_ERROR, payload: err.message })
    }
  }



  async function logOut(){
    dispatch({ type: ACTIONS.USER_LOADING })
    try{
      await axios.delete(`${BASE_URL}/logout`, {withCredentials: true})
      dispatch({ type: ACTIONS.LOG_OUT })
    } catch(err){
      dispatch({ type: ACTIONS.USER_ERROR, payload: err.message })
    }
  }



  async function deleteAccount(){
    dispatch({ type: ACTIONS.USER_LOADING })
    try{
      await axios.delete(`${BASE_URL}/delete`, {withCredentials: true})
      dispatch({ type: ACTIONS.DELETE_ACCOUNT })
    } catch(err){
      dispatch({ type: ACTIONS.USER_ERROR, payload: err.message })
    }
  }

  

  return(
    <AuthContext.Provider value={{...state, logIn, signUp, changeInfo, logOut, deleteAccount}}>
      {children}
    </AuthContext.Provider>
  )
}


export default AuthProvider;
export {AuthContext}