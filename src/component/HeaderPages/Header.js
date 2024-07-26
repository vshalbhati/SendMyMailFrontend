import React, { useState, useEffect } from 'react';
import './Header.css';
import shortlogo from '../../images/logo.png';
import biglogo from '../../images/biglogo.png';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../slices/userSlice';

function Header() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [profileDabbaOpen, setProfilDabbaOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener('scroll', handleScroll);

    const user = JSON.parse(localStorage.getItem('user'));
    setUserInfo(user);
    console.log('userInfo is', user);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch(clearUser());
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1 className={`full-name ${isScrolled ? 'hidden' : ''}`}>
            <img src={biglogo} alt="SUDI Logo" />
          </h1>
          <h1 className={`short-name ${isScrolled ? '' : 'hidden'}`}>
            <img src={shortlogo} alt="SUDI Logo" />
          </h1>
        </div>
        <div className="controls">
          <nav className="nav-links">
            <button onClick={() => navigate('/')}>Home</button>     
            <button onClick={() => navigate('/about')}>About Us</button>            
            <button onClick={() => navigate('/pricing')}>Pricing</button>            
          </nav>

          <div className="profileBox" onClick={()=>setProfilDabbaOpen(!profileDabbaOpen)}>
            <div className="userIcon">
              {userInfo?.photo?(
              <img src={userInfo?.photo} alt='uerimg' style={{"height":"2rem","borderRadius":"50%"}}/>
              ):(
                <FontAwesomeIcon icon={faUser} style={{"height":"1.5rem"}}/>
              )}
            </div>
            <div className="profile" style={{"visibility":profileDabbaOpen?"visible":"hidden"}}>
              <button onClick={()=>navigate('/myprofile')}>My Profile</button>
              <button onClick={()=>navigate('/emailrecord')}>Sent Emails</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
        
        
      </div>
    </header>
  );
}

export default Header;
