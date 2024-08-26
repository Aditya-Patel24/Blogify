import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({ name, control, label, defaultValue = "" }) {
  const editorRef = useRef(null);

  return (
    <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
      <Controller
        name={name || "content"}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Editor
            apiKey='9jwzowmft9qonle5p5ecvhoidi9tm0tkoseztnso0xe5qpc5'
            onInit={(_evt, editor) => editorRef.current = editor}
            value={value}
            onEditorChange={(content) => {
              onChange(content);
            }}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                'advlist autolink lists link image charmap preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table code help wordcount'
              ],
              toolbar: 'undo redo | formatselect | ' +
                       'bold italic backcolor | alignleft aligncenter ' +
                       'alignright alignjustify | bullist numlist outdent indent | ' +
                       'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
          />
        )}
      />
    </div>
  );
}
