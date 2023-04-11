import React, {useState, useEffect} from 'react';
import mateService from '../../services/mateService';
import CardMate from '../../components/CardMate';
import Search from '../../components/Search';
import GoBack from '../../components/GoBack';
import { Link } from 'react-router-dom';
import { GrAdd } from 'react-icons/gr';




function Mates() {
  const [mates, setMates] = useState([]);
  const [searchValue, setSearchValue] = useState('');
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
  const handleSearch = (value) => {
    console.log('Dad ', value)
    setSearchValue(value);
  }


  useEffect(() => {
    getMates()
  }, [])

  return (
    <>{loading && <p>Loading...</p>}
    {!loading &&
    (<div className='app-body'>
          <div>
            <Search handleSearchValue={handleSearch} />
          </div>
          <div>
              {mates.filter(elem => elem.location.toLowerCase().includes(searchValue.toLowerCase()))
              .map(elem => {
                return <CardMate key={elem._id} mate={elem}/>
              })}
          </div>
        <Link className="add-btn" style={{ textDecoration: 'none', color:"#3d3d3d", fontSize: "50px", fontWeight: "bold"}} to= "/mates/create">
          <GrAdd/>
        </Link>   
          
        <GoBack/>
    </div>)}
    </>
  )
}

export default Mates