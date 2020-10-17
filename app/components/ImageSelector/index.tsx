import React, { FC, ChangeEvent, useRef } from 'react';

import Button from 'components/Button';
import UploadImage from './UploadImage';

interface Props {
  imgUrl: string;
  label: string;
  disabled?: boolean;
  setUrlFile: (url: string) => void;
  setFile: (file: File) => void;
}

const ImageSelector: FC<Props> = ({ imgUrl, label, disabled = false, setUrlFile, setFile }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const onSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUrlFile(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
    }
  };
  const handleSelect = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.click();
    }
  };
  return (
    <div className="my-4">
      <label className="text-sm leading-5 font-medium text-gray-700">
        {label}
        {disabled && <span className="text-gray-400"> (inhabilitado)</span>}
      </label>
      <div className="flex flex-col items-center mt-4">
        <div className="w-7/12 mb-4">
          {imgUrl === '' ? <UploadImage /> : <img className="h-full w-full object-cover" src={imgUrl} />}
        </div>
        <input type="file" accept="image/*" className="hidden" onChange={onSelectImage} ref={inputRef} />
        <Button label="Subir" onClick={handleSelect} />
      </div>
    </div>
  );
};

export default ImageSelector;
