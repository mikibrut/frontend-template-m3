import React, { useState } from 'react'
import bandService from '../../services/bandService';
import { useNavigate } from 'react-router-dom';
import GoBack from '../../components/GoBack';


export default function AddBandForm() {
  const initialState = {
    bandName:'',
    image: '',
    bio: '',
    musicalGenre: [],
    // links: []
  }
  const [newBand, setNewBand] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewBand(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setNewBand(prev => {
      return {
        ...prev,
        [name]: checked ? [...prev[name], e.target.value] : prev[name].filter(item => item !== e.target.value)
      }
    })
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addedBand = await bandService.createBand(newBand);
      navigate(`/bands/${addedBand._id}`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Band's Name</label>
            <input type="text" name="bandName" value={newBand.bandName} onChange={handleChange} />
        <label>Band's Image</label>
            <input type="text" name="image" value={newBand.image} onChange={handleChange} />
        <label>Bio</label>
            <input type="text" name="bio" value={newBand.bio} onChange={handleChange} />
        <label>Musical genre</label>
            {['rock', 'fusion', 'flamenco', 'pop', 'hip hop', 'jazz', 'blues', 'country', 'classical', 'metal', 'folk', 'electronic', 'reggae', 'latin', 'world', 'other'].map((musicalGenre) => (
                <div key={musicalGenre}>
                    <label>{musicalGenre}</label>
                        <input type="checkbox" name="musicalGenre" value={musicalGenre} checked={newBand.musicalGenre.includes(musicalGenre)} onChange={handleCheckbox} />
                </div>
                ))}
        <button className="btn" type="submit">
            <span className="front">Create Band</span> </button>
      </form>
      <GoBack/>
    </div>  
    )
}