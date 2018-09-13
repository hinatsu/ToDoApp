class ToDoApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteTasks = this.handleDeleteTasks.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.state = {
      tasks: props.tasks
    };
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

  handleDeleteTasks() {
    this.setState(() => ({ tasks: [] }));
  }
  handleDeleteTask(taskToRemove) {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => taskToRemove !== task)
    }));
  }
 
 
 
 
 
  handleAddTask(task) {
    if (!task) {
      return 'Enter valid value to add task';
    } else if (this.state.tasks.indexOf(task) > -1) {
      return 'This task already exists';
    }

    this.setState((prevState) => ({ 
      tasks: prevState.tasks.concat(task) 
    }));
  }
  render() {
    const subtitle = 'Manage your tasks here!';

    return (
      <div>
        <Header subtitle={subtitle} />    
        <Tasks 
          tasks={this.state.tasks}
          handleDeleteTasks={this.handleDeleteTasks}
          handleDeleteTask={this.handleDeleteTask}
        />
        <AddTask 
          handleAddTask={this.handleAddTask}
        />
      </div>
    );
  }
}

ToDoApp.defaultProps = {
  tasks: []
};

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
  );
};

Header.defaultProps = {
  title: 'To Do Apppp'
};

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

const Task = (props) => {
  return (
    <div>
      {props.taskText}
      <button 
        onClick={(e) => {
          props.handleDeleteTask(props.taskText);
        }}
      >
        Remove
      </button>
    </div>
  ); 
};

class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.state = {
      error: undefined
    }
  }
  handleAddTask(e) {
    e.preventDefault();

    const task = e.target.elements.task.value.trim();
    const error = this.props.handleAddTask(task);

    this.setState(() => ({ error }));

    if (!error) {
      e.target.elements.task.value = '';
    }
  }
  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddTask}>
          <input type="text" name="task" />
          <button>Add Task</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(
  <ToDoApp />, document.getElementById('app')
);