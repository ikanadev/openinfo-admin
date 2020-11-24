import React, { FC } from 'react';

import { Cross } from 'components/Icons';

interface Props {
  label: string;
  text: string;
  textSec: string;
  subText: string;
  disabled?: boolean;
  onCancel: () => void;
}

const Item: FC<Props> = ({ label, text, textSec, subText, disabled = false, onCancel }) => {
  const clickHandler = () => {
    if (disabled) return;
    onCancel();
  };
  return (
    <>
      <p className="text-sm leading-5 mb-2 font-medium mt-4 text-gray-700">{label}</p>
      <div className="flex mb-4 bg-white shadow rounded-md">
        <div className="flex flex-1 flex-col px-4 py-3">
          <p className={`${disabled ? 'text-gray-600' : 'text-gray-800'} text-base`}>
            {text}
            <span className="text-gray-600"> {textSec}</span>
          </p>
          <span className="text-sm text-gray-600">{subText}</span>
        </div>
        <span
          className={`${
            disabled ? 'text-red-300' : 'text-red-600'
          } self-center h-12 w-12 flex justify-center items-center cursor-pointer mr-2 hover:bg-gray-200 rounded-full`}
          onClick={clickHandler}
        >
          <Cross size={30} />
        </span>
      </div>
    </>
  );
};

export default Item;
