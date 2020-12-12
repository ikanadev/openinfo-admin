import React, { FC } from 'react';
import { IconProps } from 'types/common';

const CaretDown: FC<IconProps> = ({ size = 20, color = 'currentColor' }) => {
  return (
    <svg width={size} height={size} fill={color} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default CaretDown;
