import React from 'react';

const Task = (props) => (
  <div className="task">
    <div>
      <div>
        <input 
          className="task__Check"
          type="checkbox" 
          onChange={(e) => {
            props.handleDone(props.task)
          }}
          checked={props.task.done}
        />
        <div className="task__text">{props.task.taskText}</div>
      </div>
      
    </div>
    <div>
      <button
        className="button button--link"
      >
        Edit
      </button>
      <button 
        className="button button--link button--edit"
        onClick={(e) => {
          props.handleDeleteTask(props.task.taskText);
        }}
      >
        Remove
      </button>
    </div>
  </div>
); 

export default Task;