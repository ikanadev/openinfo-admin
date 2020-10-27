import React, { FC } from 'react';

interface Props {
  text: string;
  error?: boolean;
}

const NoItemsText: FC<Props> = ({ text, error = false }) => (
  <div className="my-5">
    <p className={`${error ? 'text-red-600' : 'text-gray-600'} text-center text-base italic`}>{text}</p>
  </div>
);

export default NoItemsText;
