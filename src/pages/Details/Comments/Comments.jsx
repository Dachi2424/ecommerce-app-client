import { useEffect, useState } from 'react'
import { Plus, Trash } from "lucide-react"
import './Comments.scss'
import axios from "axios"
import User from "../../../assets/user-image.webp"
 
 
export default function Comments({productId}) {
 
  const [commentList, setCommentList] = useState([])

  useEffect(() => {
    async function getAllComments(){
      try{
        const res = await axios.get(`http://localhost:3001/comments/${productId}`)
        console.log(res.data)
        setCommentList(res.data)
      } catch(err){
        console.log(err)
      }
    }

    getAllComments()
  }, [])

  return (
    <section className='comments'>
      <div className='comments__main-container'>
        <h2 className='comments__heading'>Comments</h2>
        <hr />
        <div className='comments__textarea-container'>
          <textarea className='comments__textarea' />
          <button className='comments__clear-comment-button'><span className='comments__clear-text comments__clear-text--mobile'>Clear</span> <Trash size={13} strokeWidth={2.5} /></button>
          <button className='comments__add-comment-button'><span className='comments__publish-text comments__publish-text--mobile'>Publish</span> <Plus size={13} strokeWidth={2.5}/></button>
        </div>
        <div className='comments__grid-container'>
          {commentList.map(comment => (
            <div key={comment.id} className='comments__comment-box'>
              <div className='comments__image-div'>
                <img className='comments__image' src={User} alt="User image" />
              </div>
              <div className='comments__right-div'>
                <div className='comments__user-info-div'>
                  <div className='comments__user-info'>
                    <span className='comments__username'>{comment.User?.username}</span>
                  </div>
                  <div className='comments__rating-container'>
                    {Array.from({length: comment.rating}, (_, i) => (
                      <i key={i} className="fa-solid fa-star comments__star-icon"></i>
                    ))}
                  </div>
                </div>
                <div className='comments__commentbody-div'>
                  <p className='comments__comment'>{comment.commentBody}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}