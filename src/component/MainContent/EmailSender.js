  // const sendEmails = async () => {
  //   if (!emails.length || !template) {
  //     alert('Please upload emails and select a template');
  //     return;
  //   }

  //   setSending(true);
  //   try {
  //     const formData = new FormData();
  //     formData.append('emails', JSON.stringify(emails));
  //     formData.append('template', JSON.stringify(template));
  //     if (attachment) {
  //       formData.append('attachment', attachment, attachment.name);
  //     }

  //     const response = await axios.post('https://sudibackend.vercel.app/api/send-emails', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       }
  //     });
  //     setResult(response.data);
  //     alert(`Emails sent successfully to ${response.data.sentCount} recipients`);
  //   } catch (error) {
  //     console.error('Error sending emails:', error);
  //     alert('Failed to send emails. Please try again.');
  //   } finally {
  //     setSending(false);
  //   }
  // };
// API KEY = e497d27a6dfe0bbb3ef473087da96795-91fbbdba-a2d23d3c

import React, { useState } from 'react';
import axios from 'axios';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { auth } from '../../firebaseConfig';


function EmailSender({ emails, template, attachment }) {
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState(null);
  const db = getFirestore();

  const sendEmails = async () => {
    if (!emails.length || !template) {
      alert('Please upload emails and select a template');
      return;
    }
  
    setSending(true);
    try {
      const formData = new FormData();
      formData.append('emails', JSON.stringify(emails));
      formData.append('template', JSON.stringify(template));
      if (attachment) {
        formData.append('attachment', attachment);
      }
  
      const response = await axios.post('http://localhost:3001/api/send-emails', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setResult(response.data);
      await storeEmailData(response.data);
      alert(`Emails sent successfully to ${response.data.sentCount} recipients`);
    } catch (error) {
      console.error('Error sending emails:', error.response ? error.response.data : error);
      alert('Failed to send emails. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const storeEmailData = async (emailResult) => {
    const user = auth.currentUser;
    if (!user) {
      console.error('No user is currently logged in');
      return;
    }

    try {
      const emailData = {
        userId: user.uid,
        template: template.name,
        subject: template.subject,
        content: template.content,
        sentCount: emailResult.sentCount,
        failedCount: emailResult.failedEmails.length,
        timestamp: new Date(),
        recipients: emails.map(email => ({ email })),
      };

      if (attachment) {
        emailData.attachment = attachment.name;
      }

      const docRef = await addDoc(collection(db, 'sentEmails'), emailData);
      console.log('Email data stored with ID: ', docRef.id);
    } catch (error) {
      console.error('Error storing email data: ', error);
    }
  };

  return (
    <div className='EmailSender'>
      <h2>Send Emails</h2>
      {template && (
        <div>
          <h3>Selected Template: {template.name}</h3>
          <p>Subject: {template.subject}</p>
          <p>Content: {template.content}</p>
          {attachment && <p>Attachment: {attachment.name}</p>}
        </div>
      )}
      <button onClick={sendEmails} disabled={sending || !template}>
        {sending ? 'Sending...' : `Send to ${emails.length} recipients`}
      </button>
      {result && (
        <div>
          <p>Sent: {result.sentCount}</p>
          <p>Failed: {result.failedEmails.length}</p>
        </div>
      )}
    </div>
  );
}

export default EmailSender;