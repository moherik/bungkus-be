import { InertiaLink } from '@inertiajs/inertia-react';
import classNames from 'classnames';

export const TableItem = ({ link = null, children, ...props }) => {
  if (link != null) {
    return (
      <InertiaLink
        tabIndex="-1"
        href={link}
        className={classNames(
          'flex px-6 py-2 focus:outline-none',
          props.className
        )}
      >
        {children}
      </InertiaLink>
    );
  }

  return (
    <div
      className={classNames(
        'flex px-6 py-2 focus:outline-none',
        props.className
      )}
    >
      {children}
    </div>
  );
};
