import React, { useState } from 'react';
import { Switch } from '@/Shared/Switch';
import classNames from 'classnames';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Inertia } from '@inertiajs/inertia';
import { currency, fallbackImg, percentage } from '@/utils';
import { Image } from '@/Shared/Image';
import { IoTrashOutline } from 'react-icons/io5';

export const MenuItem = ({ category, type, showMenuModal }) => {
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
          className={classNames('flex flex-col gap-2 p-2', {
            'bg-red-100': snapshot.isDraggingOver
          })}
          style={{ minHeight: '50px' }}
        >
          {category.menus.map((menu, index) => {
            return (
              <Draggable
                key={`menu${menu.id.toString()}`}
                draggableId={`menu${menu.id.toString()}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <li
                    className={classNames(
                      'flex items-center p-2 focus:outline-none rounded',
                      {
                        'bg-white shadow-sm': menu.is_show,
                        'bg-gray-100': !menu.is_show,
                        'bg-indigo-200 shadow-lg border-2 border-solid border-indigo-600':
                          snapshot.isDragging
                      }
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div
                      onClick={() =>
                        showMenuModal(route('menus.update-menu', menu.id), menu)
                      }
                      className="flex gap-3 cursor-pointer"
                    >
                      <Image src={menu.image} className="w-14 h-14 rounded" />
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <h3 className="text-sm font-medium">{menu.name}</h3>
                          {menu.deleted_at && (
                            <IoTrashOutline className="flex-shrink-0 w-3 h-3 ml-2 text-gray-400 fill-current" />
                          )}
                        </div>
                        <span className="text-xs">{menu.description}</span>
                        {menu.discount > 0 ? (
                          <>
                            <p className="text-sm font-medium text-red-600">
                              {currency(percentage(menu.price, menu.discount))}
                            </p>
                            <p className="text-sm">
                              <span className="line-through">
                                {currency(menu.price)}
                              </span>{' '}
                              (-{menu.discount}%)
                            </p>
                          </>
                        ) : (
                          <p className="text-sm">{currency(menu.price)}</p>
                        )}
                      </div>
                    </div>
                    <div className="ml-auto flex">
                      <Switch
                        checked={menu.is_show}
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
