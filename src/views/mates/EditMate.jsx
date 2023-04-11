import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import mateService from '../../services/mateService';
import GoBack from '../../components/GoBack';

export default function EditMate() {
  const { mateId } = useParams();
  const [mate, setMate] = useState({
    type: [],
    image: '',
    genre: '',
    musicalGenre: [],
    musicalInstrument: [],
    location:''
  });
  const [error, setError] = useState(false)
  const navigate = useNavigate();

  const getMate = async () => {
    try {
      const response = await mateService.getMate(mateId);
      setMate(response);
    } catch (error) {
      console.error(error)
      setError(true)
    }
  }

  useEffect(() => {
    getMate();
    // eslint-disable-next-line
  }, [mateId])


  const handleChange = (e) => {
    setMate(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setMate(prev => {
      return {
        ...prev,
        [name]: checked ? [...prev[name], e.target.value] : prev[name].filter(item => item !== e.target.value)
      }
    })
  }
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await mateService.editMate(mateId, mate);
      navigate(`/mates/${mateId}`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='app-body'>
      <form onSubmit={handleSubmit}>
        {error && <p>Something went wrong. Couldn't find your MATE</p>}
        <div className="checkbox-container">
            <label>Mate's Types</label>
            {['musician', 'sound technician', 'manager', 'producer', 'sound engineer', 'light technician'].map((type) => (
                <div key={type}>
                    <label>{type}</label>
                        <input type="checkbox" name="type" value={type} checked={mate.type.includes(type)} onChange={handleCheckbox} />
                </div>
            ))}
        </div>
        <label>Mate's image</label>
            <input type="text" name="image" value={mate.image} onChange={handleChange} />
        <label>Mate's genre</label>
            <input type="text" name="genre" value={mate.genre} onChange={handleChange} />
        <p>Mate's Instrument</p>
          {['guitar', 'bass', 'drums', 'brass', 'strings', 'voice', 'piano', 'synth', 'folkloric', 'percussion', 'keys', 'other'].map((musicalInstrument) => (
            <div key={musicalInstrument}>
              <label>{musicalInstrument}</label>
                <input type="checkbox" name="musicalInstrument" value={musicalInstrument} checked={mate.musicalInstrument.includes(musicalInstrument)} onChange={handleCheckbox} />
            </div>
          ))}
        <label>Musical genre</label>
        {['rock', 'fusion', 'flamenco', 'pop', 'hip hop', 'jazz', 'blues', 'country', 'classical', 'metal', 'folk', 'electronic', 'reggae', 'latin', 'world', 'other'].map((musicalGenre) => (
            <div key={musicalGenre}>
              <label>{musicalGenre}</label>
                <input type="checkbox" name="musicalGenre" value={musicalGenre} checked={mate.musicalGenre.includes(musicalGenre)} onChange={handleCheckbox} />
            </div>
          ))}
          <label>Location</label>
            <input type="text" name="location" value={mate.location} onChange={handleChange} />

        <button className="btn" type="submit">
          <span className="front">Save changes</span> </button>
      </form>
      <GoBack/>
    </div>
  )
}
