import React from 'react';

import { SearchFilter } from '@/Shared/SearchFilter';
import { TableItem } from '@/Shared/TableItem';

export const OrderList = ({ data }) => {
  return (
    <div>
      <div
        className="w-full overflow-x-auto bg-white rounded shadow"
        style={{ height: '427px' }}
      >
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="font-bold text-left">
              <th className="px-6 pt-5 pb-4 w-0">#</th>
              <th className="px-6 pt-5 pb-4">Nama Pemesan</th>
              <th className="px-6 pt-5 pb-4">Detail</th>
              <th className="px-6 pt-5 pb-4" colSpan="2">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((order, index) => {
              return (
                <tr
                  key={id}
                  className="hover:bg-gray-100 focus-within:bg-gray-100"
                >
                  <td className="border-t">
                    <TableItem link="#">{index + 1}</TableItem>
                  </td>
                  <td className="border-t">
                    <TableItem link="#">Nama</TableItem>
                  </td>
                  <td>
                    <TableItem>Status</TableItem>
                  </td>
                  <td className="border-t">
                    <TableItem>
                      <Switch defaultChecked={false} />
                    </TableItem>
                  </td>
                  <td className="w-px border-t">
                    <TableItem link="#">
                      <Icon
                        name="cheveron-right"
                        className="block w-6 h-6 text-gray-400 fill-current"
                      />
                    </TableItem>
                  </td>
                </tr>
              );
            })}
            {data.length === 0 && (
              <tr>
                <td className="px-6 py-4 border-t" colSpan="4">
                  Belum ada pesanan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
