'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ToDoApp = function (_React$Component) {
  _inherits(ToDoApp, _React$Component);

  function ToDoApp(props) {
    _classCallCheck(this, ToDoApp);

    var _this = _possibleConstructorReturn(this, (ToDoApp.__proto__ || Object.getPrototypeOf(ToDoApp)).call(this, props));

    _this.handleDeleteTasks = _this.handleDeleteTasks.bind(_this);
    _this.handleAddTask = _this.handleAddTask.bind(_this);
    _this.handleDeleteTask = _this.handleDeleteTask.bind(_this);
    _this.state = {
      tasks: props.tasks
    };
    return _this;
  }

  _createClass(ToDoApp, [{
    key: 'componentDidMount',
    value: function componentDidMount() {

      try {
        var json = localStorage.getItem('tasks');
        var tasks = JSON.parse(json);

        if (tasks) {
          this.setState(function () {
            return { tasks: tasks };
          });
        }
      } catch (e) {
        //Do nothing
      }

      console.log("fetching data");
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.tasks.length !== this.state.tasks.length) {
        var json = JSON.stringify(this.state.tasks);
        localStorage.setItem('tasks', json);
        console.log('saving data');
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      console.log('componentWillUnmount');
    }
  }, {
    key: 'handleDeleteTasks',
    value: function handleDeleteTasks() {
      this.setState(function () {
        return { tasks: [] };
      });
    }
  }, {
    key: 'handleDeleteTask',
    value: function handleDeleteTask(taskToRemove) {
      this.setState(function (prevState) {
        return {
          tasks: prevState.tasks.filter(function (task) {
            return taskToRemove !== task;
          })
        };
      });
    }
  }, {
    key: 'handleAddTask',
    value: function handleAddTask(task) {
      if (!task) {
        return 'Enter valid value to add task';
      } else if (this.state.tasks.indexOf(task) > -1) {
        return 'This task already exists';
      }

      this.setState(function (prevState) {
        return {
          tasks: prevState.tasks.concat(task)
        };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var subtitle = 'Manage your tasks here!';

      return React.createElement(
        'div',
        null,
        React.createElement(Header, { subtitle: subtitle }),
        React.createElement(Tasks, {
          tasks: this.state.tasks,
          handleDeleteTasks: this.handleDeleteTasks,
          handleDeleteTask: this.handleDeleteTask
        }),
        React.createElement(AddTask, {
          handleAddTask: this.handleAddTask
        })
      );
    }
  }]);

  return ToDoApp;
}(React.Component);

ToDoApp.defaultProps = {
  tasks: []
};

var Header = function Header(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      null,
      props.title
    ),
    props.subtitle && React.createElement(
      'h2',
      null,
      props.subtitle
    )
  );
};

Header.defaultProps = {
  title: 'To Do Apppp'
};

var Tasks = function Tasks(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'button',
      { onClick: props.handleDeleteTasks },
      'Remove All Tasks'
    ),
    props.tasks.length === 0 && React.createElement(
      'p',
      null,
      'Add your task!'
    ),
    props.tasks.map(function (task) {
      return React.createElement(Task, {
        key: task,
        taskText: task,
        handleDeleteTask: props.handleDeleteTask
      });
    })
  );
};

var Task = function Task(props) {
  return React.createElement(
    'div',
    null,
    props.taskText,
    React.createElement(
      'button',
      {
        onClick: function onClick(e) {
          props.handleDeleteTask(props.taskText);
        }
      },
      'Remove'
    )
  );
};

var AddTask = function (_React$Component2) {
  _inherits(AddTask, _React$Component2);

  function AddTask(props) {
    _classCallCheck(this, AddTask);

    var _this2 = _possibleConstructorReturn(this, (AddTask.__proto__ || Object.getPrototypeOf(AddTask)).call(this, props));

    _this2.handleAddTask = _this2.handleAddTask.bind(_this2);
    _this2.state = {
      error: undefined
    };
    return _this2;
  }

  _createClass(AddTask, [{
    key: 'handleAddTask',
    value: function handleAddTask(e) {
      e.preventDefault();

      var task = e.target.elements.task.value.trim();
      var error = this.props.handleAddTask(task);

      this.setState(function () {
        return { error: error };
      });

      if (!error) {
        e.target.elements.task.value = '';
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        this.state.error && React.createElement(
          'p',
          null,
          this.state.error
        ),
        React.createElement(
          'form',
          { onSubmit: this.handleAddTask },
          React.createElement('input', { type: 'text', name: 'task' }),
          React.createElement(
            'button',
            null,
            'Add Task'
          )
        )
      );
    }
  }]);

  return AddTask;
}(React.Component);

ReactDOM.render(React.createElement(ToDoApp, null), document.getElementById('app'));
