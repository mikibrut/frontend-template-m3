import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Home() {
  const { user } = useAuth();

  return (
    <>
      {user ? 
      <div className="container">
          <h1>Home</h1>
      </div> 
      :
        <div className="home-noLog-body">
          <div className="inner-cont">
            <p className="home-message">Are you ever been in a BAND?</p>
            <Link style={{ textDecoration: 'none', color:"#3d3d3d", fontWeight: "bold"}} to= "/signup" className="btn">
              <span className="front">Join</span> </Link>
          </div>
        </div>
      }
    </>
  )
}
