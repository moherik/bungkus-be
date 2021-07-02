import React, { useEffect, useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { IoCloseOutline } from 'react-icons/io5';

import { currency, reorder } from '@/utils';

export const MenuVariant = ({ variant, setVariant }) => {
  const [variants, setVariants] = useState(variant);
  const [addGroupMode, setAddVariantMode] = useState(false);
  const [addItemMode, setAddItemMode] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState(null);

  const initialItemForm = {
    name: '',
    price: ''
  };
  const [itemForm, setItemForm] = useState(initialItemForm);

  const addInputRef = useRef();
  const addItemInputRef = useRef();

  useEffect(() => {
    setVariant(variants);
  }, [variants]);

  const resetVariant = () => {
    setAddVariantMode(false);
    setItemForm(initialItemForm);
  };

  const handleAddMode = () => {
    setAddItemMode(false);
    setAddVariantMode(true);
    setTimeout(() => {
      addInputRef.current.focus();
    });
  };

  const handleOnBlurVariant = e => {
    const value = e.target.value;
    if (value != '') {
      handleAddVariant(value);
    }

    resetVariant();
  };

  const handleOnKeyDownVariant = e => {
    const value = e.target.value;

    if (e.key == 'Enter') {
      if (value != '') {
        handleAddVariant(value);
      }
    }
    if (e.key == 'Escape') {
      resetVariant();
    }
  };

  const handleAddVariant = value => {
    let newVariants;

    if (variants == null) {
      newVariants = [];
    } else {
      newVariants = [...variants];
    }

    newVariants.push({
      id: newVariants.length + 1,
      name: value,
      items: []
    });

    setVariants(newVariants);
    resetVariant();
  };

  const handleRemoveVariant = (e, index) => {
    e.preventDefault();
    const newVariants = [...variants];
    newVariants.splice(index, 1);
    setVariants(newVariants);
  };

  const handleAddItemMode = (e, variantId) => {
    setAddVariantMode(false);
    setSelectedVariantId(variantId);
    setAddItemMode(true);
    setTimeout(() => {
      addItemInputRef.current.focus();
    });
  };

  const focusItemName = () => {
    setTimeout(() => {
      addItemInputRef.current.focus();
    });
  };

  const handleOnBlurItem = e => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      if (itemForm.name != '') {
        handleAddItem();
      }
      setAddItemMode(false);
    }
  };

  const handleOnKeyDownItem = e => {
    if (e.key == 'Enter') {
      if (itemForm.name != '') handleAddItem();
    }
    if (e.key == 'Escape') {
      setAddItemMode(false);
    }
  };

  const handleAddItem = () => {
    const newVariants = [...variants];

    const maxPerRows = newVariants.map(variant => {
      return variant.items.reduce((max, items) => Math.max(max, items.id), 0);
    });

    const max = Math.max.apply(Math, maxPerRows);

    newVariants.forEach(variant => {
      if (variant.id == selectedVariantId) {
        if (variant.items == null) variant.items = [];
        variant.items.push({
          id: max + 1,
          name: itemForm.name,
          price: itemForm.price || null
        });
      }
    });

    setVariants(newVariants);
    setItemForm(initialItemForm);
    focusItemName();
  };

  const handleRemoveItem = (e, itemId) => {
    e.preventDefault();
    const newVariants = [...variants];
    newVariants.forEach(variant => {
      variant.items = variant.items.filter(item => item.id != itemId);
    });
    setVariants(newVariants);
  };

  const handleOnDragStart = () => {
    setAddItemMode(false);
    setAddVariantMode(false);
    setSelectedVariantId(null);
    setItemForm(initialItemForm);
  };

  const handleOnDragEnd = result => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;

    if (result.type === 'droppableVariant') {
      const newVariants = reorder(variants, sourceIndex, destIndex);

      setVariants(newVariants);
    } else if (result.type === 'droppableItem') {
      const itemVariantMap = variants.reduce((acc, group) => {
        acc[group.id] = group.items;
        return acc;
      }, {});

      const sourceParentId = parseInt(result.source.droppableId);
      const destParentId = parseInt(result.destination.droppableId);

      const sourceItems = itemVariantMap[sourceParentId];
      const destItems = itemVariantMap[destParentId];

      let newVariants = [...variants];

      if (sourceParentId === destParentId) {
        const reorderedSubItems = reorder(sourceItems, sourceIndex, destIndex);

        newVariants = newVariants.map(variant => {
          if (variant.id === sourceParentId) {
            variant.items = reorderedSubItems;
          }
          return variant;
        });

        setVariants(newVariants);
      } else {
        let newSourceItems = [...sourceItems];
        let newDestItems = [...destItems];

        const [draggedItem] = newSourceItems.splice(sourceIndex, 1);

        newDestItems.splice(destIndex, 0, draggedItem);
        newVariants = newVariants.map(variant => {
          if (variant.id === sourceParentId) {
            variant.items = newSourceItems;
          } else if (variant.id === destParentId) {
            variant.items = newDestItems;
          }
          return variant;
        });

        setVariants(newVariants);
      }
    }
  };

  return (
    <>
      <DragDropContext
        onDragStart={handleOnDragStart}
        onDragEnd={handleOnDragEnd}
      >
        <Droppable droppableId="variant" type="droppableVariant">
          {(provided, _snapshot) => (
            <div
              className="w-full h-full"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {variants != null &&
                variants.map((variant, index) => (
                  <Draggable
                    key={variant.id.toString()}
                    draggableId={variant.id.toString()}
                    index={index}
                  >
                    {(provided, _snapshot) => (
                      <div
                        className="mb-2"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="w-full bg-white px-3 py-2 rounded border">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm">{variant.name}</p>
                            <a
                              href="#"
                              className="text-sm cursor-pointer hover:underline hover:text-red-600"
                              onClick={e => handleRemoveVariant(e, index)}
                            >
                              <IoCloseOutline />
                            </a>
                          </div>
                          <Droppable
                            droppableId={variant.id.toString()}
                            type="droppableItem"
                          >
                            {(provided, _snapshot) => (
                              <div className="w-full" ref={provided.innerRef}>
                                {variant.items != null &&
                                  variant.items.map((item, index) => (
                                    <Draggable
                                      key={`item${item.id.toString()}`}
                                      draggableId={`item${item.id.toString()}`}
                                      index={index}
                                    >
                                      {(provided, _snapshot) => (
                                        <div
                                          className="w-full bg-white px-3 py-2 mt-1 rounded border"
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                        >
                                          <div className="flex items-center justify-between gap-4">
                                            <div className="flex items-center justify-between w-full">
                                              <div className="text-sm">
                                                {item.name}
                                              </div>
                                              <div className="text-sm font-medium">
                                                {item.price != null &&
                                                  currency(item.price)}
                                              </div>
                                            </div>
                                            <a
                                              href="#"
                                              className="text-sm cursor-pointer hover:underline hover:text-red-600"
                                              onClick={e =>
                                                handleRemoveItem(e, item.id)
                                              }
                                            >
                                              <IoCloseOutline />
                                            </a>
                                          </div>
                                          {provided.placeholder}
                                        </div>
                                      )}
                                    </Draggable>
                                  ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>

                          {!addItemMode || selectedVariantId != variant.id ? (
                            <div
                              className="w-full bg-white mt-1 p-2 text-sm text-center rounded border cursor-pointer hover:bg-red-300"
                              onClick={e => handleAddItemMode(e, variant.id)}
                            >
                              Tambah Item
                            </div>
                          ) : (
                            (addItemMode ||
                              selectedVariantId == variant.id) && (
                              <div
                                className="flex rounded bg-white overflow-hidden mt-1 border-red-600 justifty-center border-2 border-solid"
                                onBlur={handleOnBlurItem}
                              >
                                <input
                                  className="w-full text-sm px-3 py-2 outline-none"
                                  autoComplete="off"
                                  name="name"
                                  id="name"
                                  placeholder="Item"
                                  ref={addItemInputRef}
                                  onKeyDown={handleOnKeyDownItem}
                                  value={itemForm.name}
                                  onChange={e =>
                                    setItemForm(values => ({
                                      ...values,
                                      name: e.target.value
                                    }))
                                  }
                                />
                                <input
                                  className="w-full text-sm px-3 py-2 border-l outline-none"
                                  autoComplete="off"
                                  name="price"
                                  id="price"
                                  placeholder="Harga (opsional)"
                                  type="number"
                                  value={itemForm.price}
                                  onKeyDown={handleOnKeyDownItem}
                                  onChange={e =>
                                    setItemForm(values => ({
                                      ...values,
                                      price: e.target.value
                                    }))
                                  }
                                />
                              </div>
                            )
                          )}
                        </div>
                        {provided.placeholder}
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}

              {!addGroupMode ? (
                <div
                  className="w-full bg-white mt-2 p-2 text-sm text-center rounded border cursor-pointer hover:bg-red-300"
                  onClick={handleAddMode}
                >
                  Tambah Varian
                </div>
              ) : (
                <input
                  className="w-full text-sm px-3 py-2 rounded outline-none bg-white overflow-hidden border-red-600 justifty-center border-2 border-solid"
                  name="price"
                  id="price"
                  placeholder="Contoh: Topping"
                  ref={addInputRef}
                  onBlur={handleOnBlurVariant}
                  onKeyDown={handleOnKeyDownVariant}
                />
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};
