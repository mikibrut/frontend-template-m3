import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './views/Home';
import Navbar from './components/Navbar';
import ErrorPage from './views/ErrorPage';
import NotFound from './views/NotFound';
import Signup from './views/auth/Signup';
import Login from './views/auth/Login';
import Profile from './views/Profile';
import IsPrivate from './components/IsPrivate';
import Mates from './views/mates/Mates';
import MateDetail from './views/mates/MateDetail';
import EditMate from './views/mates/EditMate';
import AddMateForm from './views/mates/AddMateForm';
import Bands from './views/bands/Bands';
import BandDetail from './views/bands/BandDetail';
import AddBandForm from './views/bands/AddBandForm';
import EditBand from './views/bands/EditBand';
import Adverts from './views/adverts/Adverts';

function App() {
  return (
    <>
      <Toaster/>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mates" element={<Mates/>} />
          <Route path="/mates/create" element={<IsPrivate><AddMateForm /></IsPrivate>} />
          <Route path="/mates/:mateId" element={<IsPrivate><MateDetail /></IsPrivate>} />
          <Route path="/mates/edit/:mateId" element={<IsPrivate><EditMate /></IsPrivate>} />
          <Route path="/bands" element={<Bands/>} />
          <Route path="/bands/create" element={<IsPrivate><AddBandForm /></IsPrivate>} />
          <Route path="/bands/:bandId" element={<IsPrivate><BandDetail /></IsPrivate>} />
          <Route path="/bands/edit/:bandId" element={<IsPrivate><EditBand /></IsPrivate>} />
          <Route path="/adverts" element={<Adverts/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<IsPrivate><Profile /></IsPrivate>} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </>
  );
}

export default App;
