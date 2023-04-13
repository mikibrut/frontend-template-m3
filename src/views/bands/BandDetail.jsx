import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import bandService from '../../services/bandService';
import mateService from '../../services/mateService';
import { Link } from 'react-router-dom';
import GoBack from '../../components/GoBack';
import { FaPen, FaTrash } from 'react-icons/fa';

export default function BandDetail() {
  const { bandId } = useParams();
  const { user } = useAuth();
  const [band, setBand] = useState(null);
  const [mate, setMate] = useState(null);
  const navigate = useNavigate();
  
  const getBand = async () => {
    try {
      let creatorMate = undefined;
      const response = await bandService.getBand(bandId);
      if (response){
        creatorMate = await mateService.getMatesByCreator(response.creator._id);
      }
      setBand(response); 
      setMate(creatorMate[0]);  
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getBand();
    // eslint-disable-next-line 
  }, []);

  const handleDelete = async () => {
    try {
      await bandService.deleteBand(bandId);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="app-body">
      <h2 className="title">Mate details</h2>
          {band && <div className='card-detail'>
            <h2>{band.bandName.charAt(0).toUpperCase() + band.bandName.slice(1)}</h2>
            
            <img src={band.image} alt={band.bandName} />
            <ul>
                <li>Musical genre: {band.musicalGenre.map(musicalGenre => musicalGenre.charAt(0).toUpperCase() + musicalGenre.slice(1).toLowerCase()).join(', ')}</li>
                <li>Bio: {band.bio.charAt(0).toUpperCase() + band.bio.slice(1)}</li>
                {/* <li>Links: {band.creator.email}</li> */}
                <li>Location: {band.location.charAt(0).toUpperCase() + band.location.slice(1)} </li>
                <li>Contact: {band.creator.email}</li>
                <li>
                  <button>
                    <Link to={`/mates/${mate._id}`}>{band.creator.username.charAt(0).toUpperCase() + band.creator.username.slice(1)}</Link>
                  </button>
                </li>
            </ul>
            {user._id == band.creator._id &&
            <>
              <button className="user-btn"><Link  style={{ textDecoration: 'none', color:"#3d3d3d"}}  to={`/bands/edit/${band._id}`}><FaPen/></Link></button>
              <button className="user-btn" onClick={handleDelete}><FaTrash/></button>
            </>
            }
          </div>}
      </div>
      <GoBack/>
    </>
  )
}
