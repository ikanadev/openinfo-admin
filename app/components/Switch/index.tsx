import React, { FC } from 'react';
import { Switch } from '@headlessui/react';

interface Props {
  label: string;
  active: boolean;
  disabled?: boolean;
  setActive(value: boolean): void;
}

const SwitchC: FC<Props> = ({ active, setActive, disabled = false, label }) => (
  <div className="w-full max-w-xs">
    <Switch.Group as="div" className="flex items-center space-x-4">
      <Switch.Label className="text-gray-700 text-sm leading-5 my-2 font-medium">{label}</Switch.Label>
      <Switch
        as="button"
        checked={active}
        onChange={setActive}
        disabled={disabled}
        className={`${
          active ? 'bg-teal-500' : 'bg-gray-400'
        } relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-12 focus:outline-none focus:shadow-outline`}
      >
        {({ checked }) => (
          <span
            className={`${
              checked ? 'translate-x-6' : 'translate-x-0'
            } inline-block w-5 h-5 transition duration-200 ease-in-out transform bg-white rounded-full`}
          />
        )}
      </Switch>
    </Switch.Group>
  </div>
);

export default SwitchC;
