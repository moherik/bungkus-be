import React, { useState } from 'react';

import DeleteButton from '@/Shared/DeleteButton';
import FileInput from '@/Shared/FileInput';
import LoadingButton from '@/Shared/LoadingButton';
import Switch from '@/Shared/Switch';
import TextInput from '@/Shared/TextInput';
import { Inertia } from '@inertiajs/inertia';
import { uploadDir } from '@/constant';

export const FormMenu = ({ values, setValues, url, finish, refresh }) => {
  const [processing, setProcessing] = useState(false);

  const handleStore = e => {
    e.preventDefault();
    setProcessing(true);
    Inertia.post(url, values)
      .then(() => refresh())
      .finally(() => finish());
  };

  const handleUpdate = e => {
    e.preventDefault();
    setProcessing(true);
    Inertia.post(
      url,
      { _method: 'put', ...values },
      {
        forceFormData: true
      }
    )
      .then(() => refresh())
      .finally(() => finish());
  };

  const handleDestroy = id => {
    if (confirm('Apakah anda yakin ingin menghapus menu ini?')) {
      Inertia.delete(route('menus.destroy-menu', id))
        .then(() => refresh())
        .finally(() => finish());
    }
  };

  const handleChange = e => {
    const key = e.target.id;
    const value = e.target.value;
    setValues(values => ({
      ...values,
      [key]: value
    }));
  };

  const handleFileChange = image =>
    setValues(values => ({ ...values, image: image }));

  const handleSwitch = e =>
    setValues(values => ({
      ...values,
      is_show: e.target.checked
    }));

  return (
    <form onSubmit={values.id == null ? handleStore : handleUpdate}>
      <div className="flex w-full items-start h-96">
        <div class="w-full lg:w-1/2 overflow-y-auto h-full px-6 py-5">
          <TextInput
            className="w-full pb-2"
            name="name"
            id="name"
            value={values.name}
            label="Nama Menu"
            onChange={handleChange}
          />
          <TextInput
            className="w-full pb-2"
            name="description"
            id="description"
            value={values.description}
            label="Deskripsi"
            onChange={handleChange}
          />
          <TextInput
            className="w-full pb-2"
            name="price"
            id="price"
            value={values.price}
            label="Harga"
            onChange={handleChange}
          />
          <FileInput
            className="w-full pb-4"
            id="image"
            name="image"
            accept="image/*"
            label="Gambar Menu"
            onChange={handleFileChange}
            image={values.image}
          />
        </div>
        <div className="w-full lg:w-1/2 overflow-y-auto px-6 py-5 h-96 bg-gray-100">
          <h4 className="text-sm font-medium">Varian Menu</h4>
        </div>
      </div>
      <div className="flex items-center px-6 py-5 border-t-2">
        {values.id != null && (
          <DeleteButton onDelete={() => handleDestroy(values.id)}>
            Hapus?
          </DeleteButton>
        )}
        <div className="flex items-center gap-4 ml-auto">
          <Switch
            name="is_show"
            id="is_show"
            defaultChecked={values.is_show}
            onChange={handleSwitch}
          />
          <LoadingButton
            loading={processing}
            type="submit"
            className="btn-red btn-sm"
          >
            Simpan
          </LoadingButton>
        </div>
      </div>
    </form>
  );
};
