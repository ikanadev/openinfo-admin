import React, { FC } from 'react';

import CircleLoader from 'components/CircleLoader';

const Main: FC = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <CircleLoader />
        <p>Cargando...</p>
      </div>
    </div>
  );
};

export default Main;
