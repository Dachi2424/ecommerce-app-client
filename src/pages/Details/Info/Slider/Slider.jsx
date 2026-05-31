import { useState } from 'react'
import {X, ChevronLeft, ChevronRight, Minus, Plus} from "lucide-react"
import './Slider.scss'
 
 
export default function Slider({product, setOpenSlider}) {
 
  const [closing, setClosing] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [scale, setScale] = useState(1)

  function closeSlider(){
    setClosing(true)
    setTimeout(() => {
      setOpenSlider(false)
    }, 500)
  }


  function changeIndex(direction){
    setScale(1)
    if(direction === "decrease"){
      if(currentIndex <= 0){
        return;
      } else if(currentIndex >= 1){
        setCurrentIndex(prev => prev - 1)
      }
    }

    else if(direction === "increase"){
      const imageQuantity = product.imageUrl?.length
      if(currentIndex === imageQuantity - 1){
        return;
      } else if(currentIndex < imageQuantity - 1){
        setCurrentIndex(prev => prev + 1)
      }
    }
  }


  function zoomIn(){
    setScale(prev => Math.min(prev + 0.5, 3))
  }
  function zoomOut(){
    setScale(prev => Math.max(prev - 0.5, 1))
  }


  return (
    <div className='slider'>
      <div onClick={closeSlider} className={`slider__dark-background ${closing && "slider__dark-background--closing"}`}>
        <div onClick={e => e.stopPropagation()} className={`slider__main-container ${closing && "slider__main-container--closing"}`}>
          <X onClick={closeSlider} className='slider__xmark' size={16} />
          <div className='slider__big-images-wrapper'>
            <div 
              onClick={(e) => {
                changeIndex("decrease")
                e.stopPropagation()
              }} 
              className='slider__arrow-container slider__arrow-container--left'
            >
              <ChevronLeft strokeWidth={1} />
            </div>
            {/* images here */}
            <div 
              className='slider__big-images-container'
              style={{
                transform: `translateX(-${currentIndex * 100}%)`
              }}  
            >
              {product.imageUrl?.map((image, index) => (
                <div className='slider__images-wrapper-inner-container' key={index}>
                  <img 
                    className='slider__image' 
                    src={image}
                    alt="product image" 
                    onClick={() => setScale(prev => prev > 1 ? 1 : 2)}
                    style={{
                      transform: `scale(${index === currentIndex ? scale : 1})`,
                      cursor: scale > 1 ? "zoom-out" : "zoom-in"
                    }}
                  />
                </div>
              ))}
            </div>
            <div 
              onClick={(e) => {
                changeIndex("increase")
                e.stopPropagation()
              }} 
              className='slider__arrow-container slider__arrow-container--right'
            >
              <ChevronRight strokeWidth={1} />
            </div>
          </div>
          <div className='slider__zoom-buttons-container'>
            <button 
              className='slider__zoom-button'
              onClick={zoomOut}
            ><Minus size={13} strokeWidth={3.2} /></button>
            <button 
              className='slider__zoom-button'
              onClick={zoomIn}  
            ><Plus size={13} strokeWidth={3.2}/></button>
          </div>
          <div className='slider__small-images-wrapper'>
            <div className='slider__small-images-container'>
              {product.imageUrl?.map((image, index) => (
                <div 
                  key={index} 
                  className={`slider__small-image-box ${currentIndex === index ? "slider__small-image-box--active" : ""}`}
                  onClick={() => setCurrentIndex(index)}  
                >
                  <img className='slider__small-image' src={image} alt="product image" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}