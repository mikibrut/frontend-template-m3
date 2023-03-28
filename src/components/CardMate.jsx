import React from 'react'
import './Card.css';
import { Link } from 'react-router-dom'


function CardMate(props) {
    const { mate } = props;
    console.log(mate)
  return (
    <div className="card">
      <Link to={`/mates/${mate._id}`}>
        <img src={mate.image} alt={mate.user} /> 
      </Link> 
    </div>
      
  )
}

export default CardMate