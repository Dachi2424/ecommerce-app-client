import { useEffect, useState } from 'react'
import { Plus, Trash } from "lucide-react"
import './Comments.scss'
import axios from "axios"
import User from "../../../assets/user-image.webp"
 
 
export default function Comments({productId}) {
 
  const [commentList, setCommentList] = useState([])
  const [newComment, setNewComment] = useState("")
  const [rating, setRating] = useState(null)
  const [hovered, setHovered] = useState(0)
  const [error, setError] = useState(false)
  const ratingLabels = {
    1: "I didn't like it",
    2: "It was okay",
    3: "It was good",
    4: "I liked it",
    5: "I loved it",
  }


  useEffect(() => {
    async function getAllComments(){
      try{
        const res = await axios.get(`http://localhost:3001/comments/${productId}`)
        // console.log(res.data)
        setCommentList(res.data)
      } catch(err){
        console.log(err)
      }
    }
    getAllComments()
  }, [])



  async function handleAddComment(){
    try{
      const res = await axios.post(`http://localhost:3001/comments/${productId}`, {commentBody: newComment, rating}, {withCredentials: true})
      console.log(res.data)
      setError(false)
      setNewComment("")
      setCommentList([...commentList, res.data])
    } catch(err){
      console.log(err.response.data.error)
      setError(err.response.data.error)
    }
  }


  return (
    <section className='comments'>
      <div className='comments__main-container'>
        <h2 className='comments__heading'>Comments</h2>
        <hr />
        <div className='comments__textarea-container'>
          <textarea 
            className='comments__textarea' 
            value={newComment}
            onChange={e => {
              setNewComment(e.target.value);
              setError(false)
            }}  
          />
          <button onClick={() => setNewComment("")} className='comments__clear-comment-button'><span className='comments__clear-text comments__clear-text--mobile'>Clear</span> <Trash size={13} strokeWidth={2.5} /></button>
          <button onClick={handleAddComment} className='comments__add-comment-button'><span className='comments__publish-text comments__publish-text--mobile'>Publish</span> <Plus size={13} strokeWidth={2.5}/></button>
        </div>
        <div className='comments__rating-main-container'>
          {[1, 2, 3, 4, 5].map(star => (
            <i 
              key={star} 
              className={`${star <= hovered || star <= rating ? "fa-solid" : "fa-regular"} fa-star comments__rating-main-icon`}
              onMouseOver={() => setHovered(star)}
              onMouseOut={() => setHovered(0)}
              onClick={() => {
                setRating(star); 
                setError(false)
              }} 
            ></i>
          ))}
          <span className='comments__rating-status'>{rating ? `/ ${ratingLabels[rating]}` : ""}</span>
          {error && <span className='comments__comment-error'>{error}</span>}
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