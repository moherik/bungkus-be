import React from 'react';
import { MainMenuItem } from '@/Shared/MainMenuItem';

import {
  IoSpeedometerOutline,
  IoStorefrontOutline,
  IoPeopleOutline
} from 'react-icons/io5';

export const MainMenu = ({ className }) => {
  return (
    <div className={className}>
      <MainMenuItem
        text="Dashboard"
        link="dashboard"
        baseRoute="dashboard"
        icon={<IoSpeedometerOutline />}
      />
      <MainMenuItem
        text="Toko"
        link="stores.index"
        baseRoute="stores"
        icon={<IoStorefrontOutline />}
      />
      <MainMenuItem
        text="Karyawan"
        link="users.index"
        baseRoute="users"
        icon={<IoPeopleOutline />}
      />
      {/* <MainMenuItem text="Organizations" link="organizations" icon="office" />
      <MainMenuItem text="Contacts" link="contacts" icon="users" />
      <MainMenuItem text="Reports" link="reports" icon="printer" /> */}
    </div>
  );
};
