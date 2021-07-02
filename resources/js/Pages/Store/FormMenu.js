import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

import { DeleteButton } from '@/Shared/DeleteButton';
import { FileInput } from '@/Shared/FileInput';
import { LoadingButton } from '@/Shared/LoadingButton';
import { Switch } from '@/Shared/Switch';
import { TextInput } from '@/Shared/TextInput';

import { MenuVariant } from './MenuVariant';
import { currency, nullOrEmpty, percentage } from '@/utils';
import { Modal } from '@/Shared/Modal';

export const FormMenu = ({
  show,
  setShow,
  values,
  setValues,
  url,
  finish,
  refresh
}) => {
  const [processing, setProcessing] = useState(false);
  const [disbaledButton, setDisabledButton] = useState(true);

  useEffect(() => {
    if (!nullOrEmpty(values.name) && !nullOrEmpty(values.price)) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [values]);

  const handleSubmitForm = e => {
    if (values.id == null) {
      handleStore();
    } else {
      handleUpdate();
    }
  };

  const handleStore = e => {
    setProcessing(true);
    Inertia.post(url, values)
      .then(() => refresh())
      .finally(() => {
        setProcessing(false);
        finish();
      });
  };

  const handleUpdate = e => {
    setProcessing(true);
    Inertia.post(
      url,
      { _method: 'put', ...values },
      {
        forceFormData: true
      }
    )
      .then(() => refresh())
      .finally(() => {
        setProcessing(false);
        finish();
      });
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

  const handleSetVariant = variant =>
    setValues(values => ({
      ...values,
      variant: variant
    }));

  return (
    <Modal
      title={
        values.id == null
          ? 'Tambah Menu'
          : `${values.name} | Ubah` || 'Ubah Menu'
      }
      show={show}
      setShow={setShow}
      noMargin={true}
    >
      <form>
        <div className="flex w-full items-start h-96">
          <div className="w-full lg:w-1/2 overflow-y-auto h-full px-6 py-5">
            <TextInput
              required
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
              value={values.description || ''}
              label="Deskripsi"
              onChange={handleChange}
            />
            <div className="mb-4">
              <div className="flex items-center">
                <TextInput
                  required
                  name="price"
                  id="price"
                  value={values.price}
                  label="Harga"
                  type="number"
                  min="0"
                  onChange={handleChange}
                />
                <TextInput
                  name="discount"
                  id="discount"
                  value={values.discount || ''}
                  label="Diskon(%)"
                  max="100"
                  min="0"
                  type="number"
                  onChange={handleChange}
                />
              </div>
              <p className="text-sm">
                Harga Setelah Diskon:{' '}
                <span className="font-medium">
                  {currency(percentage(values.price, values.discount || 0))}
                </span>
              </p>
            </div>
            <FileInput
              className="w-full pb-4"
              id="image"
              name="image"
              accept="image/*"
              label="Gambar Menu"
              value={values.image}
              onChange={handleFileChange}
              image={values.image || null}
            />
          </div>
          <div className="w-full lg:w-1/2 overflow-y-auto px-6 py-5 h-96 bg-gray-100">
            <h4 className="text-sm font-medium">Opsi Menu</h4>
            <div className="mt-2">
              <MenuVariant
                variant={values.variant}
                setVariant={handleSetVariant}
              />
            </div>
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
              disabled={disbaledButton}
              loading={processing}
              type="button"
              className="btn-red btn-sm"
              onClick={handleSubmitForm}
            >
              Simpan
            </LoadingButton>
          </div>
        </div>
      </form>
    </Modal>
  );
};
