import React, { FC } from 'react';

import { IconProps } from 'types/common';

const MinusCircle: FC<IconProps> = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} fill={color} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
      clipRule="evenodd"
    />
  </svg>
);

export default MinusCircle;
