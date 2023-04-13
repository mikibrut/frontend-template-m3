import React, { useEffect, useState } from "react";
import commentService from '../services/commentService';
import bandService from '../services/bandService';
import mateService from '../services/mateService';
import advertService from '../services/advertService';
import placeService from '../services/placeService';
import "./Comment.css";
import { Link } from "react-router-dom";

function CommentComponent({ advertId }) {
  const [comments, setComments] = useState([]);
  const [advert, setAdvert] = useState(null);
  const [band, setBand] = useState(null);
  const [mate, setMate] = useState(null);
  const [place, setPlace] = useState(null);

  const getAdvert = async () => {
    try {
      let creator = undefined;
      const response = await advertService.getAdvert(advertId);
      if (response.type.startsWith('mate looking for')){
        creator = await mateService.getMatesByCreator(response.creator._id);
        setMate(creator[0]);
      }
      if (response.type.startsWith('band looking for')){
        creator = await bandService.getBandsByCreator(response.creator._id);
        setBand(creator[0]); 
      }
      if (response.type.startsWith('place looking for')){
        creator = await placeService.getPlacesByCreator(response.creator._id);
        setPlace(creator[0]);  
      }
      setAdvert(response)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAdvert();
    commentService.getCommentsByAdvert(advertId).then(setComments);
  }, [advertId]);

  return (
    <div className="comment-container">
    {comments.map((comment) => (
      <div key={comment._id} className="comment">
        <h3 className="comment-title">{comment.title}</h3>
        <p className="comment-text">{comment.text}</p>
        <p className="comment-creator"> Commented by:
            {band && 
                  <button className="user-creator-btn">
                    <Link style={{ textDecoration: 'none', color:"#3d3d3d"}} to={`/bands/${band._id}`}>{band.bandName.charAt(0).toUpperCase() + band.bandName.slice(1)}</Link>
                  </button>
            }
            {mate && 
                  <button className="user-creator-btn">
                    <Link style={{ textDecoration: 'none', color:"#3d3d3d"}} to={`/mates/${mate._id}`}>{mate.creator.username.charAt(0).toUpperCase() + mate.creator.username.slice(1)}</Link>
                  </button>
            }
            {place && 
                  <button className="user-creator-btn">
                    <Link style={{ textDecoration: 'none', color:"#3d3d3d"}} to={`/places/${place._id}`}>{place.placeName.charAt(0).toUpperCase() + place.placeName.slice(1)}</Link>
                  </button>
            }
        </p>
        <hr className="comment-line" />
      </div>
    ))}
  </div>
  );
}

export default CommentComponent;
