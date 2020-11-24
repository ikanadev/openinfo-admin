import React, { FC, useState } from 'react';
import { Transition } from '@headlessui/react';
import { useValues, useActions } from 'kea';

import Button from 'components/Button';

import newJuryLogic from 'store/forms/newJury';

const NewJuryForm: FC = () => {
  const [showForm, setShowForm] = useState(false);

  const { form, isLoading } = useValues(newJuryLogic);
  const { postData, setGrado, setProject, setTelf, setUser } = useActions(newJuryLogic);

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <>
      <Transition show={!showForm}>
        <Button label="Nuevo Jurado" onClick={toggleForm} type="proceed" />
      </Transition>
      <Transition show={showForm}>
        <>
          <h1>Here goes the form</h1>
          <button onClick={toggleForm}>close</button>
        </>
      </Transition>
    </>
  );
};

export default NewJuryForm;
