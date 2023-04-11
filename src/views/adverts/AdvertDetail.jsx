import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import bandService from '../../services/bandService';
import mateService from '../../services/mateService';
import advertService from '../../services/advertService';
import placeService from '../../services/placeService';
import { Link } from 'react-router-dom';
import GoBack from '../../components/GoBack';
import { FaPen, FaTrash } from 'react-icons/fa';

export default function BandDetail() {
  const { advertId } = useParams();
  const { user } = useAuth();
  const [advert, setAdvert] = useState(null);
  const [band, setBand] = useState(null);
  const [mate, setMate] = useState(null);
  const [place, setPlace] = useState(null);
  const navigate = useNavigate();
  
  const getAdvert = async () => {
    try {
      let creator = undefined;
      const response = await advertService.getAdvert(advertId);
      if (response.type.startsWith('mate looking for')){
        creator = await mateService.getMatesByCreator(response.creator._id);
        setMate(creator[0]);
      }
      if (response.type.startsWith('band looking for')){
        creator = await bandService.getBandsByCreator(response.creator._id);
        setBand(creator[0]); 
      }
      if (response.type.startsWith('place looking for')){
        creator = await placeService.getPlacesByCreator(response.creator._id);
        setPlace(creator[0]);  
      }
      setAdvert(response)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAdvert();
    // eslint-disable-next-line 
  }, []);

  const handleDelete = async () => {
    try {
      await advertService.deleteAdvert(advertId);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="app-body">
        <h2 className='title'>Advert details</h2>
          {advert && <div className='card-detail'>
            <h4>{advert.type.charAt(0).toUpperCase() + advert.type.slice(1)}</h4>
            <h2>{advert.title.charAt(0).toUpperCase() + advert.title.slice(1)}</h2>
            <p>{advert.message.charAt(0).toUpperCase() + advert.message.slice(1)}</p>
            <p>Location: {advert.location.charAt(0).toUpperCase() + advert.location.slice(1)}</p>
            <p>Contact: {advert.creator.email}</p>
            {
              <div>Add creator: 
                {band && 
                  <button>
                    <Link to={`/bands/${band._id}`}>{band.bandName}</Link>
                  </button>
                }
                {mate && 
                  <button>
                    {console.log('Mate inside return', mate)}
                    <Link to={`/mates/${mate._id}`}>{mate.creator.username}</Link>
                  </button>
                }
                {place && 
                  <button>
                    <Link to={`/places/${place._id}`}>{place.placeName}</Link>
                  </button>
                }
              </div>
            }
            
            {user._id == advert.creator._id &&
            <>
                <button className="edit-delete-btn"><Link  style={{ textDecoration: 'none', color:"#3d3d3d"}}  to={`/adverts/edit/${advert._id}`}><FaPen/></Link></button>
                <button className="edit-delete-btn" onClick={handleDelete}><FaTrash/></button>
            </>
            }
          </div>}
      </div>
      <GoBack/>
    </>
  )
}
