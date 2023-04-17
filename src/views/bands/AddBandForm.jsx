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
    location: '',
    links:[]
  }
  const [newBand, setNewBand] = useState(initialState);
  const [image, setImage] = useState('');
  const [links, setLinks] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBand(prevState => {
      return {
        ...prevState,
        [name]: name === "links" ? [...prevState.links, value] : value
      }
    });
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

  const handleLinks = (e, index) => {
    const { value } = e.target;
    const updatedLinks = [...links];
    updatedLinks[index] = value;
    setLinks(updatedLinks);
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
        image: image,
        links: links
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

      <h2 className='title'><span className='title-bg'>New Band</span></h2>

      <form onSubmit={handleSubmit}>
      
        <label>Band's Name</label>
            <input type="text" name="bandName" value={newBand.bandName} onChange={handleChange} />
            
        <label>Band's Image</label>
            <input type="file" name="image" onChange={(e) => handleFileUpload(e)} />
            
        <label>Bio</label>
            <textarea name="bio" value={newBand.bio} onChange={handleChange} />
            
        <label>Musical Genre</label>
            <div className="checkbox-container">
            {['rock', 'fusion', 'flamenco', 'pop', 'hip hop', 'jazz', 'blues', 'country', 'classical', 'metal', 'folk', 'electronic', 'reggae', 'latin', 'world', 'other'].map((musicalGenre) => (
                  <aside className="checkbox-list" key={musicalGenre}>
                    <label className="check-item">
                    <input type="checkbox" name="musicalGenre" value={musicalGenre} checked={newBand.musicalGenre.includes(musicalGenre)} onChange={handleCheckbox} />
                    <span>{musicalGenre}</span>
                    </label>
                  </aside>
            ))}
            </div> 

        <label>Location</label>
            <input type="text" name="location" value={newBand.location} onChange={handleChange} />
         
        {[0, 1, 2].map(index => (
        <label className='links' key={index}>
            <label>{`Link ${index + 1}`}</label>
                <input type="text" value={links[index] || ''} onChange={e => handleLinks(e, index)} />
            </label>
        ))}

        <button className="btn" type="submit">
            <span className="front">Create Band</span> </button>
      </form>
      <GoBack/>
    </div>  
    )
}