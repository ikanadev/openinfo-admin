import React, { FC, useEffect, useState } from 'react';
import { useActions, useValues } from 'kea';
import periodLogic from 'store/data/period';
import LoaderWithText from 'components/LoaderWithText';
import NoItemsText from 'components/NoItemsText';
import Title from 'components/Title';
import newPeriodLogi from 'store/forms/newPeriod';
import Date from 'components/Date';
import SelectOption from 'components/SelectOption';
import Button from 'components/Button';
import api from 'api';
import notificationLogic from 'store/notifications';

const Year: FC = () => {
  const [loading, setLoading] = useState(false);

  const { items, isFetched, isLoading } = useValues(periodLogic);
  const { getItems, activeItem } = useActions(periodLogic);

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

  useEffect(() => {
    if (!isFetched) getItems();
  }, [isFetched]);

  if (isLoading) return <LoaderWithText text="Cargando gestiones" />;

  if (!isFetched && !isLoading) return <NoItemsText error text="Error cargando gestiones" />;

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Title text="Registrar nueva gestion" />
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
        <Button label="Registrar" onClick={postData} type="proceed" disabled={isLoadingForm} full />
      </div>
      <div>
        <Title text="Gestiones" />
        {items.length === 0 && <NoItemsText text="Ups, no hay gestiones." />}
        {items.map((gestion) => (
          <div
            key={gestion.id}
            className={`${
              gestion.habilitado
                ? 'bg-teal-600 text-green-100 shadow-inner'
                : 'bg-gray-100 text-gray-600 shadow hover:shadow-md'
            } ${loading && 'opacity-75'} rounded px-3 py-2 grid grid-cols-9 gap-2 mb-2 hover:shadow-md`}
          >
            <p className="col-span-2 flex items-center text-xl">{`${gestion.periodo}-${gestion.gestion}`}</p>
            <div className="col-span-5 text-base">
              <p className="italic">
                <span className="font-semibold">Desde: </span>
                {gestion.fechaIni}
              </p>
              <p className="italic">
                <span className="font-semibold">Al: </span>
                {gestion.fechaFin}
              </p>
            </div>
            <p className="col-span-2 flex items-center text-lg">
              <button
                disabled={loading}
                onClick={gestion.habilitado ? undefined : onSelect(gestion.id)}
                className={`${
                  gestion.habilitado
                    ? 'cursor-default'
                    : 'text-teal-600 border border-green-600 hover:bg-teal-600 hover:text-green-100'
                } ${loading && 'cursor-default'} p-1 rounded transition duration-300`}
              >
                {gestion.habilitado ? 'Activo' : 'Activar'}
              </button>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Year;
