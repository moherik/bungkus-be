import React, { useState, useRef } from 'react';
import { filesize } from '@/utils';
import { uploadDir } from '@/constant';

const Button = ({ text, onClick }) => (
  <button
    type="button"
    className="px-4 py-1 text-xs font-medium text-white bg-gray-600 rounded-sm focus:outline-none hover:bg-gray-700"
    onClick={onClick}
  >
    {text}
  </button>
);

export const FileInput = ({
  className,
  name,
  label,
  accept,
  image = null,
  errors = [],
  onChange
}) => {
  const fileInput = useRef();
  const [file, setFile] = useState(null);

  const browse = () => {
    fileInput.current.click();
  };

  const remove = () => {
    setFile(null);
    onChange(null);
    fileInput.current.value = null;
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    setFile(file);
    onChange(file);
  };

  return (
    <div className={className}>
      {label && (
        <label className="form-label" htmlFor={name}>
          {label}:
        </label>
      )}
      <div className={`form-input p-0 ${errors.length && 'error'}`}>
        <input
          id={name}
          ref={fileInput}
          accept={accept}
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
        {!file && !image && (
          <div className="p-2">
            <Button text="Browse" onClick={browse} />
          </div>
        )}
        {(file || image) && (
          <div className="flex items-start gap-2 flex-col justify-between p-2">
            <Button text="Hapus" onClick={remove} />

            {file && (
              <img
                src={URL.createObjectURL(file)}
                className="w-40 h-40 rounded-md object-center object-cover"
              />
            )}
            {!file && image && (
              <img
                src={`${uploadDir}${image}`}
                className="w-40 h-40 rounded-md object-center object-cover"
              />
            )}

            {file && (
              <div className="flex-1">
                {file.name}
                <span className="ml-1 text-xs text-gray-600">
                  ({filesize(file.size)})
                </span>
              </div>
            )}
          </div>
        )}
      </div>
      {errors.length > 0 && <div className="form-error">{errors}</div>}
    </div>
  );
};
