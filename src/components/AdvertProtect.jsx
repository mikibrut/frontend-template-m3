import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import bandService from '../services/bandService';
import mateService from '../services/mateService';
import placeService from '../services/placeService';


export default function AdvertProtect({ children }) {
  const [role, setRole] = useState(null);
  const { user } = useAuth();

  const getUserRole = async () => {
    try {
      const [userMates, userBands, userPlaces] = await Promise.all([
        mateService.getMatesByCreator(user._id),
        bandService.getBandsByCreator(user._id),
        placeService.getPlacesByCreator(user._id),
      ]);

      if (userMates.length > 0) {
        setRole(userMates[0]);
      } else if (userBands.length > 0) {
        setRole(userBands[0]);
      } else if (userPlaces.length > 0) {
        setRole(userPlaces[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserRole();
    // eslint-disable-next-line
  }, []);

  if (role === null) {
    return (
      <div className="app-body">
        <p className="title">You only can create an Advert if you have created a Mate, Band or Place</p>
        <div>
            <button className="btn">
            <span className="front">
                <Link
                    style={{ textDecoration: 'none', color: '#3d3d3d' }}
                    to="/mates/create"
                >Create a Mate
                </Link>
            </span>
            </button>
        </div>
        <hr></hr>
        <div>
            <button className="btn">
            <span className="front">
                <Link
                    style={{ textDecoration: 'none', color: '#3d3d3d' }}
                    to="/bands/create"
                >Create a Band
                </Link>
            </span>
            </button>
        </div>
        <hr></hr>
        <div>
            <button className="btn">
            <span className="front">
                <Link
                    style={{ textDecoration: 'none', color: '#3d3d3d' }}
                    to="/places/create"
                >Create a Place
                </Link>
            </span>
            </button>
        </div>
      </div>
    );
  } else {
    return children;
  }
}
