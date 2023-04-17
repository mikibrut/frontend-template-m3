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
    musicalGenre: [],
    location: '',
    links: []
  }
  const [newMate, setNewMate] = useState(initialState);
  const [image, setImage] = useState('');
  const [links, setLinks] = useState([]);
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMate(prevState => {
      return {
        ...prevState,
        [name]: name === "links" ? [...prevState.links, value] : value
      }
    });
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
        image: image,
        links: links
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
      
      <h2 className='title'><span className='title-bg'>New Mate</span></h2>

      <form onSubmit={handleSubmit}>

        <label>Mate's Type</label>
              <div className="checkbox-container">
              {['musician', 'sound technician', 'manager', 'producer', 'sound engineer', 'light technician'].map((type) => (
                  <aside className="checkbox-list" key={type}>
                    <label className="check-item">
                    <input type="checkbox" name="type" value={type} checked={newMate.type.includes(type)} onChange={handleCheckbox} />
                    <span>{type}</span>
                    </label>
                  </aside>
                ))}
              </div>
       
        <label>Mate's image</label>
            <input type="file" name="image" onChange={(e) => handleFileUpload(e)} />
        
        <label>Mate's genre</label>
            <input type="text" name="genre" value={newMate.genre} onChange={handleChange} />

        <label>Mate's Instrument</label>
            <div className="checkbox-container">
              {['guitar', 'bass', 'drums', 'brass', 'strings', 'voice', 'piano', 'synth', 'folkloric', 'percussion', 'keys', 'other'].map((musicalInstrument) => (
                <aside className="checkbox-list" key={musicalInstrument}>
                  <label className="check-item">
                  <input type="checkbox" name="musicalInstrument" value={musicalInstrument} checked={newMate.musicalInstrument.includes(musicalInstrument)} onChange={handleCheckbox} />
                  <span>{musicalInstrument}</span>
                  </label>
                </aside>
              ))}
            </div>

        <label>Location</label>
            <input type="text" name="location" value={newMate.location} onChange={handleChange} />
       
            {[0, 1, 2].map(index => (
              <label className='links' key={index}>
                <label>{`Link ${index + 1}`}</label>
                <input type="text" value={links[index] || ''} onChange={e => handleLinks(e, index)} />
              </label>
            ))}
          

        <button className="btn" type="submit">
          <span className="front">Create Mate</span> </button>
      </form>
      <GoBack/>
    </div>  
    )
}
