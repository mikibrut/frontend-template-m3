import React from 'react'
import './Card.css';
import { Link } from 'react-router-dom'


function CardBand(props) {
    const { band } = props;
    
  return (
    <div className="card">
      <Link style={{ textDecoration: 'none', color:"#3d3d3d"}}to={`/bands/${band._id}`}>
        <h2>{band.bandName.charAt(0).toUpperCase() + band.bandName.slice(1)}</h2>
        <img src={band.image} alt={band.creator.username} /> 
        <p>Mate type: {band.musicalGenre.map(musicalGenre => musicalGenre.charAt(0).toUpperCase() + musicalGenre.slice(1).toLowerCase()).join(', ')}</p>
      </Link> 
    </div>
      
  )
}

export default CardBand