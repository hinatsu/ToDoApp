import React from 'react';

const Task = (props) => (
  <div className="task">
    <p className = "task__text">{props.count}. {props.taskText}</p>
    <div>
      <button
        className="button button--link"
        onClick={(e) => {
          props.handleEditTask(props.taskText);
        }}
      >
        Edit
      </button>
      <button 
        className="button button--link button--edit"
        onClick={(e) => {
          props.handleDeleteTask(props.taskText);
        }}
      >
        Remove
    </button>
    </div>
    
  </div>
); 

export default Task;