import React, { useRef } from 'react';
import { EmailEditor, EditorRef } from 'react-email-editor';
import { EmailEditorProps } from 'react-email-editor';

const Editor = () => {
  const emailEditorRef = useRef<EditorRef>(null);

  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml((data) => {
      const { design, html } = data;
      console.log('exportHtml', html);
      // Do something with the exported HTML, e.g., send it as an email
    });
  };

  const onReady: EmailEditorProps['onReady'] = (unlayer) => {
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
      </div>

      <EmailEditor ref={emailEditorRef} onReady={onReady} />
    </div>
  );
};

export default Editor;