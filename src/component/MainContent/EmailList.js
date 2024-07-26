// components/EmailList.js
import React from 'react';

function EmailList({ emails }) {
  return (
    <div className='Emaillist'>
      <h2>Fetched Emails</h2>
      {/* {emails.length > 0 ? ( */}
        <ul style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
          {emails.map((email, index) => (
            <li key={index}>{email}</li>
          ))}
        </ul>
      {/* ) : (
        <p>No emails fetched yet. Please upload an Excel file.</p>
      )} */}
      <p>Total emails: {emails.length}</p>
    </div>
  );
}

export default EmailList;