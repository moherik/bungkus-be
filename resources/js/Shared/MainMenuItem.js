import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import classNames from 'classnames';
import Icon from '@/Shared/Icon';

export default ({ icon, link, text }) => {
  const isActive = route().current(link + '*');

  const menuClasses = classNames('flex items-center group p-3', {
    'bg-primary-darker rounded': isActive,
    'hover:bg-primary-darker rounded': !isActive
  });

  const iconClasses = classNames('w-4 h-4 mr-2', {
    'text-white fill-current': isActive,
    'text-red-200 group-hover:text-white fill-current': !isActive
  });

  const textClasses = classNames({
    'text-white': isActive,
    'text-red-200 group-hover:text-white': !isActive
  });

  return (
    <div className="mb-1">
      <InertiaLink href={route(link)} className={menuClasses}>
        <Icon name={icon} className={iconClasses} />
        <div className={textClasses}>{text}</div>
      </InertiaLink>
    </div>
  );
};
