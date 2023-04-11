import React, { useState } from 'react'
import advertService from '../../services/advertService';
import { useNavigate } from 'react-router-dom';
import GoBack from '../../components/GoBack';


export default function AddAdvertForm() {
  const initialState = {
    title:'',
    message: '',
    type: '',
    location:''
  }
  const [newAdvert, setNewAdvert] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewAdvert(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addedAdvert = await advertService.createAdvert(newAdvert);
      navigate(`/adverts/${addedAdvert._id}`)
    } catch (error) {
      console.error(error)
    }
  }

  

  return (
    <div className='app-body'>
      <form onSubmit={handleSubmit}>
        <label>Location</label>
            <input type="text" name="location" value={newAdvert.location} onChange={handleChange} />
        <label>Title</label>
            <input type="text" name="title" value={newAdvert.title} onChange={handleChange} />
        <label>Message</label>
            <input type="text" name="message" value={newAdvert.message} onChange={handleChange} />
        <label>Type:</label>
        <select className="select-style" name="type" value={newAdvert.type} onChange={handleChange}>
            <option value="">Select type</option>
                {['mate looking for mate', 'mate looking for band', 'mate looking for place', 'band looking for band', 'band looking for mate', 'band looking for place', 'place looking for band', 'place looking for mate'].map((type) => (
            <option key={type} value={type}>
                    {type}
            </option>
                ))}
        </select>
        <button className="btn" type="submit">
            <span className="front">Create Band</span> </button>
      </form>
      <GoBack/>
    </div>  
    )
}