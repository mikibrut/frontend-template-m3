import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import mateService from '../services/mateService';
import bandService from '../services/bandService';
import placeService from '../services/placeService';
import GoBack from '../components/GoBack';

export default function Profile() {
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext); 
  const [roleMateData, setMateData] = useState(null);
  const [roleBandData, setBandData] = useState(null);
  const [rolePlaceData, setPlaceData] = useState(null);

  const getUserRole = async () => {
    try {
      const [userMates, userBands, userPlaces] = await Promise.all([
        mateService.getMatesByCreator(user?._id),
        bandService.getBandsByCreator(user?._id),
        placeService.getPlacesByCreator(user?._id),
      ]);

      if (userMates.length > 0) {
        setMateData(userMates);
      }
      
      if (userBands.length > 0) {
        setBandData(userBands);
      }
      
      if (userPlaces.length > 0) {
        setPlaceData(userPlaces);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    
    getUserRole();
    // eslint-disable-next-line
  }, []);

  

  return (
    <>
    <div className="app-body">
    <h2 className='title'><span className='title-bg'>My Profile</span></h2>
      <div className='card-detail'>
       {user && 
       <>
          <div>
            <h2>Hello {user.username}</h2> 
            <p>Email: {user.email} </p>
          </div>

    <h4>User roles:</h4>

        {roleMateData && (
          <>
          <p>Mate: </p>
            <div className='user-creator-btn'>
              {roleMateData.map((data) => (
                <div key={data._id}> 
                    <Link style={{ textDecoration: 'none', color:"#3d3d3d"}} to={`/mates/${data._id}`}>{data.creator.username}</Link>
                </div>
              ))}
            </div>
          </>
        )}

        {roleBandData && (
          <>
          <p>Band: </p>
            <div className='user-creator-btn'>
              {roleBandData.map((data) => (
                <div key={data._id}> 
                    <Link style={{ textDecoration: 'none', color:"#3d3d3d"}} to={`/bands/${data._id}`}>{data.bandName}</Link>
                </div>
              ))}
            </div>
          </>
        )}

        {rolePlaceData && (
          <>
          <p>Place: </p>
            <div className='user-creator-btn'>
              {rolePlaceData.map((data) => (
                <div key={data._id}>
                    <Link style={{ textDecoration: 'none', color:"#3d3d3d"}} to={`/places/${data._id}`}>{data.placeName}</Link>
                </div>
              ))}
            </div>
          </>
        )}

      </>
       }
          <div>
            {
            isLoggedIn && <li><button className="btn" onClick={() => logOutUser()}><span className="front">Logout</span></button></li>
            }
          </div>
       </div>
    </div>
    <GoBack/>
    </>
  )
}