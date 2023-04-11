import React, {useState, useEffect} from 'react';
import bandService from '../../services/bandService';
import CardBand from '../../components/CardBand';
import GoBack from '../../components/GoBack';
import Search from '../../components/Search';
import { Link } from 'react-router-dom';
import { GrAdd } from 'react-icons/gr';




function Bands() {
  const [bands, setBands] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(true);
 
  const getBands = async () => {
    try {
      const response = await bandService.getBands();
      setBands(response)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSearch = (value) => {
    setSearchValue(value);
  }

  useEffect(() => {
    getBands()
  }, [])

  return (
    <>{loading && <p>Loading...</p>}
    {!loading &&
    (<div className='app-body'>
          <div>
            <Search handleSearchValue={handleSearch} />
          </div>
          <div>
            {bands.filter(elem => {
                  const locationMatch = elem.location.toLowerCase().includes(searchValue.toLowerCase());
                  const musicalGenreMatch = elem.musicalGenre.some(type => type.toLowerCase().includes(searchValue.toLowerCase()));
                  return locationMatch || musicalGenreMatch;
            }).map(elem => {
                return <CardBand key={elem._id} band={elem}/>
            })}
          </div>
        <Link className="add-btn" style={{ textDecoration: 'none', color:"#3d3d3d", fontSize: "50px", fontWeight: "bold"}} to= "/bands/create">
          <GrAdd/>
        </Link>   
          
        <GoBack/>
    </div>)}
    </>
  )
}

export default Bands