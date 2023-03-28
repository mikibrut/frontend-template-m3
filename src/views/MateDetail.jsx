import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import mateService from '../services/mateService';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import GoBack from '../components/GoBack';

export default function MateDetail() {
  const { id } = useParams();
  const [mate, setMate] = useState(null);
  const navigate = useNavigate();
  const { isLoggedIn  } = useContext(AuthContext); 
  
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
    <div>
      {isLoggedIn ?  
      <>
      <div className="container">
      <h2>Mate details</h2>
        {mate && <div className='card'>
          <h1>{mate.user.username}</h1>
          <img src={mate.image} alt={mate.user.username} />
          <ul>
              <li>Musical genre: {mate.musicalGenre}</li>
              <li>Instrument: {mate.musicalInstrument}</li>
              <li>Genre: {mate.genre}</li>
          </ul>
          <button><Link to={`/edit/${mate._id}`}>Edit</Link></button>
          <button onClick={handleDelete}>Delete</button>
        </div>}
        <GoBack/>
      </div>
      </>
      : 
      <>
      <div className="container">
        <h4>Sorry you have to be logged to see this content</h4>
        <button><Link to="/login">Login</Link></button>
      </div>
      </>
      }
    </div>
  )
}
