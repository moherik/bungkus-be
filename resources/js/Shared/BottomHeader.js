import React, { useEffect, useState } from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import { FiChevronDown } from 'react-icons/fi';

export const BottomHeader = () => {
  const { auth } = usePage().props;
  const isDetailStore = route().current('stores.detail');
  const params = route().params;

  const [menuOpened, setMenuOpened] = useState(false);
  const [storeListOpened, setStoreListOpened] = useState(false);

  return (
    <div className="flex items-center justify-end gap-4 w-full p-4 text-sm bg-white border-b md:py-0 md:px-12 d:text-md">
      <div className="mt-1 mr-4"></div>
      <div className="relative">
        <div
          className="flex items-center cursor-pointer select-none group"
          onClick={() => setMenuOpened(true)}
        >
          <div className="mr-1 text-gray-800 whitespace-nowrap group-hover:text-red-600 focus:text-red-600">
            <span>{auth.user.first_name}</span>
            <span className="hidden ml-1 md:inline">{auth.user.last_name}</span>
          </div>
          <FiChevronDown className="w-5 h-5 text-gray-800 fill-current group-hover:text-red-600 focus:text-red-600" />
        </div>
        <div className={menuOpened ? '' : 'hidden'}>
          <div className="absolute top-0 right-0 left-auto z-20 py-2 mt-8 text-sm whitespace-nowrap bg-white rounded shadow-xl">
            <InertiaLink
              as="button"
              href={route('logout')}
              className="block w-full px-6 py-2 text-left focus:outline-none hover:bg-red-600 hover:text-white"
              method="post"
            >
              Logout
            </InertiaLink>
          </div>
          <div
            onClick={() => {
              setMenuOpened(false);
            }}
            className="fixed inset-0 z-10 bg-black opacity-25"
          ></div>
        </div>
      </div>
    </div>
  );
};
