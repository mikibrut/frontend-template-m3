import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import mateService from '../../services/mateService';
import GoBack from '../../components/GoBack';

export default function EditMate() {
  const { mateId } = useParams();
  const [mate, setMate] = useState({
    type: [],
    image: '',
    genre: '',
    musicalGenre: [],
    musicalInstrument: [],
    location:'',
    links: []
  });
  const [error, setError] = useState(false)
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const getMate = async () => {
    try {
      const response = await mateService.getMate(mateId);
      setMate(response);
    } catch (error) {
      console.error(error)
      setError(true)
    }
  }

  useEffect(() => {
    getMate();
    // eslint-disable-next-line
  }, [mateId])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMate(prevState => {
      return {
        ...prevState,
        [name]: name === "links" ? [...prevState.links, value] : value
      }
    });
  }

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setMate(prev => {
      return {
        ...prev,
        [name]: checked ? [...prev[name], e.target.value] : prev[name].filter(item => item !== e.target.value)
      }
    })
  }

  // ******** Cloudinary Upload files ********
  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);
    mateService.uploadImage(uploadData)
    .then(response => {
      setImage(response.fileUrl);
    })
    .catch(err => console.log("Error while uploading the file: ", err));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await mateService.editMate(mateId, {
        ...mate,
        image: image
      });
      navigate(`/mates/${mateId}`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='app-body'>
      <form onSubmit={handleSubmit}>
        {error && <p>Something went wrong. Couldn't find your MATE</p>}
        
        <label>Mate's Type</label>
              <div className="checkbox-container">
              {['musician', 'sound technician', 'manager', 'producer', 'sound engineer', 'light technician'].map((type) => (
                  <aside className="checkbox-list" key={type}>
                    <label className="check-item">
                    <input type="checkbox" name="type" value={type} checked={mate.type.includes(type)} onChange={handleCheckbox} />
                    <span>{type}</span>
                    </label>
                  </aside>
                ))}
              </div>
       
        <label>Mate's image</label>
            <input type="file" name="image" onChange={(e) => handleFileUpload(e)} />
        
        <label>Mate's genre</label>
            <input type="text" name="genre" value={mate.genre} onChange={handleChange} />

        <label>Mate's Instrument</label>
            <div className="checkbox-container">
              {['guitar', 'bass', 'drums', 'brass', 'strings', 'voice', 'piano', 'synth', 'folkloric', 'percussion', 'keys', 'other'].map((musicalInstrument) => (
                <aside className="checkbox-list" key={musicalInstrument}>
                  <label className="check-item">
                  <input type="checkbox" name="musicalInstrument" value={musicalInstrument} checked={mate.musicalInstrument.includes(musicalInstrument)} onChange={handleCheckbox} />
                  <span>{musicalInstrument}</span>
                  </label>
                </aside>
              ))}
            </div>
          
        <label>Link</label>
            <input type="text" name="links" value={mate.links} onChange={handleChange} />
        
        <label>Location</label>
            <input type="text" name="location" value={mate.location} onChange={handleChange} />
       
        <button className="btn" type="submit">
          <span className="front">Save changes</span> </button>
      </form>
      <GoBack/>
    </div>
  )
}
