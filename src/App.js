import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './component/Home';
import AboutUs from './component/HeaderPages/AboutUs';
import Header from './component/HeaderPages/Header';
import Pricing from './component/HeaderPages/Pricing';
import Footer from './component/Footer/Footer'
import Login from './component/SignUp/Login';
import SignUp from './component/SignUp/SignUp';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from './slices/userSlice';
import MyProfile from './component/ProfilePages/MyProfile';
import EmailRecord from './component/ProfilePages/EmailRecord';

function App() {
  // const [user, setUser] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   // const storedUser = localStorage.getItem('user');
  //   // if (storedUser) {
  //   //   setUser(JSON.parse(storedUser));
  //   // }
  //   setUser(useSelector((state) => state.user.user));
  // }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  return (
    <Router>
      {user ? (
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/myprofile" element={<MyProfile/>}/>
            <Route path="/emailrecord" element={<EmailRecord/>}/>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer/>
        </div>
      ) : (
        <div className="App">
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      )}
    </Router>
  );
}

export default App;