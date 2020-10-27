import React, { FC } from 'react';

import CircleLoader from 'components/CircleLoader';

interface Props {
  text: string;
}

const LoaderWithText: FC<Props> = ({ text }) => (
  <div className="flex flex-col items-center">
    <CircleLoader size={30} />
    <span className="text-sm italic text-gray-600 animate-pulse">{text}</span>
  </div>
);

export default LoaderWithText;
