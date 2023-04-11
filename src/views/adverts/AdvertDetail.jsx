import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import bandService from '../../services/bandService';
import mateService from '../../services/mateService';
import advertService from '../../services/advertService';
import placeService from '../../services/placeService';
import { Link } from 'react-router-dom';
import GoBack from '../../components/GoBack';

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
      console.log('Advert', response)
      if (response.type.startsWith('mate looking for')){
        creator = await mateService.getMatesByCreator(response.creator._id);
        console.log('Creator case mate', creator)
        setMate(creator[0]);
      }
      if (response.type.startsWith('band looking for')){
        creator = await bandService.getBandsByCreator(response.creator._id);
        console.log('Creator case band', creator)
          setBand(creator[0]); 
      }
      if (response.type.startsWith('place looking for')){
        creator = await placeService.getPlacesByCreator(response.creator._id);
        console.log('Creator case place', creator)
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
        <h2>Band details</h2>
          {advert && <div className='card'>
            <h4>{advert.type.charAt(0).toUpperCase() + advert.type.slice(1)}</h4>
            <h2>{advert.title.charAt(0).toUpperCase() + advert.title.slice(1)}</h2>
            <p>{advert.message.charAt(0).toUpperCase() + advert.message.slice(1)}</p>
            <p>Contact:</p>
            {
              <div>
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
            
            {/* {advert.type.startsWith("band looking for") && (
                <p>Contact: 
                    <button><Link to={`/bands/${band._id}`}>{band.bandName}</Link></button>
                </p>
            )}
            {advert.type.startsWith("mate looking for") && (
                <p>Contact: 
                    <button><Link to={`/mates/${mate._id}`}>{mate.username}</Link></button>
                </p>
            )}
             {advert.type.startsWith("place looking for") && (
                <p>Contact: 
                    <button><Link to={`/places/${place._id}`}>{place.placeName}</Link></button>
                </p>
            )} */}
            {user._id == advert.creator._id &&
            <>
              <button><Link to={`/adverts/edit/${advert._id}`}>Edit</Link></button>
              <button onClick={handleDelete}>Delete</button>
            </>
            }
          </div>}
      </div>
      <GoBack/>
    </>
  )
}
