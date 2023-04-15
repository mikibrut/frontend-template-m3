import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import mateService from '../../services/mateService';
import { Link } from 'react-router-dom';
import GoBack from '../../components/GoBack';
import { FaPen, FaTrash, FaInstagram, FaYoutube, FaFacebook } from 'react-icons/fa';

export default function MateDetail() {
  const { mateId } = useParams();
  const { user } = useAuth();
  const [mate, setMate] = useState(null);
  const navigate = useNavigate();
  
  const getMate = async () => {
    try {
      const response = await mateService.getMate(mateId);
      setMate(response);  
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
    } else { 
      return link;
    }
  };

  useEffect(() => {
    getMate();
    // eslint-disable-next-line 
  }, []);

  const handleDelete = async () => {
    try {
      await mateService.deleteMate(mateId);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="app-body">
        <h2 className='title'><span className='title-bg'>Mate details</span></h2>
          {mate && <div className='card-detail'>
        
            <h1 className='title'>{mate.creator.username.charAt(0).toUpperCase() + mate.creator.username.slice(1)}</h1>
            
            <img src={mate.image} alt={mate.creator.username} />
            
            <ul>
                <li>Mate type: {mate.type.map(type => type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()).join(', ')}</li>
                <li>Musical genre: {mate.musicalGenre.map(musicalGenre => musicalGenre.charAt(0).toUpperCase() + musicalGenre.slice(1).toLowerCase()).join(', ')}</li>
                <li>Instrument: {mate.musicalInstrument.map(instrument => instrument.charAt(0).toUpperCase() + instrument.slice(1).toLowerCase()).join(', ')}</li>
                <li>Location: {mate.location.charAt(0).toUpperCase() + mate.location.slice(1)}</li>
                <li>Genre: {mate.genre.charAt(0).toUpperCase() + mate.genre.slice(1)}</li>
                <li>Contact: {mate.creator.email}</li>
            </ul>

            {mate.links.map((link, index) => {
              return (
                <li key={index}>
                  <a href={link}>
                    {renderLink(link)}
                  </a>
                </li>
              );
            })}
            
            {/* eslint-disable-next-line */}
            {user._id == mate.creator._id &&
            <>
              <button className="user-btn"><Link  style={{ textDecoration: 'none', color:"#3d3d3d"}}  to={`/mates/edit/${mate._id}`}><FaPen/></Link></button>
              <button className="user-btn" onClick={handleDelete}><FaTrash/></button>
            </>
            }
          
          </div>}
      </div>
      <GoBack/>
    </>
  )
}
