import React from 'react';
import { MainMenuItem } from '@/Shared/MainMenuItem';

export const MainMenu = ({ className }) => {
  return (
    <div className={className}>
      <MainMenuItem
        text="Dashboard"
        link="dashboard"
        baseRoute="dashboard"
        icon="dashboard"
      />
      <MainMenuItem
        text="Toko"
        link="stores.index"
        baseRoute="stores"
        icon="office"
      />
      <MainMenuItem
        text="Karyawan"
        link="users.index"
        baseRoute="users"
        icon="office"
      />
      {/* <MainMenuItem text="Organizations" link="organizations" icon="office" />
      <MainMenuItem text="Contacts" link="contacts" icon="users" />
      <MainMenuItem text="Reports" link="reports" icon="printer" /> */}
    </div>
  );
};
