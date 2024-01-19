import React, { useRef, useEffect } from 'react';
import { EmailEditor, EditorRef } from 'react-email-editor';
import { EmailEditorProps } from 'react-email-editor';

const Editor = () => {
  const emailEditorRef = useRef<EditorRef>(null);

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
        alert('design saved');
      }
    });
  };

  const onReady: EmailEditorProps['onReady'] = (unlayer) => {
    const savedDesign = localStorage.getItem('emailDesign');
    if (savedDesign) {
      unlayer.loadDesign(JSON.parse(savedDesign));
    }
    // Uncomment and load your template design JSON here
    // const templateJson = { DESIGN JSON GOES HERE };
    // unlayer.loadDesign(templateJson);
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
      </div>

      <EmailEditor ref={emailEditorRef} onReady={onReady} />
    </div>
  );
};

export default Editor;