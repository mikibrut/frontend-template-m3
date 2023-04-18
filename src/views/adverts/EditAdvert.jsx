import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import advertService from '../../services/advertService';
import GoBack from '../../components/GoBack';

export default function EditAdvert() {
  const { advertId } = useParams();
  const [advert, setAdvert] = useState({
    title:'',
    message: '',
    type: ''
  });
  const [error, setError] = useState(false)
  const navigate = useNavigate();

  const getAdvert = async () => {
    try {
      const response = await advertService.getAdvert(advertId);
      setAdvert(response);
    } catch (error) {
      console.error(error)
      setError(true)
    }
  }

  useEffect(() => {
    getAdvert();
    // eslint-disable-next-line
  }, [advertId])

  const handleChange = (e) => {
    setAdvert(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await advertService.editAdvert(advertId, advert);
      navigate(`/adverts/${advertId}`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            {error && <p>Something went wrong. Couldn't find your ADVERT</p>}
            <label>Title</label>
                <input type="text" name="title" value={advert.title} onChange={handleChange} />
            <label>Message</label>
                <input type="text" name="message" value={advert.message} onChange={handleChange} />
            <label>Type:</label>
            <select name="type" value={advert.type} onChange={handleChange}>
                <option value="">Select type</option>
                {['mate looking for mate', 'mate looking for band', 'mate looking for place', 'band looking for band', 'band looking for mate', 'band looking for place', 'place looking for band', 'place looking for mate'].map((type) => (
                <option key={type} value={type}>
                    {type}
                </option>
                ))}
            </select>
            <button className="btn" type="submit">
                <span className="front">Save changes</span> </button>
        </form>
        <GoBack/>
    </div>
  )
}