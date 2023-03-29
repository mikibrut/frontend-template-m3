import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {

  return (
    <div className="container">
      <div className="inner-cont">
        <h1>Home</h1>
        <Link style={{ textDecoration: 'none', color:"#3d3d3d", fontWeight: "bold"}} to= "/signup" className="btn">
          <span className="front">Join</span> </Link>
      </div>
    </div>  
  )
}
