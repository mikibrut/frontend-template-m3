import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import bandService from '../../services/bandService';
import mateService from '../../services/mateService';
import { Link } from 'react-router-dom';
import GoBack from '../../components/GoBack';
import { FaPen, FaTrash, FaInstagram, FaYoutube, FaFacebook } from 'react-icons/fa';

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

  const renderLink = (link) => {
    if (link.startsWith("https://www.instagram")) {
      return <i className="link"><FaInstagram/></i>;
    } else if (link.startsWith("https://www.youtube")) {
      return <i className="link"><FaYoutube/></i>;
    } else if (link.startsWith("https://www.facebook")) {
      return <i className="link"><FaFacebook/></i>;
    } else { 
      return link;
    }
  };

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
      <h2 className='title'><span className='title-bg'>Band details</span></h2>
          {band && <div className='card-detail'>
            <h1 className='title'>{band.bandName.charAt(0).toUpperCase() + band.bandName.slice(1)}</h1>
            
            <img src={band.image} alt={band.bandName} />
            <ul>
                <li>Musical genre: {band.musicalGenre.map(musicalGenre => musicalGenre.charAt(0).toUpperCase() + musicalGenre.slice(1).toLowerCase()).join(', ')}</li>
                <li>Bio: {band.bio.charAt(0).toUpperCase() + band.bio.slice(1)}</li>
                <li>Location: {band.location.charAt(0).toUpperCase() + band.location.slice(1)} </li>
                <li>Contact: {band.creator.email}</li>
                <li>Creator:
                  <button className="user-creator-btn">
                    <Link style={{ textDecoration: 'none', color:"#3d3d3d"}} to={`/mates/${mate._id}`}>{band.creator.username.charAt(0).toUpperCase() + band.creator.username.slice(1)}</Link>
                  </button>
                </li>
            </ul>

            {band.links.map((link, index) => {
              return (
                <li key={index}>
                  <a href={link}>
                    {renderLink(link)}
                  </a>
                </li>
              );
            })}

            {/* eslint-disable-next-line */}
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
