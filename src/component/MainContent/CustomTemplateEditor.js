import React, { useState, useEffect } from 'react';

function CustomTemplateEditor({ addTemplate, initialTemplate, onCancel }) {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [attachment, setAttachment] = useState(null);

  useEffect(() => {
    if (initialTemplate) {
      setName(initialTemplate.name);
      setSubject(initialTemplate.subject);
      setContent(initialTemplate.content);
      setAttachment(initialTemplate.attachment);
    }
  }, [initialTemplate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && subject && content) {
      const templateData = {
        name,
        subject,
        content,
        attachment // Include the attachment in the template data
      };
  
      try {
        await addTemplate(templateData);
        setName('');
        setSubject('');
        setContent('');
        setAttachment(null);
      } catch (error) {
        console.error('Error adding template:', error);
        alert('Failed to add template. Please try again.');
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachment(file);
    }
  };

  return (
    <div className='customTemplate'>
      <h2>{initialTemplate ? 'Edit Template' : 'Create Custom Template'}</h2>
      <div className="formContainer">

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Template Name"
            required
          />
        </div>
        <div>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            required
          />
        </div>
        <div>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Email Content"
            required
          />
        </div>
        <div>
          <label htmlFor="attachment">Attachment:</label>
          <input
            type="file"
            id="attachment"
            onChange={handleFileChange}
          />
          {attachment && <p>File selected: {attachment.name}</p>}
        </div>
        <button type="submit">{initialTemplate ? 'Update Template' : 'Add Template'}</button>
        {initialTemplate && <button type="button" onClick={onCancel}>Cancel</button>}
      </form>
      </div>

    </div>
  );
}

export default CustomTemplateEditor;