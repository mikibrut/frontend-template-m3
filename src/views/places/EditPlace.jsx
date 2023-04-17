import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import placeService from '../../services/placeService';
import GoBack from '../../components/GoBack';

export default function EditPlace() {
  const { placeId } = useParams();
  const [place, setPlace] = useState({
    placeName: '',
    description: '',
    type: [],
    image: '',
    location: '',
    links: []
  });
  const [error, setError] = useState(false)
  const [image, setImage] = useState('');
  const [links, setLinks] = useState([]);
  const navigate = useNavigate();

  const getPlace = async () => {
    try {
      const response = await placeService.getPlace(placeId);
      setPlace(response);
    } catch (error) {
      console.error(error)
      setError(true)
    }
  }

  useEffect(() => {
    getPlace();
    // eslint-disable-next-line
  }, [placeId])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlace(prevState => {
      return {
        ...prevState,
        [name]: name === "links" ? [...prevState.links, value] : value
      }
    });
  }

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setPlace(prev => {
      return {
        ...prev,
        [name]: checked ? [...prev[name], e.target.value] : prev[name].filter(item => item !== e.target.value)
      }
    })
  }

  const handleLinks = (e, index) => {
    const { value } = e.target;
    const updatedLinks = [...links];
    updatedLinks[index] = value;
    setLinks(updatedLinks);
  }
  
  // ******** Cloudinary Upload files ********
  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);
    placeService.uploadImage(uploadData)
    .then(response => {
      setImage(response.fileUrl);
    })
    .catch(err => console.log("Error while uploading the file: ", err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await placeService.editPlace(placeId, {
        ...place,
        image: image,
        links: links
      });
      navigate(`/places/${placeId}`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='app-body'>
      
      <form onSubmit={handleSubmit}>
        {error && <p>Something went wrong. Couldn't find your PLACE</p>}
        
        
        <label>Place Name</label>
            <input type="text" name="placeName" value={place.placeName} onChange={handleChange} />
        
        <label>Place Type</label>
            <div className="checkbox-container">
                {['venue', 'concert hall', 'rehearsal rooms', 'recording studio', 'music-bar', 'other'].map((type) => (
                    <aside className="checkbox-list" key={type}>
                      <label className="check-item">
                        <input type="checkbox" name="type" value={type} checked={place.type.includes(type)} onChange={handleCheckbox} />
                          <span>{type}</span>
                        </label>
                    </aside>
                ))}
            </div>
        
        <label>Place image</label>
            <input type="file" name="image" onChange={(e) => handleFileUpload(e)} />
            
        <label>Description</label>
            <textarea name="description" value={place.description} onChange={handleChange} />
        
        <label>Location</label>
            <input type="text" name="location" value={place.location} onChange={handleChange} />
      
        {[0, 1, 2].map(index => (
        <label className='links' key={index}>
            <label>{`Link ${index + 1}`}</label>
                <input type="text" value={links[index] || ''} onChange={e => handleLinks(e, index)} />
            </label>
        ))}

        <button className="btn" type="submit">
          <span className="front">Save changes</span> </button>
      
      </form>
      <GoBack/>
    </div>
  )
}
