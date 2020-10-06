import React, { FC } from 'react';

import SingleInput from 'components/SingleInput';
import Title from 'components/Title';
import ImageSelector from 'components/ImageSelector';

import { useInput } from 'utils/hooks';
import Button from 'components/Button';

const Activities: FC = () => {
  const [val, _, setVal] = useInput('');
  const fn = () => {
    //
  };
  return (
    <div>
      <Title text="Agregar auspiciador:" />
      <div className="flex">
        <div className="flex flex-col flex-1">
          <SingleInput
            label="Nombre:"
            value={val}
            onChangeValue={setVal}
            id="company-name"
            placeholder="Nombre de la empresa"
            type="text"
          />
          <SingleInput
            label="Sitio web:"
            value={val}
            onChangeValue={setVal}
            id="company-website"
            placeholder="ej. www.misitio.com"
            type="text"
          />
          <SingleInput
            label="Contacto:"
            value={val}
            onChangeValue={setVal}
            id="company-phone"
            placeholder="ej. 22222222"
            type="text"
          />
          <SingleInput
            label="Description:"
            value={val}
            onChangeValue={setVal}
            id="company-description"
            placeholder="Agregar descripción"
            type="text"
            multiple
          />
        </div>
        <div className="flex-1 ml-8">
          {/* <ImageSelector imgUrl="https://www.tailorbrands.com/wp-content/uploads/2019/09/MOC-2.jpg" label="Logo:" onOpenFile={fn} setFile={fn} setUrlFile={fn} /> */}
          <ImageSelector imgUrl="" label="Logo:" setFile={fn} setUrlFile={fn} />
        </div>
      </div>
      <div className="flex">
        <Button label="Agregar" onClick={fn} type="proceed" full />
        <span className="w-6" />
        <Button label="Cancelar" onClick={fn} type="cancel" full />
      </div>
    </div>
  );
};

export default Activities;
