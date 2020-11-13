import React, { FC, useState } from 'react';
import { Transition } from '@headlessui/react';

import Title from 'components/Title';
import Button from 'components/Button';
import SingleInput from 'components/SingleInput';
import ImageSelector from 'components/ImageSelector';

interface Props {
  open: boolean;
}

const EditActivities: FC<Props> = ({ open }) => {
  const [val, setVal] = useState('');
  const handleClick = () => {
    //
  };
  return (
    <Transition
      show={open}
      enter="transition duration-300"
      enterFrom="transform -translate-x-full"
      enterTo="transform translate-x-0"
      className="min-w-full"
    >
      <div className="flex">
        <div className="flex-1">
          <Title text="Editar Datos" />

          <SingleInput
            id="activity-title"
            value={val}
            label="Título"
            onChangeValue={setVal}
            placeholder="Ej. Proyecto sitio web"
          />
          <SingleInput
            id="activity-video-link"
            value={val}
            label="Link video"
            onChangeValue={setVal}
            placeholder="youtube, facebook, vimeo, etc..."
          />
          <ImageSelector label="Banner o imagen principal" imgUrl="" setFile={handleClick} setUrlFile={handleClick} />
          <SingleInput
            id="activity-description"
            value={val}
            label="Descripción"
            onChangeValue={setVal}
            placeholder="Breve descripción del proyecto"
            multiple
          />
          <Button label="Actualizar" onClick={handleClick} type="proceed" full />
        </div>
        <div className="flex-1 ml-5">
          <Title text="Actividades" />

          <table className="w-full rounded-lg overflow-hidden shadow-md">
            <thead className="bg-teal-600 text-white">
              <tr>
                <td className="py-1 pl-5">Actividad</td>
                <td>Nota</td>
                <td>Acciones</td>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-2 pl-5">Proyecto web medio ambiente</td>
                <td>86</td>
                <td>
                  <Button label="Editar" onClick={handleClick} />
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2 pl-5">Proyecto web medio ambiente</td>
                <td>60</td>
                <td>
                  <Button label="Editar" onClick={handleClick} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Transition>
  );
};

export default EditActivities;
