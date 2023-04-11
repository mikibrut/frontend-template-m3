import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import placeService from '../../services/placeService';
import GoBack from '../../components/GoBack';

export default function EditPlace() {
  const { placeId } = useParams();
  const [place, setPlace] = useState({
    placeName: '',
    description: '',
    type: [],
    image: '',
    location: ''
  });
  const [error, setError] = useState(false)
  const navigate = useNavigate();

  const getPlace = async () => {
    try {
      const response = await placeService.getPlace(placeId);
      setPlace(response);
    } catch (error) {
      console.error(error)
      setError(true)
    }
  }

  useEffect(() => {
    getPlace();
    // eslint-disable-next-line
  }, [placeId])


  const handleChange = (e) => {
    setPlace(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setPlace(prev => {
      return {
        ...prev,
        [name]: checked ? [...prev[name], e.target.value] : prev[name].filter(item => item !== e.target.value)
      }
    })
  }
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await placeService.editPlace(placeId, place);
      navigate(`/places/${placeId}`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='app-body'>
      <form onSubmit={handleSubmit}>
        {error && <p>Something went wrong. Couldn't find your PLACE</p>}
        <div className="checkbox-container">
        <label>Place Name</label>
            <input type="text" name="placeName" value={place.placeName} onChange={handleChange} />
        <label>Place Type</label>
            {['venue', 'concert hall', 'rehearsal rooms', 'recording studio', 'music-bar', 'other'].map((type) => (
                <div key={type}>
                    <label>{type}</label>
                        <input type="checkbox" name="type" value={type} checked={place.type.includes(type)} onChange={handleCheckbox} />
                </div>
            ))}
        </div>
        <label>Place image</label>
            <input type="text" name="image" value={place.image} onChange={handleChange} />
        <label>Description</label>
            <textarea name="description" value={place.description} onChange={handleChange} />
        <label>Location</label>
            <input type="text" name="location" value={place.location} onChange={handleChange} />
      
        <button className="btn" type="submit">
          <span className="front">Save changes</span> </button>
      </form>
      <GoBack/>
    </div>
  )
}
