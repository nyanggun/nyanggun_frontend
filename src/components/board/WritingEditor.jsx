import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./WritingEditor.css";

const WritingEditor = ({ value = "", onChange = () => {} }) => {
  return (
    <CKEditor
      className="writing-editor"
      editor={ClassicEditor}
      data={value}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
      config={{ placeholder: "내용을 입력하세요" }}
    />
  );
};

export default WritingEditor;
