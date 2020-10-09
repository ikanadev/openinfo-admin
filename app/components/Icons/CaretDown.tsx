import React, { FC } from 'react';
import { IconProps } from 'types/common';

const CaretDown: FC<IconProps> = ({ size = 20, color = 'currentColor' }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill={color}>
      <path
        fillRule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default CaretDown;
