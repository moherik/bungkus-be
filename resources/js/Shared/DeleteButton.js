import React from 'react';

export const DeleteButton = ({ onDelete, children }) => (
  <button
    className="text-red-600 text-sm focus:outline-none hover:underline"
    tabIndex="-1"
    type="button"
    onClick={onDelete}
  >
    {children}
  </button>
);
