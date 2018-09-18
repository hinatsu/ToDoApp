import React from 'react';

const Task = (props) => (
  <div className="task">
    <div>
      <div>
        <input 
          className="task__Check"
          type="checkbox" 
        />
        <div className="task__text">{props.taskText}</div>
      </div>
      
    </div>
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