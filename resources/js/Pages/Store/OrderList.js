import React from 'react';

import {
  IoBicycleOutline,
  IoBagHandleOutline,
  IoRestaurantOutline
} from 'react-icons/io5';
import { currency } from '@/utils';
import classNames from 'classnames';

const TypeIcon = ({ type, ...props }) => {
  if (type == 'PICKUP') {
    return <IoBagHandleOutline {...props} />;
  } else if (type == 'DINEIN') {
    return <IoRestaurantOutline {...props} />;
  } else if (type == 'DELIVERY') {
    return <IoBicycleOutline {...props} />;
  }

  return null;
};

export const OrderList = ({ data }) => {
  return (
    <div>
      <div className="w-full flex flex-col gap-4 overflow-x-auto">
        {data.map((order, index) => {
          let total = 0 + order.tips || 0;

          const type = order.order_type;
          const status = order.status;

          let orderType;
          if (type == 'PICKUP') {
            orderType = 'Ambil Langsung';
          } else if (type == 'DINEIN') {
            orderType = 'Makan Ditempat';
          } else if (type == 'DELIVERY') {
            orderType = 'Pesan Antar';
          }

          let topClass = 'bg-white';
          let statusLabel = '';
          if (status == 'PENDING') {
            topClass = 'bg-red-600 text-white';
            statusLabel = 'Menunggu';
          } else if (status == 'PROCESS') {
            topClass = 'bg-green-600 text-white';
            statusLabel = 'Pesanan Diproses';
          } else if (status == 'CANCEL') {
            statusLabel = 'Dibatalkan';
          } else if (status == 'SUCCESS') {
            statusLabel = 'Pesanan Selesai';
          } else {
            topClass = 'bg-white';
          }

          return (
            <div
              className="w-full bg-white rounded shadow overflow-hidden"
              key={order.id}
            >
              <div
                className={classNames(
                  'flex justify-between items-center px-6 py-3',
                  topClass
                )}
              >
                <div className="flex items-center gap-4">
                  <TypeIcon type={type} className="text-3xl" />
                  <h4 className="font-medium text-md">{orderType}</h4>
                </div>
                <h4 className="font-medium text-md">{statusLabel}</h4>
              </div>
              <div className="border-t px-6 py-3">
                <div className="flex flex-col">
                  <h4 className="text-md font-medium">{order.customer.name}</h4>
                  <p className="text-sm">{order.customer.phone}</p>
                </div>
              </div>
              <div className="border-t">
                <div className="flex flex-col w-full">
                  <div className="px-6 py-3 flex flex-col gap-2">
                    {order.carts.map((cart, index) => {
                      const variants = JSON.parse(cart.variant_items);
                      total = total + cart.price;

                      return (
                        <div key={cart.id} className="flex flex-col w-full">
                          <div className="flex justify-between gap-4">
                            <div className="flex items-start justify-start gap-2">
                              <span className="bg-red-600 text-white text-xs py-1 px-2 rounded">
                                X{cart.quantity}
                              </span>
                              <div>
                                <span className="text-md font-medium">
                                  {cart.menu_name}
                                </span>
                                {cart.special_instruction && (
                                  <p className="text-sm">
                                    {cart.special_instruction}
                                  </p>
                                )}
                                {variants.length > 0 && (
                                  <ul className="mt-1">
                                    {variants.map((value, index) => (
                                      <li key={index} className="text-sm">
                                        {value}
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            </div>
                            <h4>{currency(cart.price)}</h4>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="border-t px-6 py-3">
                    <p className="text-sm w-full flex justify-between">
                      <span>Tips:</span>
                      <span>{currency(order.tips || 0)}</span>
                    </p>
                    <p className="w-full flex justify-between">
                      <span className="text-sm font-medium">Total:</span>
                      <span className="font-medium text-red-600">
                        {currency(total)}
                      </span>
                    </p>
                    {order.order_note && (
                      <p className="text-sm w-full">
                        <span className="font-medium">Catatan:</span>{' '}
                        {order.order_note}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {data.length === 0 && (
          <div
            className="w-full bg-white mb-4 rounded shadow h-96 items-center justify-center flex"
            style={{ height: '427px' }}
          >
            <p>Belum ada pesanan.</p>
          </div>
        )}
      </div>
    </div>
  );
};
