import React, { FC } from 'react';
import { Transition } from '@headlessui/react';

import { Cross } from 'components/Icons';

interface Props {
  open: boolean;
  onClose: () => void;
}

const Modal: FC<Props> = ({ children, open, onClose }) => {
  return (
    <Transition
      show={open}
      enter="transition duration-300"
      enterFrom="transform translate-y-full opacity-0"
      enterTo="transform translate-y-0 opacity-100"
      leave="transition duration-300"
      leaveFrom="transform translate-y-0 opacity-100"
      leaveTo="transform -translate-y-full opacity-0"
      className="fixed top-0 bottom-0 left-0 right-0 z-30 bg-opacity-75 bg-gray-800 flex justify-center items-start"
    >
      <div className="shadow-lg bg-gray-200 rounded-xl p-5 relative w-1/2 mt-40">
        <span
          onClick={onClose}
          className="absolute top-0 right-0 mt-4 mr-4 text-gray-800 cursor-pointer w-8 h-8 flex justify-center items-center rounded-full hover:bg-gray-200 mb-2"
        >
          <Cross />
        </span>
        {children}
      </div>
    </Transition>
  );
};

export default Modal;
