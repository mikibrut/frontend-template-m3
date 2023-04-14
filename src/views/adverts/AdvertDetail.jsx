import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import bandService from '../../services/bandService';
import mateService from '../../services/mateService';
import advertService from '../../services/advertService';
import placeService from '../../services/placeService';
import commentService from '../../services/commentService';
import { NavLink, Link, Outlet } from 'react-router-dom'
import GoBack from '../../components/GoBack';
import { FaPen, FaTrash, FaComment, FaCommentSlash } from 'react-icons/fa';
import Comment from '../../components/Comment';

export default function AdvertDetail() {
  const { advertId } = useParams();
  const { user } = useAuth();
  const [advert, setAdvert] = useState(null);
  const [band, setBand] = useState(null);
  const [mate, setMate] = useState(null);
  const [place, setPlace] = useState(null);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const navigate = useNavigate();

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
  // const getLastComments = async () => {
  //   try {
  //     const response = await commentService.getCommentsByAdvert(advertId);
  //     const commentsArray = Array.from(response).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10);
  //     setComments(commentsArray);
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }
  const getComments = async () => {
    try {
      const response = await commentService.getCommentsByAdvert(advertId);
      setComments(response);
    } catch (error) {
      console.error(error);
    }
  }


  // const handleAddComment = async (newComment) => {
  //   try {
  //     await commentService.createComment(newComment);
  //     navigate(`/adverts/${advertId}`)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // };

  // const handleShowFrom = () => {
  //   setShowForm(prev => !prev)
  // }
  
  const handleDelete = async () => {
    try {
      await advertService.deleteAdvert(advertId);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAdvert();
    getComments();
    // eslint-disable-next-line 
  }, []);

  return (
    <>
      <div className="app-body">
        <h2 className='title'>Advert details</h2>
          {advert && <div className='card-detail'>
            <h4>{advert.type.charAt(0).toUpperCase() + advert.type.slice(1)}</h4>
            <h2>{advert.title.charAt(0).toUpperCase() + advert.title.slice(1)}</h2>
            <p>{advert.message.charAt(0).toUpperCase() + advert.message.slice(1)}</p>
            <p>Location: {advert.location.charAt(0).toUpperCase() + advert.location.slice(1)}</p>
            <p>Contact: {advert.creator.email}</p>
            
            {
              <div>Add creator: 
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
              </div>
            }
            <div>
              <button className="user-creator-btn">
                  <NavLink style={{ textDecoration: 'none', color:"#3d3d3d"}} to={`/adverts/${advert._id}/comments/create`}>New Comment</NavLink>
              </button>
              </div>
              <Outlet />
            
            {user._id == advert.creator._id &&
            <>
                <button className="user-btn"><Link  style={{ textDecoration: 'none', color:"#3d3d3d"}}  to={`/adverts/edit/${advert._id}`}><FaPen/></Link></button>
                <button className="user-btn" onClick={handleDelete}><FaTrash/></button>
            </>
            }
            {comments.length > 0 && (
              <button className="user-btn" onClick={() => setShowComments(!showComments)}>
                {showComments ? <FaCommentSlash /> : <p><FaComment />{comments.length}</p>}
              </button>
            )}
            {showComments && (
                <div>
                  <Comment advertId={advert._id} />
                </div>
            )}
          </div>}
         
      </div>
      <GoBack/>
    </>
  )
}


