import { InertiaLink } from '@inertiajs/inertia-react';

export const TableItem = ({ link = null, children }) => {
  if (link != null) {
    return (
      <InertiaLink
        tabIndex="-1"
        href={link}
        className="flex items-center px-6 py-2 focus:outline-none"
      >
        {children}
      </InertiaLink>
    );
  }

  return (
    <div className="flex items-center px-6 py-2 focus:outline-none">
      {children}
    </div>
  );
};
