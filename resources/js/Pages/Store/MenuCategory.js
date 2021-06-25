import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Inertia } from '@inertiajs/inertia';
import { currency } from '@/utils';

import MenuItem from './MenuItem';
import classNames from 'classnames';

export default ({ categories, setCategories }) => {
  function handleOnDragEnd(result) {
    if (!result.destination) return;

    // source/destination.droppableId = categoryId
    // source/destination.draggableId = menuId
    // draggableId = selectedMenuId

    // const { source, destination, draggableId } = result;
    // if (source.droppableId != destination.droppableId) {
    //   console.log(result);

    //   // const sourceCategory = menuCategories.find(
    //   //   x => x.id == source.droppableId
    //   // );
    //   // const destCategory = menuCategories.find(
    //   //   x => x.id == destination.droppableId
    //   // );
    //   // const sourceMenus = [...sourceCategory.menus];
    //   // const destMenus = [...destCategory.menus];
    //   // const removed = sourceMenus.filter((val, i) => val.id == draggableId)[0];
    //   // const newMenus = sourceMenus.filter((val, i) => val.id != draggableId);
    //   // destMenus.splice(destination.index, 0, removed);
    //   // console.log(destMenus);
    //   // console.log(newMenus);

    //   // const newCategories = {
    //   //   ...menuCategories,
    //   //   [source.droppableId]: {
    //   //     ...sourceCategory,
    //   //     menus: newMenus
    //   //   },
    //   //   [destination.droppableId]: {
    //   //     ...destCategory,
    //   //     menus: destMenus
    //   //   }
    //   // };

    //   console.log(newCategories);

    //   // setMenuCategories(Object.values(newCategories));
    // } else {
    //   const category = categories[source.droppableId];
    //   const copiedMenus = [...category.menus];
    //   const [removed] = copiedMenus.splice(source.index, 1);
    //   copiedMenus.splice(destination.index, 0, removed);
    //   const newCategories = {
    //     ...menuCategories,
    //     [source.droppableId]: {
    //       ...category,
    //       menus: copiedMenus
    //     }
    //   };

    //   setCategories(Object.values(newCategories));
    // }

    // Inertia.put(
    //   route('menus.move', [
    //     Number(draggableId),
    //     Number(destination.droppableId)
    //   ])
    // );
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="droppable" type="droppableCategory">
        {(provided, snapshot) => (
          <div
            className={classNames('p-2', {
              'bg-red-200 transition': snapshot.isDraggingOver
            })}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {categories.map((category, index) => {
              return (
                <Draggable
                  key={category.id}
                  draggableId={category.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={classNames(
                        'flex flex-col p-2 bg-gray-300 rounded gap-4 mb-2 transition',
                        {
                          'bg-gray-500 shadow-lg': snapshot.isDragging
                        }
                      )}
                    >
                      <div
                        className="flex justify-between"
                        {...provided.dragHandleProps}
                      >
                        <p className="font-medium">{category.name}</p>
                        <a
                          href="#"
                          className="hover:text-red-600 hover:underline"
                        >
                          Tambah
                        </a>
                      </div>
                      <div className="overflow-x-auto">
                        <MenuItem
                          category={category}
                          type={category.id.toString()}
                        />
                      </div>
                      {provided.placeholder}
                    </div>
                  )}
                </Draggable>
              );
            })}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
