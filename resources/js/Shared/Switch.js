import classNames from 'classnames';
import React, { useState } from 'react';

export default ({ name, id, label = null, size = 'lg', ...props }) => {
  return (
    <>
      <div
        class={classNames(
          'relative inline-block align-middle select-none transition duration-200 ease-in',
          {
            'w-8': size == 'sm',
            'w-10': size == 'lg'
          }
        )}
      >
        <input
          type="checkbox"
          name={name}
          id={id}
          {...props}
          class={classNames(
            'toggle-checkbox absolute block rounded-full bg-white border-4 appearance-none cursor-pointer',
            {
              ' w-4 h-4': size == 'sm',
              'w-6 h-6': size == 'lg'
            }
          )}
        />
        <label
          for={name}
          class={classNames(
            'toggle-label block overflow-hidden rounded-full bg-gray-300 cursor-pointer',
            {
              'h-4': size == 'sm',
              'h-6': size == 'lg'
            }
          )}
        ></label>
      </div>
      {label != null && (
        <label for="toggle" class="ml-2 text-sm text-gray-800">
          {label}
        </label>
      )}
    </>
  );
};
