import classNames from 'classnames';
import React, { useState } from 'react';

export default ({
  show,
  setShow,
  title,
  size = 'lg',
  noMargin = false,
  children
}) => {
  const closeModal = () => setShow(false);

  if (show) {
    return (
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
          <div
            className={classNames(
              'rounded-lg overflow-hidden shadow-lg w-full mx-10 relative bg-white',
              {
                'lg:w-1/2': size == 'lg',
                'lg:w-1/3': size == 'md',
                'lg:w-1/4': size == 'sm'
              }
            )}
          >
            <div
              className={classNames('flex justify-between border-b-2', {
                'pt-5 pb-4 px-6': size != 'sm',
                'pt-3 pb-2 px-4': size == 'sm'
              })}
            >
              <h3 className="text-lg font-medium">{title}</h3>
              <button onClick={closeModal}>X</button>
            </div>
            <div
              className={classNames('overflow-y-auto', {
                'p-0': noMargin,
                'px-6 py-5': size == 'lg' && noMargin == false,
                'px-6 py-5': size == 'md' && noMargin == false,
                'px-4 py-3': size == 'sm' && noMargin == false
              })}
            >
              {children}
            </div>
          </div>
        </div>
        <div className="opacity-30 fixed inset-0 z-40 bg-black"></div>
      </>
    );
  }

  return null;
};
