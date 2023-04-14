import React from 'react'
import './Card.css';
import { Link } from 'react-router-dom'


function CardAdvert(props) {
    const { advert } = props;
    
  return (
    <div className="card">
      <Link style={{ textDecoration: 'none', color:"#3d3d3d"}}to={`/adverts/${advert._id}`}>
        <h2 className='title'>{advert.title.charAt(0).toUpperCase() + advert.title.slice(1)}</h2>
        <h3>Category: {advert.type.charAt(0).toUpperCase() + advert.type.slice(1)}</h3>
        <h4>Location: {advert.location.charAt(0).toUpperCase() + advert.location.slice(1)}</h4>
      </Link> 
    </div>
      
  )
}

export default CardAdvert