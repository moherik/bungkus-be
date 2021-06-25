import React, { useState } from 'react';
import Switch from '@/Shared/Switch';
import Icon from '@/Shared/Icon';
import classNames from 'classnames';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import { currency } from '@/utils';

export default ({ category, type }) => {
  function handleOnSwitch(menus, id, e) {
    const index = menus.findIndex(x => x.id == id);
    menus[index].is_show = e.target.checked;

    Inertia.put(route('menus.update-status', [id, e.target.checked]));
  }

  return (
    <Droppable droppableId={type} type="droppableSubItem">
      {(provided, snapshot) => (
        <ul
          ref={provided.innerRef}
          className={classNames('flex flex-col gap-2')}
          style={{ minHeight: '50px' }}
        >
          {category.menus.map((menu, index) => {
            return (
              <Draggable
                key={category.id}
                draggableId={`menu${menu.id.toString()}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <li
                    className={classNames(
                      'flex items-center p-2 focus:outline-none rounded shadow transition',
                      {
                        'bg-white': menu.is_show,
                        'bg-gray-200': !menu.is_show,
                        'bg-red-200 shadow-lg': snapshot.isDragging
                      }
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <InertiaLink href="#" className="flex gap-3">
                      <img src={menu.image} className="w-14 h-14 rounded" />
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <h3 className="text-sm font-medium">{menu.name}</h3>
                          {menu.deleted_at && (
                            <Icon
                              name="trash"
                              className="flex-shrink-0 w-3 h-3 ml-2 text-gray-400 fill-current"
                            />
                          )}
                        </div>
                        <span className="text-xs">{menu.description}</span>
                        <p className="text-sm">{currency(menu.price)}</p>
                      </div>
                    </InertiaLink>
                    <div className="ml-auto flex">
                      <Switch
                        defaultChecked={menu.is_show}
                        onChange={e =>
                          handleOnSwitch(category.menus, menu.id, e)
                        }
                      />
                    </div>
                    {provided.placeholder}
                  </li>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};
