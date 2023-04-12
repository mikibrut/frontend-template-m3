import React, { useState } from 'react'
import placeService from '../../services/placeService';
import { useNavigate } from 'react-router-dom';
import GoBack from '../../components/GoBack';
import toast from 'react-hot-toast';


export default function AddPlaceForm() {
  const initialState = {
    placeName: '',
    description: '',
    type: [],
    image: '',
    location: ''
  }
  const [newPlace, setNewPlace] = useState(initialState);
  const [image, setImage] = useState('');
  const navigate = useNavigate();
//   const { user } = useAuth();

  const handleChange = (e) => {
    setNewPlace(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setNewPlace(prev => {
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
    placeService.uploadImage(uploadData)
    .then(response => {
      setImage(response.fileUrl);
    })
    .catch(err => console.log("Error while uploading the file: ", err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addedPlace = await placeService.createPlace({
        ...newPlace,
        image: image
      });
      if(addedPlace && addedPlace._id){
        toast.success('Place created successfully!');
        setImage('');
        navigate(`/places/${addedPlace._id}`);
        setNewPlace(initialState)
      }
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong... 💩');
    }
  };
  
  return (
    <div className='app-body'>
        <form onSubmit={handleSubmit}>
        <div className="checkbox-container">
            <label>Place Name</label>
                <input type="text" name="placeName" value={newPlace.placeName} onChange={handleChange} />
            <label>Place Type</label>
                {['venue', 'concert hall', 'rehearsal rooms', 'recording studio', 'music-bar', 'other'].map((type) => (
                    <div key={type}>
                        <label>{type}</label>
                            <input type="checkbox" name="type" value={type} checked={newPlace.type.includes(type)} onChange={handleCheckbox} />
                    </div>
                ))}
            <label>Place image</label>
                <input type="file" name="image" onChange={(e) => handleFileUpload(e)} />
            <label>Description</label>
                <textarea name="description" value={newPlace.description} onChange={handleChange} />
            <label>Location</label>
                <input type="text" name="location" value={newPlace.location} onChange={handleChange} />

        </div>  

            <button className="btn" type="submit">
                <span className="front">Create Place</span> 
            </button>
       
        </form>
        <GoBack/>
    </div>  
    )
}
