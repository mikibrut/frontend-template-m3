import React, {useState, useEffect} from 'react';
import mateService from '../../services/mateService';
import CardMate from '../../components/CardMate';
import GoBack from '../../components/GoBack';
import { Link } from 'react-router-dom';
import { GrAdd } from 'react-icons/gr';




function Mates() {
  const [mates, setMates] = useState([]);
  const [loading, setLoading] = useState(true);
 


  const getMates = async () => {
    try {
      const response = await mateService.getMates();
      setMates(response)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getMates()
  }, [])

  return (
    <>
            {loading && <p>Loading...</p>}
            {!loading &&
                (<div className="container">
                    {mates.map(elem =><CardMate key={elem._id} mate={elem}/>)}
                </div>)
            }
        
        <Link className="add-btn" style={{ textDecoration: 'none', color:"#3d3d3d", fontSize: "50px", fontWeight: "bold"}} to= "/mates/create">
          <GrAdd/>
        </Link>   
          
        <GoBack/>
    </>
  )
}

export default Mates