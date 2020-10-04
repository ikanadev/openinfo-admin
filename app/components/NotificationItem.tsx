import React, { FC, useEffect } from 'react';

import { Info, Warning, Cross, CrossCircle, Check } from './Icons';

import { Notification, NotifTypes } from 'store/notifications/types';
import config from 'utils/config';

interface NotificationItemProps {
  item: Notification;
  onClose: (id: string) => void;
}

interface ColAndIcon {
  textColor: string;
  bgColor: string;
  icon: React.ReactElement;
}
const getColorAndIcon = (type: NotifTypes): ColAndIcon => {
  switch (type) {
    case NotifTypes.Error:
      return {
        textColor: 'text-red-500',
        bgColor: 'bg-red-500',
        icon: <CrossCircle />,
      };
    case NotifTypes.Warning:
      return {
        textColor: 'text-orange-400',
        bgColor: 'bg-orange-400',
        icon: <Warning />,
      };
    case NotifTypes.Info:
      return {
        textColor: 'text-blue-500',
        bgColor: 'bg-blue-500',
        icon: <Info />,
      };
    case NotifTypes.Success:
      return {
        textColor: 'text-green-600',
        bgColor: 'bg-green-600',
        icon: <Check />,
      };
    default:
      return {
        textColor: 'text-gray-600',
        bgColor: 'bg-gray-600',
        icon: <CrossCircle />,
      };
  }
};

const NotificationItem: FC<NotificationItemProps> = ({ item: { id, title, message, type }, onClose }) => {
  const itemData = getColorAndIcon(type);
  const remove = () => {
    onClose(id);
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      remove();
    }, config.notificationDuration);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <div className="mb-4 shadow-md rounded-lg flex items-center p-3 bg-white">
      <div className={`rounded-full w-1 self-stretch ${itemData.bgColor}`}></div>
      <div className={`w-12 flex justify-center ${itemData.textColor}`}>{itemData.icon}</div>
      <div className="flex-1 text-left">
        <h6 className="font-semibold text-base text-gray-800">{title}</h6>
        <p className="text-sm text-gray-600">{message}</p>
      </div>
      <div
        className="w-12 h-12 flex justify-center items-center rounded-full hover:bg-gray-300 cursor-pointer text-gray-700"
        onClick={remove}
      >
        <Cross />
      </div>
    </div>
  );
};

export default NotificationItem;
