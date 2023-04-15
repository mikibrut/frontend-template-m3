import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

export default function Signup() {
  const [user, setUser] = useState({
    username: '',
    email: ''
  })
  const [password, setPassword] = useState('');
  const [passwordControl, setPasswordControl] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  useEffect(() => {
    if (password !== passwordControl) {
      setErrorMessage("Passwords don't match")
    } else {
      setErrorMessage(undefined)
    }
  }, [passwordControl, password])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.signup({ username: user.username, email: user.email, password });
      navigate('/login');
    } catch (error) {
      console.error(error)
      setErrorMessage('Unable to create user account')
    }
  }

  return (
    <div className="app-body">
      <h2 className='title'><span className='title-bg'>Sign up</span></h2>
      
      <form onSubmit={handleSubmit}>
        
        <label>Username</label>
          <input required type="text" name="username" value={user.username} onChange={handleChange} />
        
        <label>Email</label>
          <input required type="email" name="email" value={user.email} onChange={handleChange} />
        
        <label>Password</label>
          <input required type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value) } />
        
        <label>Repeat the password</label>
          <input required type="password" name="passwordControl" value={passwordControl} onChange={(e) => setPasswordControl(e.target.value)} />
        
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        
        <button className="btn" type="submit">
          <span className="front">Register</span> </button>
      </form>

      <Link className="user-creator-btn" style={{ marginTop: '20px', textDecoration: 'none', color: '#3d3d3d', fontSize: '20px', fontWeight: 'bold' }} to="/login">Already have an account</Link>
    </div>
  )
}
