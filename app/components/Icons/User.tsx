import React, { FC } from 'react';

interface UserProps {
  size?: number;
  color?: string;
}

const User: FC<UserProps> = ({ size = 20, color = 'currentColor' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill={color}>
      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>
  );
};

export default User;
