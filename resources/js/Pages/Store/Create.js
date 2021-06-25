import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, useForm } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';
import SelectInput from '@/Shared/SelectInput';
import FileInput from '@/Shared/FileInput';

const Create = () => {
  const { data, setData, errors, post, processing } = useForm({
    name: '',
    address: '',
    coordinate: '',
    brand_img: '',
    banner_img: '',
    is_open: ''
  });

  function handleSubmit(e) {
    e.preventDefault();
    post(route('stores.store'));
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">
        <InertiaLink
          href={route('stores.index')}
          className="text-red-600 hover:text-red-700"
        >
          Toko
        </InertiaLink>
        <span className="font-medium text-red-600"> /</span> Tambah
      </h1>
      <div className="flex flex-grow flex-col-reverse lg:flex-row gap-4">
        <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
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
                value={data.is_open}
                onChange={e => setData('is_open', e.target.value)}
              >
                <option value="0">Tutup</option>
                <option value="1">Buka</option>
              </SelectInput>
            </div>
            <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
              <LoadingButton
                loading={processing}
                type="submit"
                className="btn-red"
              >
                Tambah Toko
              </LoadingButton>
            </div>
          </form>
        </div>
        <div className="w-full lg:w-80">SAMPING</div>
      </div>
    </div>
  );
};

Create.layout = page => <Layout title="Tambah Toko" children={page} />;

export default Create;
