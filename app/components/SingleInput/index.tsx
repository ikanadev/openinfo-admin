import React, { FC, memo, useCallback } from 'react';

import { IconProps } from 'types/common';

interface SingleInputProps {
  type?: 'text' | 'number' | 'password' | 'phone' | 'search';
  label: string;
  id: string;
  value: string;
  placeholder: string;
  multiple?: boolean;
  disabled?: boolean;
  startIcon?: FC<IconProps>;
  endIcon?: FC<IconProps>;
  onChangeValue: (value: string) => void;
}

const SingleInput: FC<SingleInputProps> = ({
  type = 'text',
  label = '',
  id,
  value,
  placeholder,
  multiple = false,
  disabled = false,
  onChangeValue,
  startIcon: StartIcon = null,
  endIcon: EndIcon = null,
}) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChangeValue(e.target.value);
  }, []);
  return (
    <div className="flex flex-col items-start my-4">
      <label htmlFor={id} className="text-sm leading-5 mb-2 font-medium text-gray-700">
        {label}
        {disabled && <span className="text-gray-400"> (inhabilitado)</span>}
      </label>
      <div
        className={`self-stretch flex ${disabled ? 'text-gray-500 border-gray-300' : 'text-gray-700 border-gray-600'}`}
      >
        {StartIcon && (
          <span className="mr-2">
            <StartIcon size={25} />
          </span>
        )}
        {multiple ? (
          <textarea
            id={id}
            className="form-input w-full px-1 py-2 sm:text-sm sm:leading-5 pb-1 outline-none border-b-2 focus:border-teal-500 bg-gray-200"
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            rows={3}
            disabled={disabled}
          />
        ) : (
          <input
            className="form-input w-full px-1 sm:text-sm sm:leading-5 pb-1 outline-none border-b-2 focus:border-teal-500 bg-gray-200"
            id={id}
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
            type={type}
            disabled={disabled}
            autoComplete="off"
          />
        )}
        {EndIcon && (
          <span className="ml-2">
            <EndIcon size={25} />
          </span>
        )}
      </div>
    </div>
  );
};

export default memo(SingleInput);
