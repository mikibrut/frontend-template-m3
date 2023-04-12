import React, { useState } from 'react'
import mateService from '../../services/mateService';
import { useNavigate } from 'react-router-dom';
import GoBack from '../../components/GoBack';
import toast from 'react-hot-toast';


export default function AddMateForm() {
  const initialState = {
    type: [],
    image: '',
    genre: '',
    musicalInstrument: [],
    musicalGenre: []
  }
  const [newMate, setNewMate] = useState(initialState);
  const [image, setImage] = useState('');
  const navigate = useNavigate();

   
  const handleChange = (e) => {
    setNewMate(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setNewMate(prev => {
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
      const addedMate = await mateService.createMate({
        ...newMate,
        image: image
      });
      if(addedMate && addedMate._id){
        toast.success('Mate created successfully!');
        setImage('');
        navigate(`/mates/${addedMate._id}`);
        setNewMate(initialState)
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
        <label>Mate's Types</label>
          {['musician', 'sound technician', 'manager', 'producer', 'sound engineer', 'light technician'].map((type) => (
            <div key={type}>
              <label>{type}</label>
              <input type="checkbox" name="type" value={type} checked={newMate.type.includes(type)} onChange={handleCheckbox} />
            </div>
          ))}
       
        <label>Mate's image</label>
            <input type="file" name="image" onChange={(e) => handleFileUpload(e)} />
        <label>Mate's genre</label>
            <input type="text" name="genre" value={newMate.genre} onChange={handleChange} />
        <p>Mate's Instrument</p>
          {['guitar', 'bass', 'drums', 'brass', 'strings', 'voice', 'piano', 'synth', 'folkloric', 'percussion', 'keys', 'other'].map((musicalInstrument) => (
            <div key={musicalInstrument}>
              <label>{musicalInstrument}</label>
              <input type="checkbox" name="musicalInstrument" value={musicalInstrument} checked={newMate.musicalInstrument.includes(musicalInstrument)} onChange={handleCheckbox} />
            </div>
          ))}
        <label>Musical genre</label>
        {['rock', 'fusion', 'flamenco', 'pop', 'hip hop', 'jazz', 'blues', 'country', 'classical', 'metal', 'folk', 'electronic', 'reggae', 'latin', 'world', 'other'].map((musicalGenre) => (
            <div key={musicalGenre}>
              <label>{musicalGenre}</label>
              <input type="checkbox" name="musicalGenre" value={musicalGenre} checked={newMate.musicalGenre.includes(musicalGenre)} onChange={handleCheckbox} />
            </div>
          ))}
        <label>Location</label>
              <input type="text" name="location" value={newMate.location} onChange={handleChange} />
        
      </div>
        <button className="btn" type="submit">
          <span className="front">Create Mate</span> </button>
      </form>
      <GoBack/>
    </div>  
    )
}
