import React, { useState, useEffect } from 'react'
import placeService from '../../services/placeService';
import authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import GoBack from '../../components/GoBack';


export default function AddPlaceForm() {
  const initialState = {
    placeName: '',
    description: '',
    type: [],
    image: '',
    location: ''
  }
  const [newPlace, setNewPlace] = useState(initialState);
  const navigate = useNavigate();
//   const { user } = useAuth();

  const handleChange = (e) => {
    setNewPlace(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setNewPlace(prev => {
      return {
        ...prev,
        [name]: checked ? [...prev[name], e.target.value] : prev[name].filter(item => item !== e.target.value)
      }
    })
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    //   await authService.addUserRole(user._id, 'place');
      const addedPlace = await placeService.createPlace(newPlace);
      navigate(`/places/${addedPlace._id}`)
    } catch (error) {
      console.error(error)
    }
  }
  
  return (
    <div className='app-body'>
        <form onSubmit={handleSubmit}>
        <div className="checkbox-container">
            <label>Place Name</label>
                <input type="text" name="placeName" value={newPlace.placeName} onChange={handleChange} />
            <label>Place Type</label>
                {['venue', 'concert hall', 'rehearsal rooms', 'recording studio', 'music-bar', 'other'].map((type) => (
                    <div key={type}>
                        <label>{type}</label>
                            <input type="checkbox" name="type" value={type} checked={newPlace.type.includes(type)} onChange={handleCheckbox} />
                    </div>
                ))}
            <label>Place image</label>
                <input type="text" name="image" value={newPlace.image} onChange={handleChange} />
            <label>Description</label>
                <textarea name="description" value={newPlace.description} onChange={handleChange} />
            <label>Location</label>
                <input type="text" name="location" value={newPlace.location} onChange={handleChange} />

        </div>  

            <button className="btn" type="submit">
                <span className="front">Create Place</span> 
            </button>
       
        </form>
        <GoBack/>
    </div>  
    )
}
