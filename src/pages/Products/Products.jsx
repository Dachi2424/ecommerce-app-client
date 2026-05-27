import './Products.scss'
import Grid from './Grid/Grid'
import Filter from "./Filter/Filter"
import { useEffect, useState } from 'react'
import axios from "axios"
 
export default function Products() {

  const [products, setProducts] = useState([])

  useEffect(() => {
    async function getAllProducts(){
      try{
        const res = await axios.get("http://localhost:3001/products")
        setProducts(res.data)
        console.log(res.data)
      } catch(err){
        console.log(err)
      }
    }

    getAllProducts()
  }, [])

  return (
    <section className='products'>
      <Filter />
      <Grid products={products} setProducts={setProducts} />
    </section>
  )
}