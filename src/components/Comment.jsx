import React, { useEffect, useState } from "react";
import commentService from '../services/commentService';
import advertService from '../services/advertService';
import "./Comment.css";
import { Link  } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';

function Comment({ advertId }) {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);

  const getAdvert = async () => {
    try {
      await advertService.getAdvert(advertId);
    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = async (commentId) => {
    try {
      await commentService.deleteComment(commentId);
      setComments(comments.filter((comment) => comment._id !== commentId));
      toast.success('Comment deleted successfully!');
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAdvert();
    // eslint-disable-next-line
  },[])

  useEffect(() => {
    commentService.getCommentsByAdvert(advertId).then(setComments);
  }, [advertId]);

  const getCreatorLink = (creator) => {
    if (creator.type === 'band') {
      return `/bands/${creator._id}`;
    }
    if (creator.type === 'mate') {
      return `/mates/${creator._id}`;
    }
    if (creator.type === 'place') {
      return `/places/${creator._id}`;
    }
    return '';
  }

  return (
    <div className="comment-container">
      {comments.map((comment) => (
        <div key={comment._id} className="comment">
          <hr className="comment-line"></hr>
          <h3 className="comment-title">{comment.title}</h3>
          <p className="comment-text">{comment.text}</p>
          {comment.creator && (
            <p className="comment-creator"> Commented by:
              <button className="user-creator-btn">
                <Link style={{ textDecoration: 'none', color:"#3d3d3d"}} to={getCreatorLink(comment.creator)}>
                  {comment.creator.username.charAt(0).toUpperCase() + comment.creator.username.slice(1)}
                </Link>
              </button>
            </p>
          )}
          {user?._id === comment.creator?._id && (
            <button className="delete-btn" onClick={() => handleDelete(comment._id)}>
              <FaTrash />
            </button>
          )}
          <hr className="comment-line"></hr>
        </div>
      ))}
    </div>
  );
}

export default Comment;
