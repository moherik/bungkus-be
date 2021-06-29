import React from 'react';
import Helmet from 'react-helmet';
import { MainMenu } from '@/Shared/MainMenu';
import { FlashMessages } from '@/Shared/FlashMessages';
import { TopHeader } from '@/Shared/TopHeader';
import { BottomHeader } from '@/Shared/BottomHeader';

export const Layout = ({ title, children }) => {
  return (
    <div>
      <Helmet titleTemplate="%s | Bungkus" title={title} />
      <div className="flex flex-col">
        <div className="flex flex-col h-screen">
          <div className="md:flex">
            <TopHeader />
            <BottomHeader />
          </div>
          <div className="flex flex-grow overflow-hidden">
            {/* <MainMenu className="flex-shrink-0 hidden w-56 p-4 overflow-y-auto bg-red-600 md:block" /> */}
            {/* To reset scroll region (https://inertiajs.com/pages#scroll-regions) add `scroll-region="true"` to div below */}
            <div className="w-full px-4 py-8 overflow-hidden overflow-y-auto md:p-12">
              {/* <FlashMessages /> */}
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
