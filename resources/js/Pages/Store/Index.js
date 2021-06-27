import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import Icon from '@/Shared/Icon';
import SearchFilter from '@/Shared/SearchFilter';
import Pagination from '@/Shared/Pagination';
import TableItem from '@/Shared/TableItem';
import Switch from '@/Shared/Switch';

const Index = () => {
  const { stores } = usePage().props;
  const {
    data,
    meta: { links }
  } = stores;

  function handleOnSwitch(id, e) {
    Inertia.put(route('stores.update-status', [id, e.target.checked]));
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Daftar Toko</h1>
      <div className="flex items-center justify-between mb-6">
        <SearchFilter />
        <InertiaLink
          className="btn-red btn-lg focus:outline-none"
          href={route('stores.create')}
        >
          <span>Tambah</span>
          <span className="hidden md:inline"> Toko</span>
        </InertiaLink>
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
            {data.map(
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
                      <TableItem link={route('stores.edit', id)}>
                        {index + 1}
                      </TableItem>
                    </td>
                    <td className="border-t">
                      <TableItem link={route('stores.edit', id)}>
                        <img
                          src={`upload/${brand_img}`}
                          className="w-20 h-20 rounded"
                        />
                        <div className="ml-3">
                          <div className="flex items-center">
                            <h3 className="text-lg font-medium">{name}</h3>
                            {deleted_at && (
                              <Icon
                                name="trash"
                                className="flex-shrink-0 w-3 h-3 ml-2 text-gray-400 fill-current"
                              />
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
                      <TableItem link={route('stores.edit', id)}>
                        <Icon
                          name="cheveron-right"
                          className="block w-6 h-6 text-gray-400 fill-current"
                        />
                      </TableItem>
                    </td>
                  </tr>
                );
              }
            )}
            {data.length === 0 && (
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
    </div>
  );
};

Index.layout = page => <Layout title="Toko" children={page} />;

export default Index;
