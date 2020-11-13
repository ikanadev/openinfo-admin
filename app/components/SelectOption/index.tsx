import React, { FC } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CaretDown } from 'components/Icons';

import { ItemType } from 'types/common';
import { DEFAULT_OPTION } from 'utils/const';

interface Props {
  label: string;
  items: ItemType[];
  selectedItem: ItemType;
  setSelectedItem: (item: ItemType) => void;
  disabled?: boolean;
  noDefault?: boolean;
}
const SelectOption: FC<Props> = ({
  label,
  items,
  selectedItem,
  setSelectedItem,
  disabled = false,
  noDefault = false,
}) => {
  return (
    <div className={`my-4 flex items-center ${disabled ? 'opacity-25' : 'opacity-100'}`}>
      <Listbox value={selectedItem} onChange={setSelectedItem}>
        {() => (
          <>
            <Listbox.Label className="text-sm leading-5 font-medium text-gray-700">{label}</Listbox.Label>
            <div className="relative flex-1 ml-5 shadow-sm bg-white py-0 rounded border border-gray-200">
              <Listbox.Button className="w-full flex items-center px-2 text-left focus:outline-none text-gray-700 focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800">
                <div className="flex-1">{selectedItem.nombre}</div>
                <CaretDown />
              </Listbox.Button>
              <Transition
                show={!disabled}
                leave="transition ease-in duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="absolute mt-1 w-full rounded-md bg-white shadow-lg"
              >
                <Listbox.Options className="rounded-md text-base shadow-lg focus:outline-none overflow-hidden">
                  {noDefault || (
                    <Listbox.Option key={DEFAULT_OPTION.id} value={(DEFAULT_OPTION as unknown) as string}>
                      <div className="text-gray-900 select-none relative py-1 px-2">
                        <span className="font-normal block truncate text-sm">{DEFAULT_OPTION.nombre}</span>
                      </div>
                    </Listbox.Option>
                  )}
                  {items.map((item) => (
                    <Listbox.Option key={item.id} value={(item as unknown) as string}>
                      {({ active, selected }) => (
                        <div
                          className={`${
                            active ? 'bg-gray-300' : 'text-gray-900'
                          } cursor-pointer select-none relative py-2 px-2`}
                        >
                          <span className={`${selected ? 'font-semibold' : 'font-normal'} block truncate text-sm`}>
                            {item.nombre}
                          </span>
                        </div>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};

export default SelectOption;
