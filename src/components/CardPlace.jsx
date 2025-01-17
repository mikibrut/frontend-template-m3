import React from 'react'
import './Card.css';
import { Link } from 'react-router-dom'


function CardPlace(props) {
    const { place } = props;
    
  return (
    <div className="card">
      <Link style={{ textDecoration: 'none', color:"#3d3d3d"}}to={`/places/${place._id}`}>
        <h1 className='title'>{place.placeName.charAt(0).toUpperCase() + place.placeName.slice(1)}</h1>
        <img src={place.image} alt={place.creator.username} /> 
        <h3>Place type: {place.type.map(type => type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()).join(', ')}</h3>
        <h4>Location: {place.location.charAt(0).toUpperCase() + place.location.slice(1)}</h4>
      </Link> 
    </div>
      
  )
}

export default CardPlace