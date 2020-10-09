import React, { FC } from 'react';

interface Props {
  text: string;
}

const Subtitle: FC<Props> = ({ text }) => {
  return <h3 className="text-gray-800 mt-3 mb-1 font-header font-bold text-base">{text.toUpperCase()}</h3>;
};

export default Subtitle;
