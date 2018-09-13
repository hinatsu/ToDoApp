import React from 'react';
import Header from './Header';
import Tasks from './Tasks';
import AddTask from './AddTask';

export default class ToDoApp extends React.Component {
    state = {
      tasks: [],
      completed: false
    }

  handleDeleteTasks = () => {
    this.setState(() => ({ tasks: [] }));
  };
  handleDeleteTask = (taskToRemove) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => taskToRemove !== task)
    }));
  };
  
 
  handleAddTask = (task) => {
    if (!task) {
      return 'Enter valid value to add task';
    } else if (this.state.tasks.indexOf(task) > -1) {
      return 'This task already exists';
    }

    this.setState((prevState) => ({ 
      tasks: prevState.tasks.concat(task) 
    }));
  }

  componentDidMount() {

    try {
      const json = localStorage.getItem('tasks');
      const tasks = JSON.parse(json);

      if (tasks) {
        this.setState(() => ({ tasks }));
      }
    } catch (e) {
      //Do nothing
    }
    

    console.log("fetching data");
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.tasks.length !== this.state.tasks.length) {
      const json = JSON.stringify(this.state.tasks);
      localStorage.setItem('tasks', json);
      console.log('saving data');
    }
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  
  render() {
    const subtitle = 'Manage your tasks here!';

    return (
      <div>
        <Header subtitle={subtitle} />
        <div className="container">
          <div className="widget">
            <Tasks 
              tasks={this.state.tasks}
              handleDeleteTasks={this.handleDeleteTasks}
              handleDeleteTask={this.handleDeleteTask}
              handleEditTask={this.handleEditTask}
            />
            <AddTask 
              handleAddTask={this.handleAddTask}
            />
          </div>
        </div>
      </div>
    );
  }
}

ToDoApp.defaultProps = {
  tasks: []
};