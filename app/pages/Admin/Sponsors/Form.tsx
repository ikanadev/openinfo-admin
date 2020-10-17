import React, { FC } from 'react';
import { useActions, useValues } from 'kea';

import Title from 'components/Title';
import Progress from 'components/Progress';
import SingleInput from 'components/SingleInput';
import Button from 'components/Button';
import ImageSelector from 'components/ImageSelector';

import commissionLogic from 'store/forms/commision';

interface Props {
  onClick: () => void;
}

const Form: FC<Props> = ({ onClick }) => {
  const {
    form: { name, website, contact, description, imageURL },
    percentUploaded,
    isLoading,
  } = useValues(commissionLogic);
  const { setName, setWebsite, setContact, setDescription, setImage, setImageURL, postData } = useActions(
    commissionLogic,
  );
  return (
    <>
      <Title text="Agregar auspiciador:" />
      <Progress title={`Regitrando auspiciador (${percentUploaded}%)`} isOpen={isLoading} percent={percentUploaded} />
      <div className="flex">
        <div className="flex flex-col flex-1">
          <SingleInput
            label="Nombre:"
            value={name}
            onChangeValue={setName}
            disabled={isLoading}
            id="company-name"
            placeholder="Nombre de la empresa"
            type="text"
          />
          <SingleInput
            label="Sitio web:"
            value={website}
            onChangeValue={setWebsite}
            disabled={isLoading}
            id="company-website"
            placeholder="ej. www.misitio.com"
            type="text"
          />
          <SingleInput
            label="Contacto:"
            value={contact}
            onChangeValue={setContact}
            disabled={isLoading}
            id="company-phone"
            placeholder="ej. 22222222"
            type="text"
          />
          <SingleInput
            label="Description:"
            value={description}
            onChangeValue={setDescription}
            disabled={isLoading}
            id="company-description"
            placeholder="Agregar descripción"
            type="text"
            multiple
          />
        </div>
        <div className="flex-1 ml-8">
          <ImageSelector
            imgUrl={imageURL}
            label="Logo:"
            disabled={isLoading}
            setFile={setImage}
            setUrlFile={setImageURL}
          />
        </div>
      </div>
      <div className="flex">
        <Button label="Registrar" onClick={postData} disabled={isLoading} type="proceed" full />
        <span className="w-6" />
        <Button label="Cancelar" onClick={onClick} disabled={isLoading} type="cancel" full />
      </div>
    </>
  );
};

export default Form;
