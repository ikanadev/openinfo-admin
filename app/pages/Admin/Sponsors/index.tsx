import React, { FC, useState } from 'react';
import { Transition } from '@headlessui/react';

import Title from 'components/Title';
import Button from 'components/Button';
import Form from './Form';
import SponsorsTable from './SponsorsTable';

const Sponsors: FC = () => {
  const [isOpenForm, setIsOpenForm] = useState(true);
  const toggleForm = () => {
    setIsOpenForm((prev) => !prev);
  };
  return (
    <div>
      <Title text="Auspiciadores registrados:" />
      <SponsorsTable />

      <div className="relative">
        <Transition
          show={isOpenForm}
          enter="transition duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition duration-200"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
          className="absolute w-full"
        >
          <Form onClick={toggleForm} />
        </Transition>
        <Transition
          show={!isOpenForm}
          enter="transition duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition duration-200"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
          className="absolute"
        >
          <Button label="Agregar auspiciador" onClick={toggleForm} type="proceed" />
        </Transition>
      </div>
    </div>
  );
};

export default Sponsors;
