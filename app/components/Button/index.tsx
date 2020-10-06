import React, { FC } from 'react';

interface Props {
  label: string;
  disabled?: boolean;
  submit?: boolean;
  type?: 'normal' | 'proceed' | 'cancel';
  full?: boolean;
  onClick: () => void;
}

const Button: FC<Props> = ({ label, disabled = false, submit = false, type = 'normal', full = false, onClick }) => {
  const getColor = (): string => (disabled ? 'text-gray-400' : 'text-white');
  const getBg = (): string => {
    if (disabled) return 'bg-gray-200';
    switch (type) {
      case 'normal':
        return 'bg-gray-600';
      case 'proceed':
        return 'bg-teal-600';
      case 'cancel':
        return 'bg-red-700';
      default:
        return '';
    }
  };
  const getShadow = () => (disabled ? '' : 'shadow-sm');
  const getCursor = () => (disabled ? 'cursor-not-allowed' : 'cursor-pointer');
  const getHover = (): string => {
    if (disabled) return '';
    switch (type) {
      case 'normal':
        return 'bg-gray-700';
      case 'proceed':
        return 'bg-teal-700';
      case 'cancel':
        return 'bg-red-800';
      default:
        return '';
    }
  };
  return (
    <button
      className={`m-2 px-4 py-2 rounded-md font-header font-semibold tracking-wider text-sm transition duration-300 ${getShadow()} ${getColor()} ${getBg()} ${getCursor()} hover:${getHover()} ${
        full ? 'w-full mx-0' : ''
      }`}
      onClick={onClick}
      type={submit ? 'submit' : 'button'}
    >
      {label.toUpperCase()}
    </button>
  );
};

export default Button;
