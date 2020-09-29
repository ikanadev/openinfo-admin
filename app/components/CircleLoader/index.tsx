import React, { FC } from 'react';

import './styles.css';

interface CircleLoaderProps {
  size?: number;
}

const CircleLoader: FC<CircleLoaderProps> = ({ size = 100 }) => {
  return (
    <div className="loader" style={{ width: size, height: size }}>
      <svg className="circular" viewBox="25 25 50 50">
        <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" />
      </svg>
    </div>
  );
};

export default CircleLoader;
