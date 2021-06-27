import React, { createRef, useEffect, useRef, useState } from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage, useForm } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import DeleteButton from '@/Shared/DeleteButton';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';
import FileInput from '@/Shared/FileInput';
import SelectInput from '@/Shared/SelectInput';
import TrashedMessage from '@/Shared/TrashedMessage';

import MenuCategory from './MenuCategory';

const Edit = () => {
  const { store, menuCategories } = usePage().props;
  const { data, setData, errors } = useForm({
    name: store.name || '',
    address: store.address || '',
    coordinate: store.coordinate || '',
    brand_img: store.brand_img || '',
    banner_img: store.banner_img || '',
    is_open: store.is_open || ''
  });
  const [processing, setProcessing] = useState(false);
  const [categories, setCategories] = useState(menuCategories);

  useEffect(() => {
    setCategories(menuCategories);
  }, [menuCategories]);

  const handleSubmit = e => {
    e.preventDefault();
    setProcessing(true);
    Inertia.post(
      route('stores.update', store.id),
      {
        _method: 'put',
        name: data.name,
        address: data.address,
        coordinate: data.coordinate,
        brand_img: data.brand_img,
        banner_img: data.banner_img,
        is_open: data.is_open
      },
      {
        forceFormData: true
      }
    ).finally(() => setProcessing(false));
  };

  const destroy = () => {
    if (confirm('Apakah anda yakin ingin menghapus data ini?')) {
      Inertia.delete(route('stores.destroy', store.id));
    }
  };

  const restore = () => {
    if (confirm('Apakah anda yakin ingin mengembalikan data ini?')) {
      Inertia.put(route('stores.restore', store.id));
    }
  };

  const refresh = () => {
    Inertia.reload({ only: ['menuCategories'] });
  };

  return (
    <div>
      <Helmet title={data.name} />
      <h1 className="mb-8 text-3xl font-bold">
        <InertiaLink
          href={route('stores.index')}
          className="text-red-600 hover:text-red-700"
        >
          Toko
        </InertiaLink>
        <span className="mx-2 font-medium text-red-600">/</span>
        {data.name}
      </h1>
      {store.deleted_at && (
        <TrashedMessage onRestore={restore}>
          Toko ini telah dihapus
        </TrashedMessage>
      )}
      <div className="flex flex-grow items-start flex-col-reverse lg:flex-row gap-6">
        <div
          className="w-full lg:w-2/4 overflow-y-auto"
          style={{ height: '427px' }}
        >
          <MenuCategory
            categories={categories}
            setCategories={setCategories}
            storeId={store.id}
            refresh={refresh}
          />
        </div>

        <div className="w-full overflow-hidden bg-white rounded shadow">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap p-8 -mb-8 -mr-6">
              <TextInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="Nama"
                name="name"
                errors={errors.name}
                value={data.name}
                onChange={e => setData('name', e.target.value)}
              />
              <TextInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="Alamat"
                name="address"
                type="text"
                errors={errors.address}
                value={data.address}
                onChange={e => setData('address', e.target.value)}
              />
              <TextInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="Lokasi"
                name="coordinate"
                type="text"
                errors={errors.coordinate}
                value={data.coordinate}
                onChange={e => setData('coordinate', e.target.value)}
              />
              <FileInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="Logo Toko"
                name="brand_img"
                accept="image/*"
                errors={errors.brand_img}
                value={data.brand_img}
                onChange={photo => setData('brand_img', photo)}
              />
              <FileInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="Gambar Banner"
                name="banner_img"
                accept="image/*"
                errors={errors.banner_img}
                value={data.banner_img}
                onChange={photo => setData('banner_img', photo)}
              />
              <SelectInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="Status"
                name="is_open"
                errors={errors.is_open}
                value={data.is_open ? 1 : 0}
                onChange={e => setData('is_open', e.target.value)}
              >
                <option value="0">Tutup</option>
                <option value="1">Buka</option>
              </SelectInput>
            </div>
            <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
              {!store.deleted_at && (
                <DeleteButton onDelete={destroy}>Hapus Toko</DeleteButton>
              )}
              <LoadingButton
                loading={processing}
                type="submit"
                className="ml-auto btn-red btn-lg"
              >
                Simpan Perubahan
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

Edit.layout = page => <Layout children={page} />;

export default Edit;
