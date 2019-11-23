import React from 'react';

import './todo-list-item.css';
import {
  View,
  Popup,
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  NavRight,
  Link,
  Toolbar,
  Block,
  BlockTitle,
  List,
  ListItem,
  Row,
  Col,
  Button
} from 'framework7-react';
const TodoListItem = ({ important, done,
  label, onToggleImportant, onToggleDone, onDelete }) => {

  let classNames = 'todo-list-item';
  if (important) {
    classNames += ' important';
  }

  if (done) {
    classNames += ' done';
  }


  return (
    <Row className={classNames}>
      <Col className="todo-list-item-label"
        onClick={onToggleDone}>{label}
      </Col>
    </Row>

    // {<span className={classNames}>
    //   <span
    //     className="todo-list-item-label"
    //     onClick={onToggleDone}>{label}</span>

    //   <button type="button"
    //           className="btn btn-outline-success btn-sm float-right"
    //           onClick={onToggleImportant}>
    //     <i className="fa fa-exclamation"></i>
    //   </button>

    //   <button type="button"
    //           className="btn btn-outline-danger btn-sm float-right"
    //           onClick={onDelete}>
    //     <i className="fa fa-trash-o"></i>
    //   </button>
    // </span>}
  );
};

export default TodoListItem;
