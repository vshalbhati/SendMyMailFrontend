import React from 'react';

function EmailTemplateSelector({ templates, setSelectedTemplate, onEdit, onDelete }) {
  return (
    <div className='Templateselector'>
      <h2>Select Email Template</h2>
      {templates.map(template => (
        <div key={template.name} className="template-item">
          <h3>{template.name}</h3>
          <p>Subject: {template.subject}</p>
          <p>Content: {template.content ? template.content.substring(0, 50) + '...' : 'No content'}</p>
          <button onClick={() => setSelectedTemplate(template)}>
            Select
          </button>
          <button onClick={() => onEdit(template)}>Edit</button>
          <button onClick={() => onDelete(template.name)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default EmailTemplateSelector;