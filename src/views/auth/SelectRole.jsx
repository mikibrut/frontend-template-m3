// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../hooks/useAuth';
// import authService from '../../services/authService';


// export default function SelectRole() {
//   const { user } = useAuth();

//   const handleUserRoleUpdate = async (role) => {
//     try {
//       await authService.addUserRole(user._id, role);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className='app-body'>
//       <h2>What kind of role do you want to be?</h2>
//       <div>
//         <Link
//           style={{ textDecoration: 'none', color:"#3d3d3d", fontSize: "50px", fontWeight: "bold"}}
//           to= "/mates/create"
//           onClick={() => handleUserRoleUpdate('mate')}
//         >
//           Mate
//         </Link> 
//       </div>
//       <div>
//         <Link
//           style={{ textDecoration: 'none', color:"#3d3d3d", fontSize: "50px", fontWeight: "bold"}}
//           to= "/bands/create"
//           onClick={() => handleUserRoleUpdate('band')}
//         >
//           Band
//         </Link> 
//       </div>
//       <div>
//         <Link
//           style={{ textDecoration: 'none', color:"#3d3d3d", fontSize: "50px", fontWeight: "bold"}}
//           to= "/places/create"
//           onClick={() => handleUserRoleUpdate('place')}
//         >
//           Place
//         </Link> 
//       </div>
//     </div>
//   );
// }
