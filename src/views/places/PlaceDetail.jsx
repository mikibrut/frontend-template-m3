import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import placeService from '../../services/placeService';
import mateService from '../../services/mateService';
import { Link } from 'react-router-dom';
import GoBack from '../../components/GoBack';
import { FaPen, FaTrash, FaInstagram, FaYoutube, FaFacebook, FaSpotify  } from 'react-icons/fa';

export default function PlaceDetail() {
  const { placeId } = useParams();
  const { user } = useAuth();
  const [place, setPlace] = useState(null);
  const [mate, setMate] = useState(null);
  const navigate = useNavigate();
  
  // const getPlace = async () => {
  //   try {
  //     const response = await placeService.getPlace(placeId);
  //     setPlace(response);  
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  const getPlace = async () => {
    try {
      let creatorMate = undefined;
      const response = await placeService.getPlace(placeId);
      if (response){
        creatorMate = await mateService.getMatesByCreator(response.creator._id);
      }
      setPlace(response); 
      setMate(creatorMate[0]);  
    } catch (error) {
      console.error(error);
    }
  }

  const renderLink = (link) => {
    if (link.startsWith("https://www.instagram.com/")) {
      return <i className="link"><FaInstagram/></i>;
    } else if (link.startsWith("https://www.youtube.com/")) {
      return <i className="link"><FaYoutube/></i>;
    } else if (link.startsWith("https://www.facebook.com/")) {
      return <i className="link"><FaFacebook/></i>;
    } else if (link.startsWith("https://open.spotify")) {
      return <i className="link"><FaSpotify/></i>;
    } else { 
      return link;
    }
  };

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
      <h2 className='title'><span className='title-bg'>Place details</span></h2>
          {place && 
          
          <div className='card-detail'>
            
            <h1 className='title'>{place.placeName.charAt(0).toUpperCase() + place.placeName.slice(1)}</h1>
            
            <img src={place.image} alt={place.placeName} />
            
            <ul>
                <li>Place type: {place.type.map(type => type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()).join(', ')}</li>
                <li>Description: {place.description.charAt(0).toUpperCase() + place.description.slice(1)}</li>
                <li>Location: {place.location.charAt(0).toUpperCase() + place.location.slice(1)}</li>
                <li>Contact: {place.creator.email}</li>
                <li>Creator:
                  <button className="user-creator-btn">
                    <Link style={{ textDecoration: 'none', color:"#3d3d3d"}} to={`/mates/${mate._id}`}>{place.creator.username.charAt(0).toUpperCase() + place.creator.username.slice(1)}</Link>
                  </button>
                </li>
            </ul>

            {place.links.map((link, index) => {
              return (
                <li className='link-list' key={index}>
                  <a href={link}>
                    {renderLink(link)}
                  </a>
                </li>
              );
            })}

            {/* eslint-disable-next-line */}
            {user._id == place.creator._id &&
            <>
              <button className="user-btn"><Link  style={{ textDecoration: 'none', color:"#3d3d3d"}}  to={`/places/edit/${place._id}`}><FaPen/></Link></button>
              <button className="user-btn" onClick={handleDelete}><FaTrash/></button>
            </>
            }

          </div>
          }

      </div>
      <GoBack/>
    </>
  )
}
