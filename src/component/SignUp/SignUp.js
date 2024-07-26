import React, { useState } from 'react';
import styled from 'styled-components';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUser } from '../../slices/userSlice';

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { name, email, password };
    const db = getFirestore();
      await setDoc(doc(db, 'users', user.uid), {
        name: user.displayName,
        email: user.email,
        // Add any other user data you want to store
      });
    // Convert the user object to a JSON string
    const userJSON = JSON.stringify(user);
    dispatch(setUser({ email: user.email, uid: user.uid, name: user.displayName }));
    // Save the user data to localStorage
    localStorage.setItem('user', userJSON);
    navigate('/');
    console.log('Signup submitted', { name, email, password, confirmPassword });
  };

  const handleGoogleSignUp = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const Googleuser = result.user;
      console.log(result)
      // Save the user data to localStorage
      const userJSON = JSON.stringify({
        name: Googleuser.displayName,
        email: Googleuser.email,
        // You might want to add more user properties here
      });
      localStorage.setItem('user', userJSON);
      const db = getFirestore();
      await setDoc(doc(db, 'users', Googleuser.uid), {
        name: Googleuser.displayName,
        email: Googleuser.email,
        // Add any other user data you want to store
      });
      dispatch(setUser({ email: Googleuser.email, uid: Googleuser.uid, name: Googleuser.displayName,photo:Googleuser.photoURL }));
      navigate('/');
      console.log('Google sign-up successful', Googleuser);
    } catch (error) {
      console.error('Error during Google sign-up:', error);
      // Handle errors here, such as displaying an error message to the user
    }
  };

  
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Create Account</Title>
        <Input
          type=""
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button type="submit">Sign Up</Button>
        <Divider>or</Divider>
        <GoogleButton onClick={handleGoogleSignUp}>
        <FontAwesomeIcon icon={faGoogle} />
          Sign in with Google
        </GoogleButton>
        <SignIn onClick={()=>navigate('/')}>Already have an account?</SignIn>

      </Form>
    </Container>
  );
};

const SignIn = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;

`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  padding: 2rem 0;
  color:black;
`;

const Form = styled.form`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #1877f2;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #1877f2;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #166fe5;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1rem 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #ddd;
  }

  &::before {
    margin-right: 0.5em;
  }

  &::after {
    margin-left: 0.5em;
  }
`;

const GoogleButton = styled(Button)`
  background-color: white;
  color: #757575;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    background-color: #f5f5f5;
  }

  svg {
    color: #4285f4;
  }
`;

export default SignUp;