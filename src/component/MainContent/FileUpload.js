import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import './FileUpload.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import imaag from '../../images/side.png'


function FileUpload({ setEmails, setFileUploaded, setEmailsFound }) {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("Upload the excel file here");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      setLoading(true);
      setFileName(file.name);

      reader.onload = (evt) => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
        const emails = data.flat().filter(email => email && typeof email === 'string' && email.includes('@'));
        setEmails(emails);
        setFileUploaded(true); 
        setEmailsFound(emails.length > 0);
        setLoading(false);
      };

      reader.readAsBinaryString(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className='FileUploadContainer'>
      <div className="textheader">
        <h1>COLD EMAILING</h1>
        <h2>MADE EASY</h2>
        <p>JUST UPLOAD EXCEL FILE AND WE'LL TAKE CARE OF THE REST</p>
      </div>
      <div className="container">
        <div className="upload-button" onClick={handleClick}>
          <p htmlFor="file-upload">
            <div className="icon">
              <FontAwesomeIcon icon={faFileAlt} style={{ "height": "100px","color":"white" }} />
            </div>
            <p>{fileName}</p>
            <input
              type="file"
              id="file-upload"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
          </p>
        </div>
      </div>
      {loading && <p>Processing file...</p>}
      <img src={imaag} className='imaag' alt=''/>
    </div>
  );
}

export default FileUpload;