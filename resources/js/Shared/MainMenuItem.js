import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import classNames from 'classnames';

export const MainMenuItem = ({ icon, link, baseRoute, text }) => {
  const isActive = route().current(baseRoute + '*');

  const menuClasses = classNames('flex gap-4 items-center group p-3', {
    'bg-primary-darker rounded': isActive,
    'hover:bg-primary-darker rounded': !isActive
  });

  const iconClasses = classNames('text-xl w-4 h-4 mr-2', {
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
        <div className={iconClasses}>{icon}</div>
        <div className={textClasses}>{text}</div>
      </InertiaLink>
    </div>
  );
};
