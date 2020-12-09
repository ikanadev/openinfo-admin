import React, { FC, useState, useEffect } from 'react';
import { useActions } from 'kea';

import api from 'api';
import { SearchResult } from 'types/common';
import notificationLogic from 'store/notifications';
import { useInput } from 'utils/hooks';

import Title from 'components/Title';
import SearchUser from 'components/SearchUser';
import SingleInput from 'components/SingleInput';
import Button from 'components/Button';
import NoItemsText from 'components/NoItemsText';

const Users: FC = () => {
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState<SearchResult | null>(null);

  const { addWarning, addSuccess, addError } = useActions(notificationLogic);

  const [name, , setName] = useInput('');
  const [email, , setEmail] = useInput('');

  const handleResetPass = async () => {
    if (!user) return;
    setLoading(true);
    await api.admin.resetPassUser({ codRegistro: user.codRegistro });
    setLoading(false);
    addSuccess('Hecho!', `La contraseña de ${user.nombre} ha sido reseteada`);
  };

  const handleUpdateUser = async () => {
    if (!user) return;
    if (!name || !email) {
      addWarning('Completa los datos', 'Nombre y correo son requeridos');
      return;
    }
    setLoading(true);
    try {
      const resp = await api.admin.updateUser({ codRegistro: user.codRegistro, nombre: name, correo: email });
      setLoading(false);
      addSuccess('Hecho!', resp.mensaje);
      setUser(null);
    } catch (e) {
      setLoading(false);
      addError('Error!', 'Error actualizando datos');
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.nombre);
      setEmail(user.correo);
    }
  }, [user]);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Title text="Administrar usuario" />
        <SearchUser
          label="Buscar usuario"
          disabled={loading}
          labelSelected="Usuario seleccionado"
          onSelectResult={setUser}
          selectedResult={user}
        />
      </div>
      <div>
        {user ? (
          <>
            <Title text="Resetear contraseña" />
            <p className="italic text-sm text-gray-600">
              Esto hará que la contraseña por defecto del usuario sea su código (oinfuser-XXX)
            </p>
            <Button type="cancel" label="Resetear contraseña" disabled={loading} onClick={handleResetPass} />
            <Title text="Actualizar datos" />
            <SingleInput
              id="update-user-name"
              label="Nombre:"
              onChangeValue={setName}
              placeholder="Ej. Pepito Casas Hurtado"
              value={name}
              disabled={loading}
            />
            <SingleInput
              id="update-user-email"
              label="Correo:"
              onChangeValue={setEmail}
              placeholder="Ej. user@correo.com"
              value={email}
              disabled={loading}
            />
            <Button full type="proceed" disabled={loading} label="Actualizar" onClick={handleUpdateUser} />
          </>
        ) : (
          <NoItemsText text="Selecciona un usuario primero..." />
        )}
      </div>
    </div>
  );
};

export default Users;
