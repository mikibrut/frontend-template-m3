import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import mateService from '../../services/mateService';
import { Link } from 'react-router-dom';
import GoBack from '../../components/GoBack';

export default function MateDetail() {
  const { id } = useParams();
  const [mate, setMate] = useState(null);
  const navigate = useNavigate();
  
  const getMate = async () => {
    try {
      const mate = await mateService.getMate(id);
      setMate(mate);  
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getMate();
  }, []);

  const handleDelete = async () => {
    try {
      await mateService.deleteMate(id);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="container">
        <h2>Mate details</h2>
          {mate && <div className='card'>
            <p>{mate.creator.username.charAt(0).toUpperCase() + mate.creator.username.slice(1)}</p>
            <img src={mate.image} alt={mate.creator.username} />
            <ul>
                <li>Mate type: {mate.type.map(type => type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()).join(', ')}</li>
                <li>Musical genre: {mate.musicalGenre.map(musicalGenre => musicalGenre.charAt(0).toUpperCase() + musicalGenre.slice(1).toLowerCase()).join(', ')}</li>
                <li>Instrument: {mate.musicalInstrument.map(instrument => instrument.charAt(0).toUpperCase() + instrument.slice(1).toLowerCase()).join(', ')}</li>
                <li>Genre: {mate.genre.charAt(0).toUpperCase() + mate.genre.slice(1)}</li>
                <li>Contact: {mate.creator.email}</li>
            </ul>
            <button><Link to={`/edit/${mate._id}`}>Edit</Link></button>
            <button onClick={handleDelete}>Delete</button>
          </div>}
      </div>
      <GoBack/>
    </>
  )
}
