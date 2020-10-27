import React, { FC } from 'react';

interface Props {
  text: string;
}

const Subtitle: FC<Props> = ({ text }) => {
  return (
    <h3 className="text-teal-600 mt-3 mb-1 font-header font-semibold text-base tracking-wide">{text.toUpperCase()}</h3>
  );
};

export default Subtitle;
