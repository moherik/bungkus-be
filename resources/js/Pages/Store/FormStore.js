import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import { nullOrEmpty } from '@/utils';

import { FileInput } from '@/Shared/FileInput';
import { LoadingButton } from '@/Shared/LoadingButton';
import { Modal } from '@/Shared/Modal';
import { Switch } from '@/Shared/Switch';
import { TextInput } from '@/Shared/TextInput';
import { DeleteButton } from '@/Shared/DeleteButton';

export const FormStore = ({ show, setShow, data = null, refresh }) => {
  const { errors } = usePage().props;

  const [disbaledButton, setDisabledButton] = useState(true);
  const [processing, setProcessing] = useState(false);

  const initialValues = {
    id: null,
    name: '',
    address: '',
    coordinate: '',
    brand_img: '',
    is_open: false
  };
  const [values, setValues] = useState(data || initialValues);

  useEffect(() => {
    if (
      nullOrEmpty(values.name) ||
      nullOrEmpty(values.address) ||
      nullOrEmpty(values.coordinate)
    ) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }, [values]);

  const handleChange = e => {
    setValues(values => ({
      ...values,
      [e.target.id]: e.target.value
    }));
  };

  const handleFileChange = (image, id) => {
    setValues(values => ({
      ...values,
      [id]: image
    }));
  };

  const handleOnSwitch = e =>
    setValues(values => ({
      ...values,
      [e.target.id]: e.target.checked ? 1 : 0
    }));

  const handleStore = e => {
    e.preventDefault();
    setProcessing(true);
    Inertia.post(route('stores.store'), values).finally(() =>
      setProcessing(false)
    );
  };

  const handleDestroy = () => {
    if (confirm('Apakah anda yakin ingin menghapus data ini?')) {
      Inertia.delete(route('stores.destroy', data.id));
    }
  };

  const handleUpdate = e => {
    e.preventDefault();
    setProcessing(true);
    Inertia.post(
      route('stores.update', data.id),
      {
        _method: 'put',
        name: values.name,
        address: values.address,
        coordinate: values.coordinate,
        brand_img: values.brand_img,
        is_open: values.is_open
      },
      {
        forceFormData: true
      }
    ).finally(() => setProcessing(false));
  };

  return (
    <Modal
      noMargin={true}
      size="md"
      title={values.id == null ? 'Tambah Toko' : 'Ubah Toko'}
      show={show}
      setShow={setShow}
    >
      <form onSubmit={values.id == null ? handleStore : handleUpdate}>
        <div className="flex flex-col px-6 py-5 overflow-y-auto h-96">
          <TextInput
            className="w-full pb-2"
            label="Nama"
            name="name"
            id="name"
            errors={errors.name}
            value={values.name}
            onChange={handleChange}
          />
          <TextInput
            className="w-full pb-2"
            label="Alamat"
            name="address"
            id="address"
            type="text"
            errors={errors.address}
            value={values.address}
            onChange={handleChange}
          />
          <TextInput
            className="w-full pb-2"
            label="Lokasi"
            name="coordinate"
            id="coordinate"
            type="text"
            errors={errors.coordinate}
            value={values.coordinate}
            onChange={handleChange}
          />
          <FileInput
            className="w-full pb-2"
            label="Logo Toko"
            name="brand_img"
            accept="image/*"
            errors={errors.brand_img}
            image={values.brand_img}
            onChange={image => handleFileChange(image, 'brand_img')}
          />
        </div>
        <div className="flex items-center justify-end px-6 py-5 border-t-2">
          {values.id != null && (
            <DeleteButton onDelete={handleDestroy}>Hapus?</DeleteButton>
          )}
          <div className="flex items-center gap-4 ml-auto">
            <Switch
              name="is_open"
              id="is_open"
              defaultChecked={values.is_open}
              onChange={handleOnSwitch}
            />
            <LoadingButton
              disabled={disbaledButton}
              loading={processing}
              type="submit"
              className="btn-red btn-lg"
            >
              {values.id == null ? 'Tambah Toko' : 'Simpan'}
            </LoadingButton>
          </div>
        </div>
      </form>
    </Modal>
  );
};
