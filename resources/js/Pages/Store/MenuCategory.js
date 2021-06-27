import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Inertia } from '@inertiajs/inertia';
import classNames from 'classnames';

import Modal from '@/Shared/Modal';
import MenuItem from './MenuItem';
import TextInput from '@/Shared/TextInput';
import LoadingButton from '@/Shared/LoadingButton';
import DeleteButton from '@/Shared/DeleteButton';
import Switch from '@/Shared/Switch';
import FileInput from '@/Shared/FileInput';
import { FormCategory } from './FormCategory';
import { FormMenu } from './FormMenu';

const reorder = (list, startIndex, endIndex) => {
  const [removed] = list.splice(startIndex, 1);
  list.splice(endIndex, 0, removed);

  return list;
};

export default ({ categories, setCategories, storeId, refresh }) => {
  const initialCategoryValue = {
    id: null,
    name: '',
    is_show: false
  };

  const initialMenuValue = {
    id: null,
    name: '',
    description: '',
    price: '',
    image: null,
    is_show: false
  };

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [categoryValues, setCategoryValues] = useState(initialCategoryValue);
  const [menuValues, setMenuValues] = useState(initialMenuValue);
  const [formCategoryUrl, setFormCategoryUrl] = useState();
  const [formMenuUrl, setFormMenuUrl] = useState();

  const handleShowCategoryModal = (formUrl, category = null) => {
    setFormCategoryUrl(formUrl);
    if (category != null) {
      setCategoryValues({
        id: category.id,
        name: category.name,
        is_show: category.is_show
      });
    } else {
      resetCategoryValues();
    }
    setShowCategoryModal(true);
  };

  const handleCloseCategoryModal = () => setShowCategoryModal(false);

  const resetCategoryValues = () => setCategoryValues(initialCategoryValue);

  const handleShowMenuModal = (formUrl, menu = null) => {
    setFormMenuUrl(formUrl);
    if (menu != null) {
      setMenuValues({
        id: menu.id,
        name: menu.name,
        description: menu.description,
        price: menu.price,
        image: menu.image,
        is_show: menu.is_show
      });
    } else {
      resetMenuValues();
    }

    setShowMenuModal(true);
  };

  const handleCloseMenuModal = () => setShowMenuModal(false);

  const resetMenuValues = () => setMenuValues(initialMenuValue);

  const finish = () => {
    handleCloseCategoryModal();
    handleCloseMenuModal();
    resetCategoryValues();
    resetMenuValues();
  };

  const handleOnDragEnd = result => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;

    if (result.type === 'droppableItem') {
      const items = reorder(categories, sourceIndex, destIndex);

      const reorderCategory = items.map((item, index) => {
        return {
          id: item.id,
          order: index + 1
        };
      });

      Inertia.put(route('menus.reorder-category'), reorderCategory);

      setCategories(items);
    } else if (result.type === 'droppableSubItem') {
      const itemSubItemMap = categories.reduce((acc, item) => {
        acc[item.id] = item.menus;
        return acc;
      }, {});

      const sourceParentId = parseInt(result.source.droppableId);
      const destParentId = parseInt(result.destination.droppableId);

      const sourceSubItems = itemSubItemMap[sourceParentId];
      const destSubItems = itemSubItemMap[destParentId];

      let newItems = [...categories];

      if (sourceParentId === destParentId) {
        const reorderedSubItems = reorder(
          sourceSubItems,
          sourceIndex,
          destIndex
        );

        newItems = newItems.map(item => {
          if (item.id === sourceParentId) {
            item.menus = reorderedSubItems;
          }
          return item;
        });

        const reorderMenu = reorderedSubItems.map((menu, index) => {
          return {
            id: menu.id,
            order: index + 1
          };
        });

        Inertia.put(route('menus.reorder-menu'), {
          sourceMenus: reorderMenu
        });

        setCategories(newItems);
      } else {
        let newSourceSubItems = [...sourceSubItems];
        const [draggedItem] = newSourceSubItems.splice(sourceIndex, 1);

        let newDestSubItems = [...destSubItems];
        newDestSubItems.splice(destIndex, 0, draggedItem);
        newItems = newItems.map(item => {
          if (item.id === sourceParentId) {
            item.menus = newSourceSubItems;
          } else if (item.id === destParentId) {
            item.menus = newDestSubItems;
          }
          return item;
        });

        const newSourceMenus = newSourceSubItems.map((menu, index) => {
          return {
            id: menu.id,
            order: index + 1
          };
        });

        const newDestMenus = newDestSubItems.map((menu, index) => {
          return {
            id: menu.id,
            order: index + 1,
            categoryId: destParentId
          };
        });

        Inertia.put(route('menus.reorder-menu'), {
          sourceMenus: newSourceMenus,
          destMenus: newDestMenus
        });

        setCategories(newItems);
      }
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="droppable" type="droppableItem">
          {(provided, snapshot) => (
            <div
              className={classNames({
                'bg-red-100 transition': snapshot.isDraggingOver
              })}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {categories.map((category, index) => {
                return (
                  <Draggable
                    key={category.id.toString()}
                    draggableId={category.id.toString()}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={classNames(
                          'flex flex-col bg-gray-100 rounded mb-2 overflow-hidden',
                          {
                            'bg-gray-400 shadow-lg': snapshot.isDragging,
                            'opacity-75': category.is_show <= 0
                          }
                        )}
                      >
                        <div
                          className={classNames(
                            'flex justify-between items-center p-2 bg-white',
                            {
                              'bg-gray-200 shadow': snapshot.isDragging
                            }
                          )}
                          {...provided.dragHandleProps}
                        >
                          <p
                            className="font-medium hover:text-red-600 hover:underline cursor-pointer"
                            onClick={() =>
                              handleShowCategoryModal(
                                route('menus.update-category', category.id),
                                category
                              )
                            }
                          >{`${index + 1}. ${category.name}`}</p>
                          <div className="flex gap-2">
                            <p
                              className="hover:text-red-600 hover:underline text-xs cursor-pointer"
                              onClick={() =>
                                handleShowMenuModal(
                                  route('menus.store-menu', category.id)
                                )
                              }
                            >
                              Tambah Menu
                            </p>
                          </div>
                        </div>
                        <div className="overflow-x-auto">
                          <MenuItem
                            category={category}
                            type={category.id.toString()}
                            showMenuModal={handleShowMenuModal}
                          />
                        </div>
                        {provided.placeholder}
                      </div>
                    )}
                  </Draggable>
                );
              })}
              <div
                className="h-10 rounded shadow bg-white items-center justify-center flex hover:bg-indigo-100 transition cursor-pointer"
                onClick={() =>
                  handleShowCategoryModal(
                    route('menus.store-category', storeId)
                  )
                }
              >
                Tambah Kategori Menu
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Modal
        size="sm"
        title={categoryValues.id == null ? 'Tambah Kategori' : 'Ubah Kategori'}
        show={showCategoryModal}
        setShow={setShowCategoryModal}
      >
        <FormCategory
          values={categoryValues}
          setValues={setCategoryValues}
          url={formCategoryUrl}
          finish={finish}
          refresh={refresh}
        />
      </Modal>

      <Modal
        title={
          menuValues.id == null ? 'Tambah Menu' : menuValues.name || 'Ubah Menu'
        }
        show={showMenuModal}
        setShow={setShowMenuModal}
        noMargin={true}
      >
        <FormMenu
          values={menuValues}
          setValues={setMenuValues}
          url={formMenuUrl}
          finish={finish}
          refresh={refresh}
        />
      </Modal>
    </>
  );
};
