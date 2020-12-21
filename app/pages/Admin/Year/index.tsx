import React, { FC, useEffect, useState } from 'react';
import { useActions, useValues } from 'kea';

import LoaderWithText from 'components/LoaderWithText';
import NoItemsText from 'components/NoItemsText';
import Date from 'components/Date';
import SelectOption from 'components/SelectOption';
import Button from 'components/Button';
import Title from 'components/Title';
import PeriodItem from './PeriodItem';

import api from 'api';
import periodLogic from 'store/data/period';
import newPeriodLogi from 'store/forms/newPeriod';
import notificationLogic from 'store/notifications';

const Year: FC = () => {
  const [loading, setLoading] = useState(false);

  const { items, isFetched, isLoading } = useValues(periodLogic);
  const { getItems, activeItem, setState } = useActions(periodLogic);

  const { form, isLoading: isLoadingForm } = useValues(newPeriodLogi);
  const { setEnd, setStart, setPeriod, postData } = useActions(newPeriodLogi);

  const { addError, addSuccess } = useActions(notificationLogic);

  const onSelect = (id: number) => async () => {
    setLoading(true);
    try {
      const resp = await api.admin.activatePeriod({ idGestion: id });
      addSuccess('Hecho!', resp.mensaje);
      activeItem(id);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      addError('Error', 'Hubo un error activando gestion');
    }
  };

  const onSetPeriodState = (id: number) => async () => {
    const period = items.find((p) => p.id === id);
    if (!period) return;
    setLoading(true);
    try {
      const resp = await api.admin.setPeriodState({ idGestion: period.id, estado: !period.estado });
      addSuccess('Hecho!', 'Se ha habilitado la gestión');
      setState(resp.gestion.id, resp.gestion.estado);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      addError('Error', 'Error habilitando gestion');
    }
  };

  useEffect(() => {
    if (!isFetched) getItems();
  }, [isFetched]);

  if (isLoading) return <LoaderWithText text="Cargando gestiones" />;

  if (!isFetched && !isLoading) return <NoItemsText error text="Error cargando gestiones" />;

  return (
    <>
      <div>
        <Title text="Registrar nueva gestion" />
        <div className="grid grid-cols-3 gap-4">
          <Date label="Inicio (AAAA-MM-DD):" date={form.start} onSetDate={setStart} />
          <Date label="Fin (AAAA-MM-DD):" date={form.end} onSetDate={setEnd} />
          <SelectOption
            label="Periodo:"
            items={[
              { id: 1, nombre: 'I' },
              { id: 2, nombre: 'II' },
            ]}
            selectedItem={form.period}
            setSelectedItem={setPeriod}
            disabled={isLoadingForm}
          />
        </div>
        <Button label="Registrar" onClick={postData} type="proceed" disabled={isLoadingForm} full />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Title text="Habilitar Gestiones" />
          <p className="text-gray-700 text-base mb-3">Las gestiones habilitadas serán visibles desde el sitio web.</p>
          {items.length === 0 && <NoItemsText text="Ups, no hay gestiones." />}
          {items.map((gestion) => (
            <PeriodItem
              key={gestion.id}
              active={gestion.estado}
              activeText="Habilitado"
              inactiveText="Inhabilitado"
              period={gestion}
              disabled={loading}
              onSelectItem={onSetPeriodState}
            />
          ))}
        </div>
        <div>
          <Title text="Activar Gestión" />
          <p className="text-gray-700 text-base mb-3">
            La gestión activa será bajo la cual se crearán grupos, encargados de grupo y encargados de proyecto
          </p>
          {items.length === 0 && <NoItemsText text="Ups, no hay gestiones." />}
          {items.map((gestion) => (
            <PeriodItem
              key={gestion.id}
              active={gestion.habilitado}
              activeText="Activo"
              inactiveText="Inactivo"
              period={gestion}
              disabled={loading}
              onSelectItem={onSelect}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Year;
