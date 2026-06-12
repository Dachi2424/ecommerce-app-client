import {useEffect, createContext, useReducer} from "react"
import axios from "axios"


// actions
const BASE_URL = "http://localhost:3001/cart"

const ACTIONS = {
  SET_CART: "SET_CART",
  ADD_ITEM: "ADD_ITEM",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
  DELETE_ITEM: "DELETE_ITEM",
  CLEAR_CART: "CLEAR_CART",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR"
}

// reducer

const initialState = {
  items: [],
  loading: false,
  error: null
}

function CartReducer(state, action){
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return {...state, loading: action.payload, error: null}
    case ACTIONS.SET_ERROR:
      return {...state, loading: false, error: action.payload} 
    case ACTIONS.SET_CART:
      return {...state, loading: false, items: action.payload}
    case ACTIONS.ADD_ITEM: {
      const exists = state.items.find(i => i.productId === action.payload.productId)
      const items = exists ?
      state.items.map(i =>
        i.productId === action.payload.productId 
        ? {...i, quantity: i.quantity + action.payload.quantity}
        : i
      ) : [...state.items, action.payload]
      return {...state, loading: false, items}
    }
    case ACTIONS.UPDATE_QUANTITY:
      return {
        ...state,
        loading: false,
        items: state.items.map(i => 
          i.productId === action.payload.productId
          ? {...i, quantity: action.payload.quantity}
          : i
        )
      }
    case ACTIONS.DELETE_ITEM:
      return {
        ...state,
        loading: false,
        items: state.items.filter(i => i.productId !== action.payload)
      }
    case ACTIONS.CLEAR_CART:
      return {...state, loading: false, items: []}
    default:
      return state
  }
}



// context
const CartContext = createContext(null)



// prvider
function CartProvider({children}){

  const [state, dispatch] = useReducer(CartReducer, initialState)


  async function fetchCart(){
    dispatch({type: ACTIONS.SET_LOADING, payload: true})
    try{
      const res = await axios.get(BASE_URL, {withCredentials: true})
      dispatch({ type: ACTIONS.SET_CART, payload: res.data})
      
    } catch(err){
      dispatch({type: ACTIONS.SET_ERROR, payload: err.message})
    }
  }

  useEffect(() => {
    // 1. get cart data
    fetchCart()
  }, [])


  // 2. add to cart
  async function addToCart(product){
    dispatch({type: ACTIONS.SET_LOADING, payload: true})
    try{
      await axios.post(`${BASE_URL}/${product.productId}`, product, {withCredentials: true})
      dispatch({ type: ACTIONS.ADD_ITEM, payload: product })
    } catch(err){
      dispatch({ type: ACTIONS.SET_ERROR, payload: err.message })
    }
  }


  // 3. update cart
  async function updateQuantity(product){
    dispatch({ type: ACTIONS.SET_LOADING, payload: true })
    try{
      await axios.patch(`${BASE_URL}/${product.productId}`, {quantity: product.quantity}, {withCredentials: true})
      dispatch({ type: ACTIONS.UPDATE_QUANTITY, payload: product })
    } catch(err){
      dispatch({ type: ACTIONS.SET_ERROR, payload: err.message })
    }
  }


  // 4. delete a product in the cart
  async function deleteProduct(productId){
    dispatch({ type: ACTIONS.SET_LOADING, payload: true})
    try{
      await axios.delete(`${BASE_URL}/${productId}`, {withCredentials: true})
      dispatch({ type: ACTIONS.DELETE_ITEM, payload: productId })
    } catch(err){
      dispatch({ type: ACTIONS.SET_ERROR, payload: err.message })
    }
  }


  // 5. clear the cart
  async function clearCart() {
    try{
      await axios.delete(BASE_URL, {withCredentials: true})
    } catch(err){
      console.log(err);
    }
    dispatch({ type: ACTIONS.CLEAR_CART })
  }



  return(
    <CartContext.Provider value={{ ...state, fetchCart, addToCart, updateQuantity, deleteProduct, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider 
export {CartContext}