
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import GoBack from '../components/GoBack';

export default function Profile() {
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext); 
  

  return (
    <>
    <div className="container">
       {user && 
       <div>
       <p>Hello {user.username}</p> 
       <p>Email:{user.email} </p>
       </div>}
       <ul>
         {isLoggedIn && <li><button className="btn" onClick={() => logOutUser()}><span className="front">Logout</span></button></li>}
       </ul>
       
    </div>
    <GoBack/>
    </>
  )
}

// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import mateService from '../../services/mateService';
// import { Link } from 'react-router-dom';
// import GoBack from '../../components/GoBack';

// export default function MateDetail() {
//   const { id } = useParams();
//   const [mate, setMate] = useState(null);
//   const navigate = useNavigate();
  
//   const getMate = async () => {
//     try {
//       const mate = await mateService.getMate(id);
//       setMate(mate);  
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   useEffect(() => {
//     getMate();
//   }, []);

//   const handleDelete = async () => {
//     try {
//       await mateService.deleteMate(id);
//       navigate('/');
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   return (
//     <>
//       <div className="container">
//         <h2>Mate details</h2>
//           {mate && <div className='card'>
//             <p>{mate.creator.username}</p>
//             <img src={mate.image} alt={mate.user} />
//             <ul>
//                 <li>Musical genre: {mate.musicalGenre}</li>
//                 <li>Instrument: {mate.musicalInstrument}</li>
//                 <li>Genre: {mate.genre}</li>
//             </ul>
//             <button><Link to={`/edit/${mate._id}`}>Edit</Link></button>
//             <button onClick={handleDelete}>Delete</button>
//           </div>}
//       </div>
//       <GoBack/>
//     </>
//   )
// }