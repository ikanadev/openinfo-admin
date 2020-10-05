import React, { FC } from 'react';

import SingleInput from 'components/SingleInput';
import Title from 'components/Title';
import Button from 'components/Button';
import { Search } from 'components/Icons';

import { useInput } from 'utils/hooks';

const Activities: FC = () => {
  const [val, _, setVal] = useInput('Texto de ejemplo');
  return (
    <div>
      <Title text="Agregar auspiciador:" />
      <SingleInput
        endIcon={Search}
        label="Nombre:"
        value={val}
        onChangeValue={setVal}
        id="prueba"
        placeholder="Ingrese su nombre"
        type="text"
      />
      <Button
        label="Aceptar"
        onClick={() => {
          //
        }}
        type="normal"
      />
      <Button
        label="Aceptar"
        onClick={() => {
          //
        }}
        type="proceed"
      />
      <Button
        label="Aceptar"
        onClick={() => {
          //
        }}
        type="cancel"
      />
      <Button
        label="Aceptar"
        onClick={() => {
          //
        }}
        type="cancel"
        disabled
      />
    </div>
  );
};

export default Activities;
