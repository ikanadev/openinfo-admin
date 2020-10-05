import React, { FC } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useValues, useActions } from 'kea';

import NotificationItem from './NotificationItem';

import notificationLogic from 'store/notifications';

const NotificationCont: FC = () => {
  const { items } = useValues(notificationLogic);
  const { remove } = useActions(notificationLogic);
  return (
    <div className="fixed bottom-0 right-0 mb-3 mr-8">
      <TransitionGroup className="notification-list">
        {items.map((notif) => (
          <CSSTransition key={notif.id} classNames="notification-animation" timeout={500}>
            <NotificationItem key={notif.id} item={notif} onClose={remove} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default NotificationCont;
