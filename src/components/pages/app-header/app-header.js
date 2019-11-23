import React from 'react';
import './app-header.css';

const AppHeader = ({toDo, done}) => {
  return (
    <div className="app-header d-flex">
      <h4>Количество команд {toDo} </h4>
     {/* { <h2> more to do, {done} done</h2>} */}
    </div>
  );
};

export default AppHeader;
