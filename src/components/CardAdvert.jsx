import React from 'react'
import './Card.css';
import { Link } from 'react-router-dom'


function CardAdvert(props) {
    const { advert } = props;
    
  return (
    <div className="card">
      <Link style={{ textDecoration: 'none', color:"#3d3d3d"}}to={`/adverts/${advert._id}`}>
        <h2>Title: {advert.title.charAt(0).toUpperCase() + advert.title.slice(1)}</h2>
        <p>Advert type: {advert.type.charAt(0).toUpperCase() + advert.type.slice(1)}</p>
      </Link> 
    </div>
      
  )
}

export default CardAdvert