import React, {useState, useEffect} from 'react';
import placeService from '../../services/placeService';
import CardPlace from '../../components/CardPlace';
import GoBack from '../../components/GoBack';
import { Link } from 'react-router-dom';
import { GrAdd } from 'react-icons/gr';

function Places() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
 


  const getPlaces = async () => {
    try {
      const response = await placeService.getPlaces();
      setPlaces(response)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getPlaces()
  }, [])

  return (
    <div className='app-body'>
            {loading && <p>Loading...</p>}
            {!loading &&
                (<div>
                    {places.map(elem =><CardPlace key={elem._id} place={elem}/>)}
                </div>)
            }
        
        <Link className="add-btn" style={{ textDecoration: 'none', color:"#3d3d3d", fontSize: "50px", fontWeight: "bold"}} to= "/places/create">
          <GrAdd/>
        </Link>   
          
        <GoBack/>
    </div>
  )
}

export default Places