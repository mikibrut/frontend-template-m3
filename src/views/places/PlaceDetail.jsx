import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import placeService from '../../services/placeService';
import { Link } from 'react-router-dom';
import GoBack from '../../components/GoBack';
import { FaPen, FaTrash } from 'react-icons/fa';

export default function PlaceDetail() {
  const { placeId } = useParams();
  const { user } = useAuth();
  const [place, setPlace] = useState(null);
  const navigate = useNavigate();
  
  const getPlace = async () => {
    try {
      const response = await placeService.getPlace(placeId);
      setPlace(response);  
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getPlace();
    // eslint-disable-next-line 
  }, []);

  const handleDelete = async () => {
    try {
      await placeService.deletePlace(placeId);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="app-body">
      <h2 className="title">Place details</h2>
          {place && <div className='card-detail'>
            <h2>{place.placeName.charAt(0).toUpperCase() + place.placeName.slice(1)}</h2>
            <img src={place.image} alt={place.placeName} />
            <ul>
                <li>Place type: {place.type.map(type => type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()).join(', ')}</li>
                <li>Description: {place.description.charAt(0).toUpperCase() + place.description.slice(1)}</li>
                <li>Location: {place.location.charAt(0).toUpperCase() + place.location.slice(1)}</li>
                <li>Contact: {place.creator.email}</li>
            </ul>
            {user._id == place.creator._id &&
            <>
            <button className="edit-delete-btn"><Link  style={{ textDecoration: 'none', color:"#3d3d3d"}}  to={`/places/edit/${place._id}`}><FaPen/></Link></button>
            <button className="edit-delete-btn" onClick={handleDelete}><FaTrash/></button>
          </>
            }
          </div>}
      </div>
      <GoBack/>
    </>
  )
}
