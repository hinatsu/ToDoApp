import React from 'react';
import Task from './Task';

const Tasks = (props) => {
  return (
    <div>
      <button onClick={props.handleDeleteTasks}>Remove All Tasks</button>
      {props.tasks.length === 0 && <p>Add your task!</p>}
      {
        props.tasks.map((task) => (
          <Task 
            key={task} 
            taskText={task} 
            handleDeleteTask={props.handleDeleteTask}
          />
        ))
      }
    </div>
  );
};

export default Tasks;