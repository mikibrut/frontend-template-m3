import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import bandService from '../../services/bandService';
import GoBack from '../../components/GoBack';

export default function EditBand() {
  const { bandId } = useParams();
  const [band, setBand] = useState({
    bandName:'',
    image: '',
    bio: '',
    musicalGenre: [],
    links:[]
  });
  const [error, setError] = useState(false)
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const getBand = async () => {
    try {
      const response = await bandService.getBand(bandId);
      setBand(response);
    } catch (error) {
      console.error(error)
      setError(true)
    }
  }

  useEffect(() => {
    getBand();
    // eslint-disable-next-line
  }, [bandId])


  const handleChange = (e) => {
    setBand(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setBand(prev => {
      return {
        ...prev,
        [name]: checked ? [...prev[name], e.target.value] : prev[name].filter(item => item !== e.target.value)
      }
    })
  }

  // ******** Cloudinary Upload files ********
  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append('image', e.target.files[0]);
    bandService.uploadImage(uploadData)
    .then(response => {
      setImage(response.fileUrl);
    })
    .catch(err => console.log("Error while uploading the file: ", err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await bandService.editBand(bandId, {
        ...band,
        image: image
      });
      navigate(`/bands/${bandId}`)
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <div className='app-body'>

    <h2 className='title'><span className='title-bg'>Edit your Band</span></h2>


        <form onSubmit={handleSubmit}>
            {error && <p>Something went wrong. Couldn't find your BAND</p>}
            
            <label>Band's Name</label>
                <input type="text" name="bandName" value={band.bandName} onChange={handleChange} />
            
            <label>Band's Image</label>
                <input type="file" name="image" onChange={(e) => handleFileUpload(e)} /> 
            
            <label>Bio</label>
                <input type="text" name="bio" value={band.bio} onChange={handleChange} />
            
            <label>Musical Genre</label>
                <div className="checkbox-container">
                {['rock', 'fusion', 'flamenco', 'pop', 'hip hop', 'jazz', 'blues', 'country', 'classical', 'metal', 'folk', 'electronic', 'reggae', 'latin', 'world', 'other'].map((musicalGenre) => (
                    <aside className="checkbox-list" key={musicalGenre}>
                      <label className="check-item">
                        <input type="checkbox" name="musicalGenre" value={musicalGenre} checked={band.musicalGenre.includes(musicalGenre)} onChange={handleCheckbox} />
                          <span>{musicalGenre}</span>
                      </label>
                    </aside>
                ))}
                </div>
            
            <label>Link</label>
              <input type="text" name="links" value={band.links} onChange={handleChange} />
        

            <button className="btn" type="submit">
                <span className="front">Save changes</span> </button>
        </form>
        <GoBack/>
    </div>
  )
}
