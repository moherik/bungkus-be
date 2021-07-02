import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';

import { Layout } from '@/Shared/Layout';
import { SearchFilter } from '@/Shared/SearchFilter';
import { Pagination } from '@/Shared/Pagination';
import { TableItem } from '@/Shared/TableItem';
import { Switch } from '@/Shared/Switch';
import { FormStore } from './FormStore';
import { Image } from '@/Shared/Image';
import { IoTrashOutline, IoChevronForwardOutline } from 'react-icons/io5';

const Index = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { stores } = usePage().props;
  const {
    meta: { links }
  } = stores;

  const handleOnSwitch = (id, e) => {
    Inertia.put(route('stores.update-status', [id, e.target.checked]));
  };

  const handleShowModal = e => {
    e.preventDefault();
    setShowCreateModal(true);
  };

  const refresh = () => {
    Inertia.reload({ only: ['stores'] });
  };

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Daftar Toko</h1>
      <div className="flex items-center justify-between mb-6">
        <SearchFilter />
        <a
          className="btn-red btn-lg focus:outline-none"
          href="#"
          onClick={handleShowModal}
        >
          <span>Tambah</span>
          <span className="hidden md:inline"> Toko</span>
        </a>
      </div>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="font-bold text-left">
              <th className="px-6 pt-5 pb-4 w-0">#</th>
              <th className="px-6 pt-5 pb-4">Toko</th>
              <th className="px-6 pt-5 pb-4" colSpan="2">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {stores.data.map(
              (
                { id, name, address, brand_img, is_open, deleted_at },
                index
              ) => {
                return (
                  <tr
                    key={id}
                    className="hover:bg-gray-100 focus-within:bg-gray-100"
                  >
                    <td className="border-t">
                      <TableItem link={route('stores.detail', id)}>
                        {index + 1}
                      </TableItem>
                    </td>
                    <td className="border-t">
                      <TableItem
                        link={route('stores.detail', id)}
                        className="items-center"
                      >
                        <Image src={brand_img} className="w-20 h-20 rounded" />
                        <div className="ml-3">
                          <div className="flex items-center">
                            <h3 className="text-lg font-medium">{name}</h3>
                            {deleted_at && (
                              <IoTrashOutline className="flex-shrink-0 w-3 h-3 ml-2 text-gray-400 fill-current" />
                            )}
                          </div>
                          <span className="text-sm">{address}</span>
                        </div>
                      </TableItem>
                    </td>
                    <td className="border-t">
                      <TableItem>
                        <Switch
                          defaultChecked={is_open}
                          onChange={e => handleOnSwitch(id, e)}
                        />
                      </TableItem>
                    </td>
                    <td className="w-px border-t">
                      <TableItem link={route('stores.detail', id)}>
                        <IoChevronForwardOutline className="block w-6 h-6 text-gray-400 fill-current" />
                      </TableItem>
                    </td>
                  </tr>
                );
              }
            )}
            {stores.data.length === 0 && (
              <tr>
                <td className="px-6 py-4 border-t" colSpan="4">
                  Tidak ada data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination links={links} />

      <FormStore
        show={showCreateModal}
        setShow={setShowCreateModal}
        refresh={refresh}
      />
    </div>
  );
};

Index.layout = page => <Layout title="Toko" children={page} />;

export default Index;
