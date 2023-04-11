import React from 'react'
import './Card.css';
import { Link } from 'react-router-dom'


function CardMate(props) {
    const { mate } = props;
    
  return (
    <div className="card">
      <Link style={{ textDecoration: 'none', color:"#3d3d3d"}}to={`/mates/${mate._id}`}>
        <h2>{mate.creator.username.charAt(0).toUpperCase() + mate.creator.username.slice(1)}</h2>
        <img src={mate.image} alt={mate.creator.username} /> 
        <p>Type: {mate.type.map(type => type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()).join(', ')}</p>
        <p>Location: {mate.location.charAt(0).toUpperCase() + mate.location.slice(1)} </p>
      </Link> 
    </div>
      
  )
}

export default CardMate