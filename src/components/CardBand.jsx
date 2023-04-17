import React from 'react'
import './Card.css';
import { Link } from 'react-router-dom'


function CardBand(props) {
    const { band } = props;
    
  return (
    <div className="card">
      <Link style={{ textDecoration: 'none', color:"#3d3d3d"}}to={`/bands/${band._id}`}>
        <h1 className='title'>{band.bandName.charAt(0).toUpperCase() + band.bandName.slice(1)}</h1>
        <img src={band.image} alt={band.creator} /> 
        <h3>Musical genre: {band.musicalGenre.map(musicalGenre => musicalGenre.charAt(0).toUpperCase() + musicalGenre.slice(1).toLowerCase()).join(', ')}</h3>
        <h4>Location: {band.location.charAt(0).toUpperCase() + band.location.slice(1)} </h4>
      </Link> 
    </div>
      
  )
}

export default CardBand