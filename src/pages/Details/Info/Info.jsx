import { useEffect, useState } from 'react'
import axios from "axios"
import {ChevronLeft, ChevronRight} from "lucide-react"
import Buy from './Buy/Buy'
import Slider from './Slider/Slider'
import {NavLink} from "react-router-dom"
import './Info.scss'
 
 
export default function Info({id}) {
 
  const [openSlider, setOpenSlider] = useState(false)
  const [product, setProduct] = useState({})
  const [imageId, setImageId] = useState(0)

  useEffect(() => {
    async function getDetailedInfo(){
      try{
        const res = await axios.get(`http://localhost:3001/products/${id}`)
        console.log(res.data)
        setProduct(res.data)
      } catch(err){
        console.log(err)
      }
    }
    getDetailedInfo()
  }, [])

  useEffect(() => {
    if(openSlider){
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [openSlider])

  function handleNextImage(e){
    e.stopPropagation()
    const imageQuantity = product.imageUrl.length
    if(imageId + 1 === imageQuantity){
      return;
    }
    setImageId(prev => prev + 1)
  }

  function handlePreviousImage(e){
    e.stopPropagation();
    if(imageId === 0){
      return
    }
    setImageId(prev => prev - 1)
  }

  return (
    <section className='info'>
      {openSlider && <Slider product={product} setOpenSlider={setOpenSlider} />}
      <div className='info__product-data-container'>
        <NavLink to="/products" className='info__go-back'><ChevronLeft size={16}/> Go back</NavLink>
        <span className='info__code-text'>Code: {product.id}</span>
      </div>
      <h2 className='info__heading-name info__heading-name--mobile'>{product.name}</h2>
      <div className='info__main-container'>
        
        <div className='info__images-container'>
          <div className='info__image-catalog'>
            {product.imageUrl?.map((image, index)=> (
              <div onClick={() => setImageId(index)} key={index} className={`info__image-div ${imageId === index ? "info__image-div--active" : ""}`}>
                <img className='info__image info__image--side' src={image} alt={product.name} />
              </div>
            ))}
          </div>
          <div className='info__main-image-container' onClick={() => setOpenSlider(true)}>
            <div onClick={e => handlePreviousImage(e)} className='info__arrow-container info__arrow-container--left'>
              <ChevronLeft className='info__arrow' />
            </div>
            <img className='info__image info__image--main' src={product.imageUrl?.[imageId]} alt={product.name} />
            <div onClick={e => handleNextImage(e)} className='info__arrow-container info__arrow-container--right'>
              <ChevronRight className='info__arrow'/>
            </div>
          </div>
        </div>

        <div className='info__detail-container'>
          <h2 className='info__heading-name info__heading-name--desktop'>{product.name}</h2>
          <div className='info__grid-container'>
            <div className='info__specs-container'>
              <span className='info__spec-name'>Category:</span>
              <span className='info__spec-value'>{product.category}</span>
            </div>
            <div className='info__specs-container'>
              <span className='info__spec-name'>In stock:</span>
              <span className='info__spec-value'>{product.stock}</span>
            </div>
            <div className='info__specs-container'>
              <span className='info__spec-name'>Product rating:</span>
              <span className='info__spec-value'>{product.rating} ({product.reviewCount} {product.reviewCount === 1 ? "review" : "reviews"})</span> {/* in development */}
            </div>
            <div className='info__specs-container'>
              <span className='info__spec-name'>description:</span>
              <span className='info__spec-value'>{product.description ? product.description : "No description"}</span>
            </div>
            <Buy product={product} />
          </div>
        </div>
      </div>
    </section>
  )
}