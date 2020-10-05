import React, { FC } from 'react';
import { IconProps } from 'types/common';

interface MenuItemProps {
  Icon: React.FC<IconProps>;
  title: string;
  isSelected: boolean;
  onClick: () => void;
}
const MenuItem: FC<MenuItemProps> = ({ Icon, title, isSelected, onClick }) => {
  return (
    <div
      className={`flex h-12 items-center cursor-pointer hover:bg-gray-200 ${
        isSelected ? 'text-gray-700 border-r-4 border-gray-700 bg-gray-100 rounded-l' : 'text-gray-500'
      }`}
      onClick={onClick}
    >
      <div className="w-12 flex justify-center">
        <Icon />
      </div>
      <div className="flex-1 text-sm font-semibold">{title}</div>
    </div>
  );
};

export default MenuItem;
