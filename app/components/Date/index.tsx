import React, { FC } from 'react';
import { DateInput } from 'types/common';

type Props = {
  label: string;
  date: DateInput;
  onSetDate(date: DateInput): void;
};

const Date: FC<Props> = ({ label, date, onSetDate }) => {
  const onChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = { ...date, [key]: e.target.value };
    onSetDate(newDate);
  };
  return (
    <div className="my-2">
      <div className="mb-1">
        <h1 className="text-sm leading-5 mb-2 font-medium text-gray-700">{label}</h1>
        <input
          onChange={onChange('year')}
          type="number"
          className="w-24 font-mono rounded-md text-xl py-1 px-2 mr-2"
          placeholder="AAAA"
          value={date.year}
        />
        <input
          onChange={onChange('month')}
          type="number"
          className="w-16 font-mono rounded-md text-xl py-1 px-2 mr-2"
          placeholder="MM"
          value={date.month}
        />
        <input
          onChange={onChange('day')}
          type="number"
          className="w-16 font-mono rounded-md text-xl py-1 px-2"
          placeholder="DD"
          value={date.day}
        />
      </div>
    </div>
  );
};

export default Date;
