import './UserDetails.scss'
import { ChevronLeft, Pencil } from "lucide-react"
import { AuthContext } from "../../../context/AuthContext"
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
 



export default function UserDetails() {
 
  const navigate = useNavigate()
  const {user, changeInfo} = useContext(AuthContext)
  const [formData, setFormData] = useState({
    phone: "",
    idNumber: "",
    username: "",
    email: ""
  })
  const [editingField, setEditingField] = useState(null)
  
  useEffect(() => {
    if(user){
      setFormData({
        phone: user.phone || "",
        idNumber: user.idNumber || "",
        username: user.username || "",
        email: user.email || ""
      })
    }
  }, [user])


  function handleChange(e){
    setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  function toggleEdit(field){
    setEditingField(prev => prev === field ? null : field)
  }
  
  async function handleSubmit(e){
    e.preventDefault()
    await changeInfo(formData)
    setEditingField(null)
  }



  return (
    <div className='userDetails'>
      <span onClick={() => navigate("/profile")} className='userDetails__heading'><ChevronLeft size={22} strokeWidth={1.6} /> Personal Information</span>
      <hr />
      <form onSubmit={handleSubmit} className='userDetails__form'>
        <div className='userDetails__input-container'>
          <input 
            className="userDetails__input" 
            type="number"
            placeholder='Phone'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            readOnly={editingField !== "phone"}
          />
          <Pencil onClick={() => toggleEdit("phone")} size={20} strokeWidth={1.6} className='userDetails__pencil-icon' />
        </div>
        <div className='userDetails__input-container'>
          <input 
            className="userDetails__input" 
            type="email" 
            name='email'
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
            readOnly={editingField !== "email"}
          />
          <Pencil onClick={() => toggleEdit("email")} size={20} strokeWidth={1.6} className='userDetails__pencil-icon' />
        </div>
        <div className='userDetails__input-container'>
          <input 
            className="userDetails__input" 
            type="text" 
            name="username"
            placeholder='Username'
            value={formData.username}
            onChange={handleChange}
            readOnly={editingField !== "username"}
          />
          <Pencil onClick={() => toggleEdit("username")} size={20} strokeWidth={1.6} className='userDetails__pencil-icon' />
        </div>
        <div className='userDetails__input-container'>
          <input 
            className="userDetails__input" 
            type="number"
            name="idNumber"
            placeholder='ID number'
            value={formData.idNumber}
            onChange={handleChange}
            readOnly={editingField !== "idNumber"}
          />
          <Pencil onClick={() => toggleEdit("idNumber")} size={20} strokeWidth={1.6} className='userDetails__pencil-icon' />
        </div>
        <button className='userDetails__update-button' type='submit'>Update Profile</button>
      </form>
    </div>
  )
}