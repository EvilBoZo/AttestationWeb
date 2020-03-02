import * as React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { autobind } from 'core-decorators';

import Task from '../../types/task';
import { addTask, getCompletedTasks, getImportanceTasks, getTasks } from '../../api';
import TaskCard from '../task-card/task-card';
import AddBar from '../add-bar/add-bar';
import { BackLink } from '../back-link/back-link';
import TasksSelection from '../tasks-selection/tasks-selection';
import { SideBar } from '../side-bar/side-bar';

import './app.css';

interface IAppProps { }

interface IAppState {
  tasks: Array<Task>;
  importanceTasks: Array<Task>;
  completedTasks: Array<Task>;
  newTask: Task | null;
}

/** Корневой компонент. */
@autobind
export default class App extends React.Component<IAppProps, IAppState> {

  /** @inheritdoc */
  constructor(props: IAppProps) {
    super(props);
    this.state = { tasks: [], importanceTasks: [], completedTasks: [], newTask: null };
  }

  /** @inheritdoc */
  public async componentWillMount(): Promise<void> {
    await this.refreshTasks();
  }

  /** Обновить список задач. */
  private async refreshTasks(): Promise<void> {
    this.setState({
      tasks: await getTasks(),
      importanceTasks: await getImportanceTasks(),
      completedTasks: await getCompletedTasks()
    });
    if (this.state.tasks[0].id === 0) {
      const tasks = this.state.tasks;
      tasks.shift();
      this.setState({ tasks: tasks });
    }
  }

  /** Добавить новую задачу. */
  private async addNewTask(text: string, isImportant: boolean): Promise<void> {
    await addTask(text, isImportant);
    await this.refreshTasks();
  }

  /** @inheritdoc */
  public render(): React.ReactNode {
    return (
      <HashRouter>
        <div className='root'>
          <div className='header'>
            <Switch>
              <Route exact={true} path='/'>
                <AddBar addNewTask={this.addNewTask} />
              </Route>
              <Route
                path='/sort/importance'
                component={BackLink}
              />
              <Route
                path='/sort/completed'
                component={BackLink}
              />
              <Route
                path='/todo/:id'
                component={BackLink}
              />
            </Switch>
          </div>
          <div className='explorer'>
            <div className='main-content'>
              <Switch>
                <Route exact={true} path='/'>
                  <TasksSelection
                    tasks={this.state.tasks}
                    refreshTasks={this.refreshTasks}
                  />
                </Route>
                <Route path='/todo/:id'>
                  <TaskCard refreshTasks={this.refreshTasks} />
                </Route>
                <Route path='/sort/importance'>
                  <TasksSelection
                    tasks={this.state.importanceTasks}
                    refreshTasks={this.refreshTasks}
                  />
                </Route>
                <Route path='/sort/completed'>
                  <TasksSelection
                    tasks={this.state.completedTasks}
                    refreshTasks={this.refreshTasks}
                  />
                </Route>
              </Switch>
            </div>
            <SideBar />
          </div>
        </div>
      </HashRouter>
    );
  }
}
