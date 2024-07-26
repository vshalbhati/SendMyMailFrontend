import React, { useState, useEffect} from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faClock, faUser, faTimes } from '@fortawesome/free-solid-svg-icons';
import { getFirestore, collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { auth } from '../../firebaseConfig';
import nofound from "../../images/notfound.png";
Modal.setAppElement('#root');

const EmailRecord = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [sentEmails, setSentEmails] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    fetchSentEmails();
  }, []);

  const fetchSentEmails = async () => {
    const user = auth.currentUser;
    if (!user) {
      console.error('No user is currently logged in');
      return;
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
      console.log("Emails are: ",emails);
      setSentEmails(emails);
    } catch (error) {
      console.error('Error fetching sent emails:', error);
    }
  };

  const openModal = (email) => {
    setSelectedEmail(email);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <Container>
      {sentEmails.length>0 ?(
        <EmailList>
          <h1>Email Records</h1>
          {sentEmails.map((email) => (
            <EmailItem key={email.id} onClick={() => openModal(email)}>
              <EmailIcon>
                <FontAwesomeIcon icon={faEnvelope} />
              </EmailIcon>
              <EmailContent>
                <EmailSubject>{email.subject}</EmailSubject>
                <EmailRecipient>{email.recipients.length} recipients</EmailRecipient>
              </EmailContent>
              <EmailDate>{email.timestamp.toLocaleDateString()}</EmailDate>
            </EmailItem>
          ))}
      </EmailList>
      ):(
        <Nomailbox>
          <img src={nofound} style={{"height":"40vh","width":"20vw"}}/>
          <h2>No emails sent yet!</h2>
          <p>Start sending mails...</p>
        </Nomailbox>
      ) 
      }
      

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Email Details"
      >
        {selectedEmail && (
          <ModalContent>
            <ModalHeader>
              <h2>{selectedEmail.subject}</h2>
              <CloseButton onClick={closeModal}>
                <FontAwesomeIcon icon={faTimes} />
              </CloseButton>
            </ModalHeader>
            <ModalBody>
              <EmailDetail>
                <FontAwesomeIcon icon={faUser} />
                <span>To: {selectedEmail.recipients.map(r => r.email).join(', ')}</span>
              </EmailDetail>
              <EmailDetail>
                <FontAwesomeIcon icon={faClock} />
                <span>Sent: {selectedEmail.timestamp.toLocaleString()}</span>
              </EmailDetail>
              <EmailContent>{selectedEmail.content}</EmailContent>
              {selectedEmail.attachment && (
                <EmailDetail>
                  <span>Attachment: {selectedEmail.attachment}</span>
                </EmailDetail>
              )}
            </ModalBody>
          </ModalContent>
        )}
      </Modal>
    </Container>
  );
};

const Container = styled.div`
  max-width: 100%;
  margin: 1rem auto;
  padding: 20px;
  height:100vh;

  h1{
  text-align:center;
  color:black;
  }
`;

const EmailList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const EmailItem = styled.li`
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const EmailIcon = styled.div`
  margin-right: 15px;
  color: #3498db;
`;

const EmailContent = styled.div`
  flex-grow: 1;
`;

const EmailSubject = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
    color: #666;

`;

const EmailRecipient = styled.div`
  color: #666;
  font-size: 0.9em;
`;

const EmailDate = styled.div`
  color: #999;
  font-size: 0.8em;
`;

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '500px',
    width: '100%',
    padding: '0',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e0e0e0;

  h2 {
    margin: 0;
    font-size: 1.5em;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #333;
  }
`;

const ModalBody = styled.div`
  padding: 20px;
`;

const EmailDetail = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  color: #666;

  svg {
    margin-right: 10px;
  }
`;
const Nomailbox = styled.div`
  color:black;
  text-align:center;
  margin:auto;
  padding:2rem;
`;
export default EmailRecord;