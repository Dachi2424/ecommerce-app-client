import './Details.scss'
import Comments from "./Comments/Comments"
import Info from "./Info/Info"
import {useParams} from "react-router-dom"


export default function Details() {
 
  const {id} = useParams()

  return (
    <section className='details'>
      <Info id={id} />
      <Comments productId={id} />
    </section>
  )
}