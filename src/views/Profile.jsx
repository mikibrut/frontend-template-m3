
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Profile() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext); 
 
  const navigate = useNavigate();

 

  return (
    <div className="container">
       {user && <p>Hello {user.username}</p> }
       <ul>
         {isLoggedIn && <li><button onClick={() => logOutUser()}>Log out</button></li>}
         <li><button onClick={() => navigate(-1)}>Go back</button></li>
       </ul>
    </div>
  )
}
