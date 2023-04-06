import React, {useState, useEffect} from 'react';
import advertService from '../../services/advertService';
import CardAdvert from '../../components/CardAdvert';
import GoBack from '../../components/GoBack';
import { Link } from 'react-router-dom';
import { GrAdd } from 'react-icons/gr';




function Adverts() {
  const [adverts, setAdverts] = useState([]);
  const [loading, setLoading] = useState(true);
 


  const getAdverts = async () => {
    try {
      const response = await advertService.getAdverts();
      setAdverts(response)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getAdverts()
  }, [])

  return (
    <div className='app-body'>
            {loading && <p>Loading...</p>}
            {!loading &&
                (<div>
                    {adverts.map(elem =><CardAdvert key={elem._id} advert={elem}/>)}
                </div>)
            }
        
        <Link className="add-btn" style={{ textDecoration: 'none', color:"#3d3d3d", fontSize: "50px", fontWeight: "bold"}} to= "/adverts/create">
          <GrAdd/>
        </Link>   
          
        <GoBack/>
    </div>
  )
}

export default Adverts