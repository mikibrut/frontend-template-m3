import React, { useState } from 'react'
import mateService from '../../services/mateService';
import { useNavigate } from 'react-router-dom';
import GoBack from '../../components/GoBack';


export default function AddMateForm() {
  const initialState = {
    type: [],
    image: '',
    genre: '',
    musicalInstrument: [],
    musicalGenre: []
  }
  const [newMate, setNewMate] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewMate(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setNewMate(prev => {
      return {
        ...prev,
        [name]: checked ? [...prev[name], e.target.value] : prev[name].filter(item => item !== e.target.value)
      }
    })
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addedMate = await mateService.createMate(newMate);
      navigate(`/mates/${addedMate._id}`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="checkbox-container">
        <label>Mate's Types</label>
          {['musician', 'sound technician', 'manager', 'producer', 'sound engineer', 'light technician'].map((type) => (
            <div key={type}>
              <label>{type}</label>
              <input type="checkbox" name="type" value={type} checked={newMate.type.includes(type)} onChange={handleCheckbox} />
            </div>
          ))}
        </div>
        <label>Mate's image</label>
        <input type="text" name="image" value={newMate.image} onChange={handleChange} />
        <label>Mate's genre</label>
        <input type="text" name="genre" value={newMate.genre} onChange={handleChange} />
        <p>Mate's Instrument</p>
          {['guitar', 'bass', 'drums', 'brass', 'strings', 'voice', 'piano', 'synth', 'folkloric', 'percussion', 'keys', 'other'].map((musicalInstrument) => (
            <div key={musicalInstrument}>
              <label>{musicalInstrument}</label>
              <input type="checkbox" name="musicalInstrument" value={musicalInstrument} checked={newMate.musicalInstrument.includes(musicalInstrument)} onChange={handleCheckbox} />
            </div>
          ))}
        <label>Musical genre</label>
        {['rock', 'fusion', 'flamenco', 'pop', 'hip hop', 'jazz', 'blues', 'country', 'classical', 'metal', 'folk', 'electronic', 'reggae', 'latin', 'world', 'other'].map((musicalGenre) => (
            <div key={musicalGenre}>
              <label>{musicalGenre}</label>
              <input type="checkbox" name="musicalGenre" value={musicalGenre} checked={newMate.musicalGenre.includes(musicalGenre)} onChange={handleCheckbox} />
            </div>
          ))}

        <button className="btn" type="submit">
          <span className="front">Create Mate</span> </button>
      </form>
      <GoBack/>
    </div>  
    )
}
