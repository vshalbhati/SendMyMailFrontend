import React, { useState, useEffect } from 'react';
import FileUpload from './MainContent/FileUpload';
import EmailList from './MainContent/EmailList';
import EmailTemplateSelector from './MainContent/EmailTemplateSelector';
import CustomTemplateEditor from './MainContent/CustomTemplateEditor';
import EmailSender from './MainContent/EmailSender';
import Header from './HeaderPages/Header';
import '../styles.css';

function Home() {
  const [emails, setEmails] = useState([]);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [emailsFound, setEmailsFound] = useState(false);
  const [currentAttachment, setCurrentAttachment] = useState(null);

  const [templates, setTemplates] = useState(() => {
    const savedTemplates = localStorage.getItem('emailTemplates');
    return savedTemplates ? JSON.parse(savedTemplates) : [
      { name: 'Template 1', subject: 'Hello from Template 1', content: 'This is the content of Template 1' },
      { name: 'Template 2', subject: 'Greetings from Template 2', content: 'This is the content of Template 2' },
    ];
  });
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [editingTemplate, setEditingTemplate] = useState(null);

  useEffect(() => {
    localStorage.setItem('emailTemplates', JSON.stringify(templates));
    console.log(templates)

  }, [templates]);

  const addTemplate = (newTemplate) => {
    const templateToAdd = {
      name: newTemplate.name,
      subject: newTemplate.subject,
      content: newTemplate.content,
      attachment: newTemplate.attachment
    };
    setTemplates([...templates, templateToAdd]);
    setCurrentAttachment(newTemplate.attachment);
  };

  const updateTemplate = (updatedTemplate) => {
    setTemplates(templates.map(template => 
      template.name === updatedTemplate.name ? updatedTemplate : template
    ));
    setCurrentAttachment(updatedTemplate.attachment);
    setEditingTemplate(null);
  };

  const deleteTemplate = (templateName) => {
    setTemplates(templates.filter(template => template.name !== templateName));
    if (selectedTemplate && selectedTemplate.name === templateName) {
      setSelectedTemplate(null);
    }
  };

  const startEditing = (template) => {
    setEditingTemplate(template);
  };

  return (
    <div className="App">
      <Header />

      <main className="main-content">
      <FileUpload 
          setEmails={setEmails} 
          setFileUploaded={setFileUploaded} 
          setEmailsFound={setEmailsFound}
        />
        {fileUploaded && (
          emailsFound ? (
            <>
              <EmailList emails={emails} />
              {editingTemplate ? (
                <CustomTemplateEditor 
                  addTemplate={updateTemplate} 
                  initialTemplate={editingTemplate}
                  onCancel={() => setEditingTemplate(null)}
                />
              ) : (
                <CustomTemplateEditor addTemplate={addTemplate} />
              )}
              <EmailTemplateSelector 
                templates={templates} 
                setSelectedTemplate={setSelectedTemplate}
                onEdit={startEditing}
                onDelete={deleteTemplate}
              />
              <EmailSender emails={emails} template={selectedTemplate} attachment={currentAttachment}/>
            </>
          ) : (
            <div className="errormsg">
              <p>No Email IDs were found!</p>
            </div>
          )
        )}
        
      </main>
      
    </div>
  );
}

export default Home;