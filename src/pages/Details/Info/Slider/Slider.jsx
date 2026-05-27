import { useState } from 'react'
import './Slider.scss'
 
 
export default function Slider({product, setOpenSlider}) {
 
  const [closing, setClosing] = useState(false)
  
  function closeSlider(){
    setClosing(true)
    setTimeout(() => {
      setOpenSlider(false)
    }, 500)
  }

  return (
    <div className='slider'>
      <div onClick={closeSlider} className={`slider__dark-background ${closing && "slider__dark-background--closing"}`}>
        <div onClick={e => e.stopPropagation()} className={`slider__main-container ${closing && "slider__main-container--closing"}`}>
          
        </div>
      </div>
    </div>
  )
}