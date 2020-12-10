import React, { FC, useState } from 'react';
import { useValues, useActions } from 'kea';

import authLogic from 'store/auth';
import Title from 'components/Title';
import Detail from 'components/Detail';
import Button from 'components/Button';
import { useInput } from 'utils/hooks';
import SingleInput from 'components/SingleInput';
import notificationLogic from 'store/notifications';
import api from 'api';

const Profile: FC = () => {
  const [showPassForm, setShowPassForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data } = useValues(authLogic);

  const { addError, addWarning, addSuccess } = useActions(notificationLogic);

  const [pass, , setPass] = useInput('');
  const [upass, , setUPass] = useInput('');

  const onChangePass = async () => {
    if (!pass || !upass) {
      addWarning('Ups!', 'Debe llenar ambos campos');
      return;
    }
    if (pass !== upass) {
      addWarning('Ups!', 'Ambas contraseñas deben coincidir');
      return;
    }
    setLoading(true);
    try {
      const resp = await api.auth.updatePassword({ codRegistro: data.username, password: pass });
      addSuccess('Hecho!', resp.mensaje);
      setPass('');
      setUPass('');
      setShowPassForm(false);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      addError('Error', 'Error actualizando contraseña');
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Title text="Mis datos" />
        <Detail name="Nombre:" value={data.name} />
        <Detail name="Código:" value={data.username} />
      </div>
      <div>
        <Title text="Cambiar contraseña" />
        {showPassForm ? (
          <>
            <SingleInput
              id="update-password-input"
              type="password"
              label="Nueva Contraseña:"
              onChangeValue={setPass}
              value={pass}
              placeholder=""
              disabled={loading}
            />
            <SingleInput
              id="confirm-password-input"
              type="password"
              label="Confirmar Contraseña:"
              onChangeValue={setUPass}
              value={upass}
              placeholder=""
              disabled={loading}
            />
            <div className="grid grid-cols-2 gap-2">
              <Button disabled={loading} label="Cancelar" onClick={() => setShowPassForm(false)} full />
              <Button disabled={loading} label="Actualizar" onClick={onChangePass} type="proceed" full />
            </div>
          </>
        ) : (
          <Button label="Cambiar" onClick={() => setShowPassForm(true)} />
        )}
      </div>
    </div>
  );
};

export default Profile;
