import React from 'react';
import Task from './Task';

const Tasks = (props) => (
  <div>
    <div className="widget-header">
      <h3 className="widget-header__title">Your Tasks</h3> 
      <button 
        className="button button--link"
        onClick={props.handleDeleteTasks}
      >
        Remove All Tasks
      </button>
    </div>
    
    {props.tasks.length === 0 && <p className="widget__message">Add your task!</p>}
    {
      props.tasks.map((task, index) => (
        <Task 
          key={task} 
          taskText={task} 
          count={index + 1}
          handleDeleteTask={props.handleDeleteTask}
          handleEditTask={props.handleEditTask}
        />
      ))
    }
  </div>
);

export default Tasks;