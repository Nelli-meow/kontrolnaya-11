import * as React from 'react';
import { useRef, useState } from 'react';

interface FileInputProps {
  name: string;
  label: string;
  onGetFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<FileInputProps> = ({name, label, onGetFile}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');

  const activateInput = () => {
    if(inputRef.current) {
      inputRef.current.click();
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('');
    }

    onGetFile(e);
  };

  return (
    <div className="input-group mb-3">
      <input
        className="form-control"
        style={{display: "none"}}
        type="file"
        name={name}
        onChange={onFileChange}
        ref={inputRef}
      />
      <div>
        <div className="input-group mb-3">
          <input
            className="form-control"
            value={fileName}
            placeholder={label}
            onClick={activateInput}
            disabled
          />
          <button
            type="button"
            onClick={activateInput}
            className="btn btn-outline-warning"
          >
            Add image
          </button>
        </div>

      </div>
    </div>
  );
};

export default FileInput;