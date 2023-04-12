import React, {useState, useEffect} from 'react';
import advertService from '../../services/advertService';
import CardAdvert from '../../components/CardAdvert';
import Search from '../../components/Search';
import GoBack from '../../components/GoBack';
import { Link } from 'react-router-dom';
import { GrAdd } from 'react-icons/gr';




function Adverts() {
  const [adverts, setAdverts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
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

  const handleSearch = (value) => {
    setSearchValue(value);
  }

  useEffect(() => {
    getAdverts()
  }, [])

  return (
    <>{loading && <p>Loading...</p>}
    {!loading &&
    (<div className='app-body'>
          <div>
            <Search handleSearchValue={handleSearch} />
          </div>
          <div>
            {adverts.filter(elem => {
              const locationMatch = elem.location.toLowerCase().includes(searchValue.toLowerCase());
              const typeMatch = elem.type.toLowerCase().includes(searchValue.toLowerCase());
              const titleMatch = elem.title.toLowerCase().includes(searchValue.toLowerCase());
              return locationMatch || typeMatch || titleMatch;
            }).map(elem => {
              return <CardAdvert key={elem._id} advert={elem}/>
            })}
          </div>
        <Link className="add-btn" style={{ textDecoration: 'none', color:"#3d3d3d", fontSize: "50px", fontWeight: "bold"}} to= "/adverts/create">
          <GrAdd/>
        </Link>   
          
        <GoBack/>
    </div>)}
    </>
  )
}

export default Adverts