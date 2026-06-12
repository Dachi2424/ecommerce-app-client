import { useEffect, useState } from 'react'
import './Orders.scss'
import axios from "axios" 
 
export default function Orders() {
  const [orderList, setOrderList] = useState([])

  useEffect(() => {
    async function getOrders(){
      try{
        const res = await axios.get("http://localhost:3001/orders", {withCredentials: true})
        console.log(res.data)
      } catch(err){
        console.log(err)
      }
    }
    getOrders()
  }, [])

  return (
    <div className='orders'>
      
    </div>
  )
}