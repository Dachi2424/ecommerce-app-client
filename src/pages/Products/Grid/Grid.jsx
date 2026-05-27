import {ShoppingCart, Funnel} from "lucide-react"
import {useNavigate} from "react-router-dom"
import './Grid.scss'
 
 
export default function Grid({products, setProducts}) {
 
  const navigate = useNavigate()

  function handleNavigate(id){
    navigate(`/details/${id}`)
  }

  return (
    <div className='grid'>
      <div className='grid__upper-container'>
        <select className="grid__select"> 
          <option selected>sort</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
        <button className="grid__filter-button"><Funnel size={14} /> Filter</button>
      </div>
      <div className='grid__products-container'>
        {products.map(product => (
          <div key={product.id} className='product-card'>
            <div className='product-card__image-container'>
              <img className='product-card__image product-card__image--primary' src={product.imageUrl[0]} alt={product.name} />
              <img className='product-card__image product-card__image--secondary' src={product.imageUrl[1]} alt={product.name} />
            </div>
            <p className='product-card__name'>{product.name}</p>
            <h1 className='product-card__price'>{product.price}<span>₾</span></h1>
            <div className='product-card__button-container'>
              <div className='product-card__cart-button'><ShoppingCart size={14} strokeWidth={1.4}/></div>
              <button onClick={() => handleNavigate(product.id)} className='product-card__buy-button'>See details</button>
            </div>
          </div>
        ))}
      </div>
      <div className='grid__lower-container'>

      </div>
    </div>
  )
}