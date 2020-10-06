import React, { FC, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import SingleInput from 'components/SingleInput';
import Title from 'components/Title';
import ImageSelector from 'components/ImageSelector';

import { useInput } from 'utils/hooks';
import Button from 'components/Button';

const Sponsors: FC = () => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [val, , setVal] = useInput('');
  const fn = () => {
    //
  };
  const toggleForm = () => {
    setIsOpenForm((prev) => !prev);
  };
  return (
    <div>
      <Title text="Auspiciadores registrados:" />
      <div className="flex mb-10">
        <table className="w-full rounded-lg overflow-hidden shadow-md">
          <thead className="bg-teal-600 text-white">
            <tr>
              <td className="py-1 pl-5">Nombre</td>
              <td>Sito web</td>
              <td>Contacto</td>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="py-2 pl-5">San Luis S.A.</td>
              <td>
                <a href="#" className="text-blue-600">
                  https://www.sanluisbolivia.com
                </a>
              </td>
              <td>2225335</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-2 pl-5">San Luis S.A.</td>
              <td>
                <a href="#" className="text-blue-600">
                  https://www.sanluisbolivia.com
                </a>
              </td>
              <td>2225335</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-2 pl-5">San Luis S.A.</td>
              <td>
                <a href="#" className="text-blue-600">
                  https://www.sanluisbolivia.com
                </a>
              </td>
              <td>2225335</td>
            </tr>
          </tbody>
        </table>
      </div>

      <CSSTransition in={isOpenForm} timeout={500} classNames="appear" unmountOnExit>
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
            <Button label="Registrar" onClick={fn} type="proceed" full />
            <span className="w-6" />
            <Button label="Cancelar" onClick={toggleForm} type="cancel" full />
          </div>
        </div>
      </CSSTransition>
      {!isOpenForm && <Button label="Agregar auspiciador" onClick={toggleForm} type="proceed" />}
    </div>
  );
};

export default Sponsors;
