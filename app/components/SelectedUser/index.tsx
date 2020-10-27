import React, { FC } from 'react';

import Subtitle from 'components/Subtitle';
import { SearchResult } from 'types/common';

interface Props {
  subtitle: string;
  user: SearchResult | null;
  noUserText: string;
}

const SelectedUser: FC<Props> = ({ subtitle, user, noUserText }) => {
  return (
    <>
      <Subtitle text={subtitle} />
      {user ? (
        <div className="flex flex-col text-gray-800 p-2 bg-white shadow-sm rounded-md">
          <p className="text-base">
            {user.nombre}
            <span className="text-gray-600"> ({user.codRegistro})</span>
          </p>
          <span className="text-sm text-gray-600">{user.correo}</span>
        </div>
      ) : (
        <p className="text-gray-600 text-center italic my-4">{noUserText}</p>
      )}
    </>
  );
};

export default SelectedUser;
