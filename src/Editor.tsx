import React, { useRef, useEffect, useState } from 'react';
import { EmailEditor, EditorRef } from 'react-email-editor';
import { EmailEditorProps } from 'react-email-editor';

const Editor = () => {
  const emailEditorRef = useRef<EditorRef>(null);

  const [mergeTags, setMergeTags] = useState({
    first_name: 'AJ'
  });

  useEffect(() => {
    const savedDesign = localStorage.getItem('emailDesign');
    if (savedDesign) {
      const unlayer = emailEditorRef.current?.editor;
      unlayer?.loadDesign(JSON.parse(savedDesign));
    }
  }, []);

  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml((data) => {
      const { design, html } = data;
      console.log('exportHtml', html);

      const blob = new Blob([html], { type: 'text/html' });

      const link = document.createElement('a');

      link.href = URL.createObjectURL(blob);

      link.download = 'exported_unlayer_html.html';

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
    });
  };

  const saveDesign = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml((data) => {
      const { design } = data;

      if (design) {
        localStorage.setItem('emailDesign', JSON.stringify(design));
        console.log('Design saved successfully');
        alert('Design saved');
      }
    });
  };


  const handleUpdateMergeTag = () => {
    setMergeTags((prevTags) => ({
      ...prevTags,
      first_name: 'Chris' 
    }));
  };

  const onReady: EmailEditorProps['onReady'] = (unlayer) => {
    console.log('onReady', unlayer);

    unlayer.registerCallback('previewHtml', function (params, done) {
      console.log('Preview callback registered');
      unlayer.exportHtml(function (data) {
        const { html } = data;
        done({
          html: html
        });
        console.log('done', html);
      });
    });
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={exportHtml} style={{ padding: '10px', fontSize: '16px', fontWeight: 'bold' }}>
          Export HTML
        </button>
        <button onClick={saveDesign} style={{ padding: '10px', fontSize: '16px', fontWeight: 'bold' }}>
          Save
        </button>
        <button onClick={handleUpdateMergeTag} style={{ padding: '10px', fontSize: '16px', fontWeight: 'bold' }}>
          Update Merge Tag (First Name to Chris)
        </button>
      </div>

      <EmailEditor
        ref={emailEditorRef}
        onReady={onReady}
        style={{
          height: '100vh',
          width: '100vw',
          backgroundColor: '#f5f5f5'
        }}
        options={{
          projectId: 239206,
          displayMode: 'document',
          mergeTags: {
            first_name: {
              name: 'First Name',
              value: mergeTags.first_name, 
              sample: 'John'
            }
          }
        }}
      />
    </div>
  );
};

export default Editor;
