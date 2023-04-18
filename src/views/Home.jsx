import React, {useState, useEffect} from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import CardMate from '../components/CardMate';
import CardBand from '../components/CardBand';
import CardPlace from '../components/CardPlace';
import CardAdvert from '../components/CardAdvert';
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

  const getLastPlaces = async () => {
    try {
      const response = await placeService.getPlaces();
      const placeArray = Array.from(response).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10);
      setLastPlaces(placeArray);
      setLoading(false);
    } catch (error) {
      console.error(error)
    }
  }

  const getLastAdverts = async () => {
    try {
      const response = await advertService.getAdverts();
      const advertArray = Array.from(response).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10);
      setLastAdverts(advertArray);
      setLoading(false);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getLastMates();
    getLastBands();
    getLastPlaces();
    getLastAdverts();
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
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          containerClass="slider-container"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite={false}
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            mobile: {
              breakpoint: {
                max: 464,
                min: 0
              },
              items: 1,
              partialVisibilityGutter: 30
            }
          }}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          slidesToSlide={1}
          swipeable
        >
            {lastMates.map(elem => (
                <CardMate key={elem._id} mate={elem} />
            ))}
      </Carousel>
      );
    }
    
    const renderLastBands = () => {
      return (
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          containerClass="slider-container"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite={false}
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            mobile: {
              breakpoint: {
                max: 464,
                min: 0
              },
              items: 1,
              partialVisibilityGutter: 30
            }
          }}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          slidesToSlide={1}
          swipeable
        >
            {lastBands.map(elem => (
                <CardBand key={elem._id} band={elem} />
            ))}
      </Carousel>
      );
    }

    const renderLastPlaces = () => {
      return (
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          containerClass="slider-container"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite={false}
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            mobile: {
              breakpoint: {
                max: 464,
                min: 0
              },
              items: 1,
              partialVisibilityGutter: 30
            }
          }}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          slidesToSlide={1}
          swipeable
        >
            {lastPlaces.map(elem => (
                <CardPlace key={elem._id} place={elem} />
            ))}
      </Carousel>
      );
    }

    const renderLastAdverts = () => {
      return (
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          containerClass="slider-container"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite={false}
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            mobile: {
              breakpoint: {
                max: 464,
                min: 0
              },
              items: 1,
              partialVisibilityGutter: 30
            }
          }}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          slidesToSlide={1}
          swipeable
        >
            {lastAdverts.map(elem => (
                <CardAdvert key={elem._id} advert={elem} />
            ))}
      </Carousel>
      );
    }

  return (
    <>
      {user ? 
      <>{loading ? (
        <p>Loading...</p>
        ) : (
          <div className='app-body'>
                <h2 className='title'><span className='title-bg'>New Adverts</span></h2>
                {renderLastAdverts()}
                <h2 className='title'><span className='title-bg'>Check out the New Mates!</span></h2>
                {renderLastMates()}
                <h2 className='title'><span className='title-bg'>New Bands are join us:</span></h2>
                {renderLastBands()}
                <h2 className='title'><span className='title-bg'>New Places!</span></h2>
                {renderLastPlaces()}
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
