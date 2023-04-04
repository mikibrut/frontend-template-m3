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

function App() {
  return (
    <>
      <Toaster/>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mates" element={<Mates/>} />
          <Route path="/mates/create" element={<IsPrivate><AddMateForm /></IsPrivate>} />
          <Route path="/mates/:id" element={<IsPrivate><MateDetail /></IsPrivate>} />
          <Route path="/mates/edit/:mateId" element={<IsPrivate><EditMate /></IsPrivate>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<IsPrivate><Profile /></IsPrivate>} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
