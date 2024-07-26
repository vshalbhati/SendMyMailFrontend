import React, { useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getFirestore, collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { auth } from '../../firebaseConfig';

const MyProfile = () => {
  const user = useSelector((state) => state.user.user);
  const db = getFirestore();
  const [sentEmails, setSentEmails] = useState([]);
  const [weeklyEmailActivity, setWeeklyEmailActivity] = useState([]);


  // useEffect(() => {
  //   fetchSentEmails();
  // }, []);

  // const fetchSentEmails = async () => {
  //   const user = auth.currentUser;
  //   if (!user) {
  //     console.error('No user is currently logged in');
  //     return;
  //   }

  //   const emailsRef = collection(db, 'sentEmails');
  //   const q = query(
  //     emailsRef,
  //     where('userId', '==', user.uid),
  //     orderBy('timestamp', 'desc')
  //   );

  //   try {
  //     const querySnapshot = await getDocs(q);
  //     const emails = querySnapshot.docs.map(doc => ({
  //       id: doc.id,
  //       ...doc.data(),
  //       timestamp: doc.data().timestamp.toDate()
  //     }));
  //     console.log("Emails are: ",emails);
  //     setSentEmails(emails);
  //   } catch (error) {
  //     console.error('Error fetching sent emails:', error);
  //   }
  // };
  useEffect(() => {
    const fetchData = async () => {
      const emails = await fetchSentEmails();
      setSentEmails(emails);
      const processedData = processEmailData(emails);
      setWeeklyEmailActivity(processedData);
    };

    fetchData();
  }, []);

  const getTotalMailsNumber = () => {
    let ans = 0;
    for (let i = 0; i < sentEmails.length; i++) {
      ans += sentEmails[i].sentCount;
    }
    return ans;
  };
  
  const getUniquelog = () => {
    let arr = [];
    for (let i = 0; i < sentEmails.length; i++) {
      for (let j = 0; j < sentEmails[i].recipients.length; j++) {
        arr.push(sentEmails[i].recipients[j].email);
      }
    }
  
    let matchMedia = {};
    for (let i = 0; i < arr.length; i++) {
      if (matchMedia[arr[i]]) {
        matchMedia[arr[i]]++;
      } else {
        matchMedia[arr[i]] = 1;
      }
    }
  
    return Object.keys(matchMedia).length;
  };
  const fetchSentEmails = async () => {
  const user = auth.currentUser;
  if (!user) {
    console.error('No user is currently logged in');
    return [];
  }

  const emailsRef = collection(db, 'sentEmails');
  const q = query(
    emailsRef,
    where('userId', '==', user.uid),
    orderBy('timestamp', 'desc')
  );

  try {
    const querySnapshot = await getDocs(q);
    const emails = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp.toDate()
    }));
    return emails;
  } catch (error) {
    console.error('Error fetching sent emails:', error);
    return [];
  }
};

const processEmailData = (emails) => {
  const emailCountByDay = {};
  
  emails.forEach(email => {
    // Convert the timestamp string to a Date object
    const date = new Date(email.timestamp);
    const dateString = date.toISOString().split('T')[0]; // Get the date part
    
    if (emailCountByDay[dateString]) {
      emailCountByDay[dateString] += email.sentCount; // Add sentCount instead of incrementing by 1
    } else {
      emailCountByDay[dateString] = email.sentCount; // Initialize with sentCount
    }
  });
  
  return Object.keys(emailCountByDay).map(date => ({
    day: date,
    emails: emailCountByDay[date]
  }));
};

  return (
    <ProfileContainer>
      <CoverPhoto>
        <ProfilePicture src={user.photo || 'https://via.placeholder.com/150'} alt="Profile" />
      </CoverPhoto>
      <ProfileContent>
        <ProfileHeader>
          <h1>Hi, {user.name}!</h1>
          <p>This is your Dashboard</p>
        </ProfileHeader>
        <StatisticsContainer>
          <StatBox>
            <FontAwesomeIcon icon={faEnvelope} size="2x" color="#3498db" />
            <StatNumber>{getTotalMailsNumber()}</StatNumber>
            <StatLabel>Emails Sent</StatLabel>
          </StatBox>
          <StatBox>
            <FontAwesomeIcon icon={faUserFriends} size="2x" color="#2ecc71" />
            <StatNumber>{getUniquelog()}</StatNumber>
            <StatLabel>Unique Recipients</StatLabel>
          </StatBox>
        </StatisticsContainer>
        <GraphContainer>
          <h2>Weekly Email Activity</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyEmailActivity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="emails" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </GraphContainer>
      </ProfileContent>
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const CoverPhoto = styled.div`
  height: 200px;
  background-image: url('https://via.placeholder.com/1000x200');
  background-size: cover;
  background-position: center;
  position: relative;
`;

const ProfilePicture = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 5px solid #fff;
  position: absolute;
  bottom: -75px;
  left: 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const ProfileContent = styled.div`
  padding: 100px 50px 50px;
`;

const ProfileHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;

  h1 {
    font-size: 2.5em;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.2em;
    color: #666;
  }
`;

const StatisticsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const StatBox = styled.div`
  flex: 1;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  margin: 0 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const StatNumber = styled.div`
  font-size: 2.5em;
  font-weight: bold;
  margin: 10px 0;
  color: #333;
`;

const StatLabel = styled.div`
  font-size: 1em;
  color: #666;
`;

const GraphContainer = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 20px;
    text-align: center;
  }
`;

export default MyProfile;