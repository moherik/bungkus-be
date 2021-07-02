import React, { createRef, useEffect, useRef, useState } from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import { Layout } from '@/Shared/Layout';
import { TrashedMessage } from '@/Shared/TrashedMessage';

import { MenuCategory } from './MenuCategory';
import { FormStore } from './FormStore';
import { OrderList } from './OrderList';
import { Image } from '@/Shared/Image';

const Detail = () => {
  const { store, order, menuCategories } = usePage().props;

  const [showEditModal, setShowEditModal] = useState(false);
  const [categories, setCategories] = useState(menuCategories);

  useEffect(() => {
    setCategories(menuCategories);
  }, [menuCategories]);

  const handleShowModal = () => setShowEditModal(true);

  const restore = () => {
    if (confirm('Apakah anda yakin ingin mengembalikan data ini?')) {
      Inertia.put(route('stores.restore', store.id)).finally(() =>
        refreshStore()
      );
    }
  };

  const refreshStore = () => {
    Inertia.reload({ only: ['store'] });
  };

  const refreshMenuCategory = () => {
    Inertia.reload({ only: ['menuCategories'] });
  };

  return (
    <div>
      <Helmet title={store.name} />
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-4 items-center">
          <Image
            src={store.brand_img}
            className="h-20 w-20 rounded-md shadow"
          />
          <div className="">
            <h1 className="text-3xl font-bold">{store.name}</h1>
            <p className="text-lg">{store.address}</p>
          </div>
        </div>
        <button
          type="button"
          className="btn-lg btn-red focus:outline-none"
          onClick={handleShowModal}
        >
          Ubah Toko
        </button>
      </div>
      <div className="flex flex-grow items-start flex-col lg:flex-row gap-6">
        <div className="flex flex-col w-full">
          {store.deleted_at && (
            <TrashedMessage onRestore={restore}>
              Toko ini telah dihapus, toko tidak dapat dilihat diaplikasi oleh
              pengguna.
            </TrashedMessage>
          )}

          <OrderList data={order} />
        </div>
        <div
          className="w-full lg:w-2/4 overflow-y-auto rounded bg-gray-300 border-dashed border-4 border-gray-400 sticky top-0"
          style={{ height: '502px' }}
        >
          <MenuCategory
            categories={categories}
            setCategories={setCategories}
            storeId={store.id}
            refresh={refreshMenuCategory}
          />
        </div>
      </div>

      <FormStore show={showEditModal} setShow={setShowEditModal} data={store} />
    </div>
  );
};

Detail.layout = page => <Layout children={page} />;

export default Detail;
