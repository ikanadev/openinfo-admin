import React, { FC } from 'react';

interface Props {
  text: string;
}

const Title: FC<Props> = ({ text }) => {
  return <h2 className="text-teal-600 mt-5 mb-3 font-header font-bold text-xl">{text.toUpperCase()}</h2>;
};

export default Title;
