import React, { createRef, useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { reorder } from '@/utils';

const variants = [
  {
    id: 1,
    name: 'Topping',
    items: [
      {
        id: 1,
        name: 'Telor',
        price: 2000
      },
      {
        id: 2,
        name: 'Ceker',
        price: 3000
      }
    ]
  },
  {
    id: 2,
    name: 'Pilihan',
    items: [
      {
        id: 3,
        name: 'Ekstra Saos',
        price: 2000
      },
      {
        id: 4,
        name: 'Ekstra Topping',
        price: 2000
      }
    ]
  }
];

export const MenuVariant = () => {
  const [groups, setGroups] = useState(variants);
  const [addMode, setAddMode] = useState(false);

  const addInputRef = useRef();

  const handleAddMode = () => {
    setAddMode(true);
    setTimeout(() => {
      addInputRef.current.focus();
    });
  };

  const handleKeyDownAddMode = e => {
    const value = e.target.value;
    if (value == '') return;

    if (e.key == 'Enter') {
      const newGroups = [...groups];
      newGroups.push({
        id: newGroups.length + 1,
        name: value,
        items: []
      });
      setGroups(newGroups);
      setAddMode(false);
    } else if (e.key == 'Escape') {
      setAddMode(false);
    }
  };

  const handleRemoveGroup = (e, index) => {
    e.preventDefault();
    const newGroups = [...groups];
    newGroups.splice(index, 1);
    setGroups(newGroups);
  };

  const handleRemoveItem = (e, index) => {
    e.preventDefault();
    const newGroups = [...groups];
    newGroups.splice(index, 1);
    setGroups(newGroups);
  };

  const handleOnDragEnd = result => {
    if (!result.destination) return;
    console.log(result);

    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;

    if (result.type === 'droppableGroup') {
      const newGroups = reorder(groups, sourceIndex, destIndex);

      setGroups(newGroups);
    } else if (result.type === 'droppableItem') {
      const itemGroupMap = groups.reduce((acc, group) => {
        acc[group.id] = group.items;
        return acc;
      }, {});

      const sourceParentId = parseInt(result.source.droppableId);
      const destParentId = parseInt(result.destination.droppableId);

      const sourceItems = itemGroupMap[sourceParentId];
      const destItems = itemGroupMap[destParentId];

      let newGroups = [...groups];

      if (sourceParentId === destParentId) {
        const reorderedSubItems = reorder(sourceItems, sourceIndex, destIndex);

        newGroups = newGroups.map(group => {
          if (group.id === sourceParentId) {
            group.items = reorderedSubItems;
          }
          return group;
        });

        setGroups(newGroups);
      } else {
        let newSourceItems = [...sourceItems];
        let newDestItems = [...destItems];

        const [draggedItem] = newSourceItems.splice(sourceIndex, 1);

        newDestItems.splice(destIndex, 0, draggedItem);
        newGroups = newGroups.map(group => {
          if (group.id === sourceParentId) {
            group.items = newSourceItems;
          } else if (group.id === destParentId) {
            group.items = newDestItems;
          }
          return group;
        });

        setGroups(newGroups);
      }
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="group" type="droppableGroup">
          {(provided, _snapshot) => (
            <div
              className="w-full h-full"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {groups.map((group, index) => (
                <Draggable
                  key={group.id.toString()}
                  draggableId={group.id.toString()}
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
                        <div class="flex items-center justify-between">
                          <p className="text-sm">{group.name}</p>
                          <a
                            href="#"
                            className="text-sm cursor-pointer hover:underline hover:text-red-600"
                            onClick={e => handleRemoveGroup(e, index)}
                          >
                            X
                          </a>
                        </div>
                        <Droppable
                          droppableId={group.id.toString()}
                          type="droppableItem"
                        >
                          {(provided, _snapshot) => (
                            <div className="w-full" ref={provided.innerRef}>
                              {group.items.map((item, index) => (
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
                                      <div className="flex items-center justify-between">
                                        <p className="text-sm">{item.name}</p>
                                        <a
                                          href="#"
                                          className="text-sm cursor-pointer hover:underline hover:text-red-600"
                                          onClick={e =>
                                            handleRemoveItem(e, index)
                                          }
                                        >
                                          X
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
                      </div>
                      {provided.placeholder}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}

              {!addMode ? (
                <div
                  className="w-full bg-white mt-2 p-2 text-sm text-center rounded border cursor-pointer hover:bg-gray-100"
                  onClick={handleAddMode}
                >
                  Tambah Varian
                </div>
              ) : (
                <div>
                  <input
                    onKeyDown={handleKeyDownAddMode}
                    className="w-full text-sm border px-3 py-2 rounded outline-none"
                    name="price"
                    id="price"
                    placeholder="Contoh: Topping"
                    ref={addInputRef}
                  />
                  <p className="mt-2 text-xs text-indigo-600">
                    Info: klik enter untuk menyimpan, klik esc untuk
                    membatalkan.
                  </p>
                </div>
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};
