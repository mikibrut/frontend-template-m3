import React, { useState } from 'react'
import bandService from '../../services/bandService';
import { useNavigate } from 'react-router-dom';
import GoBack from '../../components/GoBack';
import toast from 'react-hot-toast';


export default function AddBandForm() {
  const initialState = {
    bandName:'',
    image: '',
    bio: '',
    musicalGenre: [],
    location: ''
  }
  const [newBand, setNewBand] = useState(initialState);
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  
  const handleChange = (e) => {
    setNewBand(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setNewBand(prev => {
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
      const addedBand = await bandService.createBand({
        ...newBand,
        image: image
      });
      if(addedBand && addedBand._id){
        toast.success('Band created successfully!');
        setImage('');
        navigate(`/bands/${addedBand._id}`);
        setNewBand(initialState)
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
            <label>Band's Name</label>
                <input type="text" name="bandName" value={newBand.bandName} onChange={handleChange} />
            <label>Band's Image</label>
                <input type="file" name="image" onChange={(e) => handleFileUpload(e)} />
            <label>Bio</label>
                <textarea name="bio" value={newBand.bio} onChange={handleChange} />
            <label>Musical genre</label>
                {['rock', 'fusion', 'flamenco', 'pop', 'hip hop', 'jazz', 'blues', 'country', 'classical', 'metal', 'folk', 'electronic', 'reggae', 'latin', 'world', 'other'].map((musicalGenre) => (
                    <div key={musicalGenre}>
                        <label>{musicalGenre}</label>
                            <input type="checkbox" name="musicalGenre" value={musicalGenre} checked={newBand.musicalGenre.includes(musicalGenre)} onChange={handleCheckbox} />
                    </div>
                    ))}
            <label>Location</label>
                  <input type="text" name="location" value={newBand.location} onChange={handleChange} />
         </div>

        <button className="btn" type="submit">
            <span className="front">Create Band</span> </button>
      </form>
      <GoBack/>
    </div>  
    )
}