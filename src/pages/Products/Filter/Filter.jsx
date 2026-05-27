import './Filter.scss'
import {BrushCleaning, ChevronDown, Search} from "lucide-react"
import { useState } from 'react'
import {useForm} from "react-hook-form"
import axios from "axios"
 
 
export default function Filter() {
 

  const {register, handleSubmit, formState: {errors}, setError} = useForm()
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [priceOpen, setPriceOpen] = useState(false)


  async function filter(data){

    const params = {}

    if (data.search) params.search = data.search
    if (data.category?.length) params.category = data.category
    if (data.inStock) params.inStock = data.inStock
    if (data.minRating) params.minRating = data.minRating
    if (data.minPrice && data.minPrice !== '0') params.minPrice = data.minPrice
    if (data.maxPrice && data.maxPrice !== '10000') params.maxPrice = data.maxPrice

    try{
      console.log("sending: ", data)
      const res = await axios.get("http://localhost:3001/products/filter", {params})
      console.log(res)
    } catch(err){
      console.log(err)
    }
  }


  return (
    <form className='filter' onSubmit={handleSubmit(data => filter(data))}>
      <div className='filter__heading-container'>
        <h2 className='filter__heading filter__heading--main'>Filter</h2>
        <span className='filter__clear-icon'><BrushCleaning size={14} /> Clear</span>
      </div>
      <div className='filter__main-container'>
        {/* search filter */}
        <div className='filter__search-container'>
          <input 
            className='filter__input--search' 
            type="text" 
            placeholder='what are you looking for?' 
            {...register("search")} />
          <Search className='filter__search-icon' size={16} strokeWidth={2} />
        </div>
       
        {/* price filter */}
        <div className='filter__price-main-container'>
          {/* <h2 className='filter__heading filter__heading--price'>Price</h2> */}
          <button onClick={() => setPriceOpen(prev => !prev)} className='filter__accordeon-button' type='button'>Price <ChevronDown className={`filter__chevron ${priceOpen ? "filter__chevron--active" : ""}`} size={20} strokeWidth={1.2} /></button>
          <div className={`filter__price-inner-container ${priceOpen ? "filter__price-inner-container--open" : ""}`}>
            <div className='filter__price-input-container filter__price-input-container--first'>
              <label className='filter__label' htmlFor="from">From</label>
              <input {...register("minPrice")} className='filter__input filter__input--number' type="number" id='from' defaultValue={0} />
              <span className='filter__currency-icon'>₾</span>
            </div>
            <div className='filter__price-input-container filter__price-input-container--second'>
              <label className='filter__label' htmlFor="to">To</label>
              <input {...register("maxPrice")} className='filter__input filter__input--number' type="number" defaultValue={10000} id='to'/>
              <span className='filter__currency-icon'>₾</span>
            </div>
          </div>
        </div>
        
        {/* category filter */}

        <div className='filter__category-main-container'>
          <button onClick={() => setCategoryOpen(prev => !prev)} className='filter__accordeon-button' type='button'>Category <span><ChevronDown className={`filter__chevron ${categoryOpen ? "filter__chevron--active" : ""}`} size={20} strokeWidth={1.2} /></span></button>
          <div className={`filter__category-container ${categoryOpen ? "filter__category-container--open" : ""}`}>
            <div className={`filter__category-inner-container ${categoryOpen ? "filter__category-inner-container--active" : ""}`}>
              <div className='filter__category-input-container'>
                <input {...register("category")} className='filter__input filter__input--check' type="checkbox" id="laptop" value="laptop" />
                <label className='filter__label filter__label--category' htmlFor="laptop">Laptops</label>
              </div>
              <div className='filter__category-input-container'>
                <input {...register("category")} className='filter__input filter__input--check' type="checkbox" id="smartphone" value="smartphone" />
                <label className='filter__label filter__label--category' htmlFor="smartphone">Smartphones</label>
              </div>
              <div className='filter__category-input-container'>
                <input {...register("category")} className='filter__input filter__input--check' type="checkbox" id="tablet" value="tablet" />
                <label className='filter__label filter__label--category' htmlFor="tablet">Tablets</label>
              </div>
            </div>
          </div>
        </div>
        
        {/* stock */}
        <div className='filter__input-container filter__input-container--check'>
          <input {...register("inStock")} className='filter__input filter__input--check' id='stock' type="checkbox" defaultChecked />
          <label className='filter__label filter__label--check' htmlFor="stock">In stock</label>   
        </div>
        
        {/* min rating */}
        <div className='filter__rating-container'>
          <label className='filter__label filter__label--number' htmlFor="rating">Input minimum rating (0-10)</label>
          <input {...register("minRating")} className='filter__input filter__input--rating' id='rating' type="number" max={10} min={0}/>
        </div>
      </div>
     
      <div className='filter__button-container'>
        <button type='submit' className='filter__submit-button'>Filter</button>
      </div>
    </form>
  )
}