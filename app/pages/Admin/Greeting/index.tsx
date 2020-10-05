import React, { FC } from 'react';

import AdminGreetingImage from './AdminGreetingImage';

const AdminGreeting: FC = () => {
  return (
    <div className="flex h-full justify-center">
      <div className="max-w-sm w-full mt-32">
        <AdminGreetingImage />
        <div className="text-center text-gray-700 mt-8 text-lg leading-8">
          <p>¿Listo para iniciar?</p>
          <p>Elige una opción en el menú de la izquierda</p>
        </div>
      </div>
    </div>
  );
};

export default AdminGreeting;
