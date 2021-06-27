import React, { useState } from 'react';
import TextInput from '@/Shared/TextInput';
import LoadingButton from '@/Shared/LoadingButton';
import DeleteButton from '@/Shared/DeleteButton';
import { Inertia } from '@inertiajs/inertia';
import Switch from '@/Shared/Switch';

export const FormCategory = ({ values, setValues, url, finish, refresh }) => {
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
    Inertia.put(url, values)
      .then(() => refresh())
      .finally(() => finish());
  };

  const handleDestroy = id => {
    if (confirm('Apakah anda yakin ingin menghapus kategori ini?')) {
      Inertia.delete(route('menus.destroy-category', id))
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

  const handleSwitch = e => {
    setValues(values => ({
      ...values,
      is_show: e.target.checked
    }));
  };

  return (
    <form onSubmit={values.id == null ? handleStore : handleUpdate}>
      <TextInput
        className="w-full pb-2"
        name="name"
        id="name"
        value={values.name}
        placeholder="Nama kategori menu"
        onChange={handleChange}
      />
      <Switch
        name="is_show"
        id="is_show"
        label="Tampilkan?"
        defaultChecked={values.is_show}
        onChange={handleSwitch}
      />
      <div className="flex items-center mt-4">
        {values.id != null && (
          <DeleteButton onDelete={() => handleDestroy(values.id)}>
            Hapus?
          </DeleteButton>
        )}
        <LoadingButton
          type="submit"
          loading={processing}
          className="ml-auto btn-red btn-sm"
        >
          Simpan
        </LoadingButton>
      </div>
    </form>
  );
};
