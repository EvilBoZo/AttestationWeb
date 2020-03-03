import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { autobind } from 'core-decorators';

import Task from '../../types/task';
import { addTask, getCompletedTasks, getImportanceTasks, getTasks } from '../../api';
import TaskCard from '../task-card/task-card';
import { NotFound } from '../not-found/not-found';
import TasksAreaAll from '../tasks-area-all/tasks-area-all';
import TasksAreaSort from '../tasks-area-sort/tasks-area-sort';

interface ITasksAreaProps { }

interface ITasksAreaState {
  allTasks: Array<Task>;
  importanceTasks: Array<Task>;
  completedTasks: Array<Task>;
}

/** Корневой компонент. */
@autobind
export default class TasksArea extends React.Component<ITasksAreaProps, ITasksAreaState> {

  /** @inheritdoc */
  constructor(props: ITasksAreaProps) {
    super(props);
    this.state = { allTasks: [], importanceTasks: [], completedTasks: [] };
  }

  /** @inheritdoc */
  public async componentWillMount(): Promise<void> {
    await this.refreshTasks();
  }

  /** Обновить список задач. */
  private async refreshTasks(): Promise<void> {
    this.setState({
      allTasks: await getTasks(),
      importanceTasks: await getImportanceTasks(),
      completedTasks: await getCompletedTasks()
    });
    if (this.state.allTasks !== undefined)
      if (this.state.allTasks[0].id === 0) {
        const tasks = this.state.allTasks;
        tasks.shift();
        this.setState({ allTasks: tasks });
      }
  }

  /** Добавить новую задачу. */
  private async addNewTask(text: string, isImportant: boolean): Promise<void> {
    try {
      await addTask(text, isImportant);
      await this.refreshTasks();
    }
    catch (error) {
      alert(error.message);
    }
  }

  /** @inheritdoc */
  public render(): React.ReactNode {
    return (
      <div className='root__tasks-area'>
        <Switch>
          <Route exact={true} path='/'>
            <TasksAreaAll
              tasks={this.state.allTasks}
              refreshTasks={this.refreshTasks}
              addNewTask={this.addNewTask}
            />
          </Route>
          <Route path='/todo/:id'>
            <TaskCard refreshTasks={this.refreshTasks} />
          </Route>
          <Route path='/sort/importance'>
            <TasksAreaSort
              tasks={this.state.importanceTasks}
              refreshTasks={this.refreshTasks}
            />
          </Route>
          <Route path='/sort/completed'>
            <TasksAreaSort
              tasks={this.state.completedTasks}
              refreshTasks={this.refreshTasks}
            />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}
