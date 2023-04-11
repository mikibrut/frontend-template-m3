import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import bandService from '../../services/bandService';
import GoBack from '../../components/GoBack';

export default function EditBand() {
  const { bandId } = useParams();
  const [band, setBand] = useState({
    bandName:'',
    image: '',
    bio: '',
    musicalGenre: [],
    // links: []
  });
  const [error, setError] = useState(false)
  const navigate = useNavigate();

  const getBand = async () => {
    try {
      const response = await bandService.getBand(bandId);
      setBand(response);
    } catch (error) {
      console.error(error)
      setError(true)
    }
  }

  useEffect(() => {
    getBand();
    // eslint-disable-next-line
  }, [bandId])


  const handleChange = (e) => {
    setBand(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setBand(prev => {
      return {
        ...prev,
        [name]: checked ? [...prev[name], e.target.value] : prev[name].filter(item => item !== e.target.value)
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await bandService.editBand(bandId, band);
      navigate(`/bands/${bandId}`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            {error && <p>Something went wrong. Couldn't find your BAND</p>}
            <label>Band's Name</label>
                <input type="text" name="bandName" value={band.bandName} onChange={handleChange} />
            <label>Band's Image</label>
                <input type="text" name="image" value={band.image} onChange={handleChange} />
            <label>Bio</label>
                <input type="text" name="bio" value={band.bio} onChange={handleChange} />
            <label>Musical genre</label>
                {['rock', 'fusion', 'flamenco', 'pop', 'hip hop', 'jazz', 'blues', 'country', 'classical', 'metal', 'folk', 'electronic', 'reggae', 'latin', 'world', 'other'].map((musicalGenre) => (
                    <div key={musicalGenre}>
                        <label>{musicalGenre}</label>
                            <input type="checkbox" name="musicalGenre" value={musicalGenre} checked={band.musicalGenre.includes(musicalGenre)} onChange={handleCheckbox} />
                    </div>
                ))}
            <button className="btn" type="submit">
                <span className="front">Save changes</span> </button>
        </form>
        <GoBack/>
    </div>
  )
}
