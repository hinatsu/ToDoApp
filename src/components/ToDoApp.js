import React from 'react';
import Header from './Header';
import Tasks from './Tasks';
import AddTask from './AddTask';

export default class ToDoApp extends React.Component {
    state = {
      tasks: [
        {taskText: '', done: false, editing: false}
      ]
    }

  handleDeleteTasks = () => {
    this.setState(() => ({ tasks: [] }));
  };
  handleDeleteTask = (taskToRemove) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => taskToRemove !== task.taskText)
    }));
  };

  handleEdit = (taskToEdit) => {

  }

  toggleEditing = (task) => {
    console.log(this.state.editing)
    const currentEditing = this.state.editing;
    this.setState({editing: !currentEditing})
  }

  handleDone = (taskToBeDone) => {
    let tempList = this.state.tasks;
      for(let i in tempList) {
        if(tempList[i].taskText === taskToBeDone.taskText) {
          tempList[i].done = !taskToBeDone.done
        }
      }
      this.setState({
        tasks: tempList
      })
  };
  
  handleAddTask = (task) => {
    if (!task) {
      return 'Enter valid value to add task';
    } 
    // else if (this.state.tasks.indexOf(task) > -1) {
    //   return 'This task already exists';
    // }

    this.setState((prevState) => ({ 
      tasks: prevState.tasks.concat({taskText: task, done: false, editing: false}) 
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
    console.log(prevState !== this.state);
    if (prevState.tasks.length !== this.state.tasks.length || prevState != this.state) {
      const json = JSON.stringify(this.state.tasks);
      localStorage.setItem('tasks', json);
      console.log('saving data');
    }
    console.log(localStorage)
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
              handleDone={this.handleDone}
              handleEdit={this.handleEdit}
              toggleEditing={this.toggleEditing}
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