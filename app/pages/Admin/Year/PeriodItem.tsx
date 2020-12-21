import React, { FC } from 'react';
import { Period } from 'store/data/types';

type Props = {
  period: Period;
  disabled: boolean;
  active: boolean;
  activeText: string;
  inactiveText: string;
  onSelectItem(id: number): () => void;
};

const PeriodItem: FC<Props> = ({ period, disabled, active, activeText, inactiveText, onSelectItem }) => {
  return (
    <div
      className={`${
        active ? 'bg-teal-600 text-green-100 shadow-inner' : 'bg-gray-100 text-gray-600 shadow hover:shadow-md'
      } ${disabled && 'opacity-75'} rounded px-3 py-2 grid grid-cols-9 gap-2 mb-2 hover:shadow-md`}
    >
      <p className="col-span-2 flex items-center text-xl">{`${period.periodo}-${period.gestion}`}</p>
      <div className="col-span-4 text-base">
        <p className="italic">
          <span className="font-semibold">Desde: </span>
          {period.fechaIni}
        </p>
        <p className="italic">
          <span className="font-semibold">Al: </span>
          {period.fechaFin}
        </p>
      </div>
      <p className="col-span-3 flex items-center justify-end text-lg">
        <button
          disabled={disabled}
          onClick={onSelectItem(period.id)}
          className={`${active || 'text-teal-600 border border-green-600 hover:bg-teal-600 hover:text-green-100'} ${
            disabled && 'cursor-default'
          } p-1 rounded transition duration-300`}
        >
          {active ? activeText : inactiveText}
        </button>
      </p>
    </div>
  );
};

export default PeriodItem;
