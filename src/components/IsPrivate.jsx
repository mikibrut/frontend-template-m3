import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function IsPrivate({ children }) {
  const { isLoggedIn, isLoading } = useAuth();
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      // If the user is not logged in, show the message and start the timer
      setShowMessage(true);
      const timer = setTimeout(() => {
        // After 2.5 seconds, redirect the user to the login page
        setShowMessage(false);
        navigate('/login');
      }, 1500);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line
  }, [isLoggedIn]);

  // If the authentication is still loading 
  if (isLoading) return <p>Loading ...</p>;

  if (!isLoggedIn) {
    // If the user is not logged in, show the message
    return (
      <>
        {showMessage && 
        <div className="app-body">
          <h2 className='card-detail'>You have to be logged in to see this content.</h2>
        </div>}
      </>
    );
  } else {
    // If the user is logged in, allow to see the page 
    return children;
  }
}

export default IsPrivate;