import React, { FC, useEffect, useState } from 'react';
import { useActions, useValues } from 'kea';

import LoaderWithText from 'components/LoaderWithText';
import NoItemsText from 'components/NoItemsText';
import Title from 'components/Title';
import SearchUser from 'components/SearchUser';

import commissionLogic from 'store/data/commission';
import { SearchResult } from 'types/common';
import Item from 'components/Item';
import Button from 'components/Button';
import api from 'api';
import notificationLogic from 'store/notifications';

const Commission: FC = () => {
  const [user, setUser] = useState<SearchResult | null>(null);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingDel, setLoadingDel] = useState(false);

  const { items, isFetched, isLoading } = useValues(commissionLogic);
  const { getItems, addItem, delItem } = useActions(commissionLogic);

  const { addError, addSuccess } = useActions(notificationLogic);

  const onDeleteUser = (code: string) => async () => {
    setLoadingDel(true);
    try {
      await api.admin.delCommission(code);
      delItem(code);
      addSuccess('Hecho!', 'Usuario eliminado de la comisión');
    } catch (e) {
      addError('Error', 'Error eliminando este usuario');
    }
    setLoadingDel(false);
  };

  const onSubmitCommission = async () => {
    if (!user) return;
    setLoadingAdd(true);
    try {
      const resp = await api.admin.postCommission({ codRegistro: user.codRegistro });
      addItem(resp.datos.usuario);
      addSuccess('Hecho!', resp.mensaje);
    } catch (e) {
      addError('Error', 'Error agregando usuario');
    }
    setLoadingAdd(false);
  };

  useEffect(() => {
    if (!isFetched) getItems();
  }, [isFetched]);

  if (isLoading) return <LoaderWithText text="Obteniendo lista..." />;

  if (isFetched && items.length === 0) return <NoItemsText text="Ups! lista vacía" />;

  if (!isFetched && !isLoading) return <NoItemsText error text="Error obteniendo datos del servidor" />;

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Title text="Asignar comisión" />
        <SearchUser
          label="Buscar usuario"
          labelSelected="Usuario seleccionado"
          selectedResult={user}
          onSelectResult={setUser}
          disabled={loadingAdd}
        />
        <Button label="Asignar" onClick={onSubmitCommission} disabled={loadingAdd} type="proceed" full />
      </div>
      <div>
        <Title text="Lista comisión" />
        {items.map((item) => (
          <Item
            label=""
            key={item.codRegistro}
            text={item.nombre}
            textSec={`(${item.codRegistro})`}
            subText={item.correo}
            onCancel={onDeleteUser(item.codRegistro)}
            disabled={loadingDel}
          />
        ))}
      </div>
    </div>
  );
};

export default Commission;
