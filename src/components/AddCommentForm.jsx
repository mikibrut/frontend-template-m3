import React, { useState } from 'react'
import { useNavigate, useParams} from 'react-router-dom';
import './AddCommentForm.css';
import advertService from '../services/advertService';
import toast from 'react-hot-toast';


export default function AddCommentForm() {
  const initialState = {
    title:'',
    text: ''
  }
  const [newComment, setNewComment] = useState(initialState);
  const navigate = useNavigate();
  const { advertId } = useParams();
  
  

  const handleChange = (e) => {
    setNewComment(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await advertService.createComment(advertId, newComment);
      toast.success('Comment created successfully!');
      if(response){
        navigate(`/adverts/${advertId}`);
      }
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong... 💩');
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
            <input type="text" required={true} name="title" value={newComment.title} onChange={handleChange} />
        <label>Message</label>
            <textarea required={true} name="text" value={newComment.text} onChange={handleChange} />
        <button className="btn" type="submit">
            <span className="front">Send Comment</span> </button>
      </form>
    </div>  
    )
}