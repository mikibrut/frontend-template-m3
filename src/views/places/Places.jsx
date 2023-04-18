import React, {useState, useEffect} from 'react';
import placeService from '../../services/placeService';
import CardPlace from '../../components/CardPlace';
import GoBack from '../../components/GoBack';
import Search from '../../components/Search';
import { Link } from 'react-router-dom';
import { GrAdd } from 'react-icons/gr';


function Places() {
  const [places, setPlaces] = useState([]);
  const [searchValue, setSearchValue] = useState('');
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

  const handleSearch = (value) => {
    setSearchValue(value);
  }

  useEffect(() => {
    getPlaces()
  }, [])

  return (
    <>
        {loading && <p>Loading...</p>}
        {!loading &&
        (<div className='app-body'>
            <div>
                <Search handleSearchValue={handleSearch} />
            </div>
            <div>
            {places.filter(elem => {
                const locationMatch = elem.location.toLowerCase().includes(searchValue.toLowerCase());
                const typeMatch = elem.type.some(type => type.toLowerCase().includes(searchValue.toLowerCase()));
                return locationMatch || typeMatch;
            }).map(elem => {
                return <CardPlace key={elem._id} place={elem}/>
            })}
            </div>
            <Link className="add-btn" style={{ textDecoration: 'none', color:"#3d3d3d", fontSize: "50px", fontWeight: "bold"}} to= "/places/create">
            <GrAdd/>
            </Link>   
            
            <GoBack/>
        </div>)}
    </>
  )
}

export default Places