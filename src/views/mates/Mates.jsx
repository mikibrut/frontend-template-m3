import React, {useState, useEffect} from 'react';
import mateService from '../../services/mateService';
import CardMate from '../../components/CardMate';
import GoBack from '../../components/GoBack';


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
                </div>)}
        <GoBack/>
    </>
  )
}

export default Mates