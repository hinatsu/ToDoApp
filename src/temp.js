console.log('heloloo');

const app = {
  title: 'To Do App',
  subtitle: 'Manage what to do!',
  tasks: []
};

const onFormSubmit = (e) => {
  e.preventDefault();

  console.log('form submitted!');
  const task = e.target.elements.task.value;

  if (task) {
    app.tasks.push(task);
    e.target.elements.task.value = '';
    render();
  }
};

const onRemoveAll = () => {
  app.tasks = [];
  render();
};

const appRoot = document.getElementById('app');


const render = () => {
  const template = (
    <div>
      <h1>{app.title}</h1>
      {app.subtitle && <p>{app.subtitle}</p>}
      <p>{app.tasks.length > 0 ? 'Here are what to do' : 'No tasks'}</p>
      <p>{app.tasks.length}</p>
        <ol>
          {
            app.tasks.map((task) => <li key={task}>{task}</li>)
          }
        </ol>
        <form onSubmit={onFormSubmit}>
          <input type="text" name="task" />
          <button>Add your task</button>
        </form>
        <button onClick={onRemoveAll}>Remove all the tasks</button>
    </div>
  );

  ReactDOM.render(template, appRoot);
}

render();