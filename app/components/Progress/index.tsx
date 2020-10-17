import React, { FC } from 'react';
import { Transition } from '@headlessui/react';

interface Props {
  title: string;
  percent: number;
  isOpen: boolean;
}

const Progress: FC<Props> = ({ title, percent, isOpen }) => {
  return (
    <Transition
      show={isOpen}
      enter="transition duration-200"
      enterFrom="transform opacity-0 scale-y-0"
      enterTo="transform opacity-100 scale-y-100"
      leave="transition duration-200"
      leaveFrom="transform opacity-100 scale-y-100"
      leaveTo="transform opacity-0 scale-y-0"
      className="overflow-hidden my-2"
    >
      <div className="flex flex-col">
        <p className="text-center text-gray-700 italic mb-1 animate-pulse">{title}</p>
        <div className="rounded-full shadow-inner bg-gray-300 p-1">
          <div className="h-2 bg-teal-500 w-1/2 rounded-full animate-pulse" style={{ width: `${percent}%` }} />
        </div>
      </div>
    </Transition>
  );
};

export default Progress;
