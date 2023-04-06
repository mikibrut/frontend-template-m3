import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import CardMate from '../components/CardMate';
import CardBand from '../components/CardBand';
import mateService from '../services/mateService';
import bandService from '../services/bandService';
import advertService from '../services/advertService';
import placeService from '../services/placeService';


export default function Home() {
  const { user } = useAuth();
  const [randomClaim, setRandomClaim] = useState('');
  const [lastMates, setLastMates] = useState([]);
  const [lastBands, setLastBands] = useState([]);
  const [lastPlaces, setLastPlaces] = useState([]);
  const [lastAdverts, setLastAdverts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getLastMates = async () => {
    try {
      const response = await mateService.getMates();
      const mateArray = Array.from(response).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10);
      setLastMates(mateArray);
      setLoading(false);
    } catch (error) {
      console.error(error)
    }
  }

  const getLastBands = async () => {
    try {
      const response = await bandService.getBands();
      const bandArray = Array.from(response).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10);
      setLastBands(bandArray);
      setLoading(false);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getLastMates()
    getLastBands()
  }, [])



  useEffect(() => {
    const claims = [
      'Are you ever been in a band?',
      'Find your perfect bandmate and make music that moves the world!',
      'Discover the best music venues and never miss a show again!',
      'Find a producer for your next hit and elevate your music to the next level!',
      'Be part of the ultimate music community and unleash your talent!',
      'Take the stage and showcase your talent with our platform connecting you to the best venues and bands.',
      'Elevate your sound to the next level with our network of top producers and recording studios.',
      'Experience the power of collaboration with like-minded creatives on our platform for bands, venues, and music professionals.'
    ];
      const randomIndex = Math.floor(Math.random() * claims.length);
      setRandomClaim(claims[randomIndex]);
    }, []);

    const renderLastMates = () => {
      return (
        <div className="slider-container">
          <div className="slider">
            {lastMates.map(elem => (
              <div className="slide" key={elem._id}>
                <CardMate mate={elem} />
              </div>
            ))}
          </div>
        </div>
      );
    }

    const renderLastBands = () => {
      return (
       
       <div className="slider-container">
          <div className="slider">
            {lastBands.map(elem => (
              <div className="slide" key={elem._id}>
                <CardBand band={elem} />
              </div>
            ))}
          </div>
        </div>
      );
    }
  

  return (
    <>
      {user ? 
      <>{loading ? (
        <p>Loading...</p>
        ) : (
          <div className='app-body'>
            <div className="home-body">
              <div className="last-items">
                <h2>Last Added Adverts</h2>
                {/* Render the last added adverts in a slider */}
              </div>
              <div className="last-items">
                <h2>Last Added Mates</h2>
                {renderLastMates()}
              </div>
              <div className="last-items">
                <h2>Last Added Bands</h2>
                {renderLastBands()}
              </div>
              <div className="last-items">
                <h2>Last Added Places</h2>
                {/* Render the last added places in a slider */}
              </div>
            </div>
          </div>
      )}
      </>
      :
        <div className="home-noLog-body">
          <div className="inner-cont">
            <p className="home-message">{randomClaim}</p>
            <Link style={{ textDecoration: 'none', color:"#3d3d3d", fontWeight: "bold"}} to= "/signup" className="btn">
              <span className="front">Join</span> </Link>
          </div>
        </div>
      }
    </>
  )
}
