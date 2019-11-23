import React from 'react';

import TodoListItem from '../todo-list-item2/todo-list-item2';

import './todo-list2.css';
import { ListItem } from 'framework7-react';

const TodoList = ({ items, onToggleImportant, onToggleDone, onDelete }) => {

  const elements = items.map((item) => {
    const { id, ...itemProps } = item;
    return (
      <ListItem key={id} className="list-group-item">
        <TodoListItem
          { ...itemProps }
          onToggleImportant={ () => onToggleImportant(id) }
          onToggleDone={ () => onToggleDone(id) }
          onDelete={ () => onDelete(id) } />
      </ListItem>
    );
  });

  return (<ul className="todo-list list-group">{ elements }</ul>);
};

export default TodoList;
