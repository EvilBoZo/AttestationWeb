import * as React from 'react';
import { autobind } from 'core-decorators';

import TaskItem from '../task-item/task-item';
import SideBar from '../nav-bar/nav-bar';
import Task from '../../types/task';
import { addTask, deleteTasks, getTasks } from '../../api';

interface ITasksProps { }

interface ITasksState {
  text: string;
  // tslint:disable-next-line: no-any
  isImportant: any;
  tasks: Array<Task>;
}

/**
 * Компонент для отображения списка всех задач.
 */
@autobind
export default class Tasks extends React.Component<ITasksProps, ITasksState> {

  constructor(props: ITasksProps) {
    super(props);
    this.state = { text: '', isImportant: false, tasks: [] };
  }

  public componentWillMount() {
    this.refteshTasks();
  }

  private handleTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ text: event.target.value });
  }

  private handleCheckChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ isImportant: event.target.checked });
  }

  private async handleSubmit(): Promise<void> {
    try {
      await addTask(this.state.text, this.state.isImportant);
      this.refteshTasks();
    }
    catch (error) {
      alert(error.message);
    }
  }

  private async refteshTasks(): Promise<void> {
    let tasks: Array<Task> = await getTasks();
    const ids: Array<number> = [];
    tasks.forEach(task => {
      if (task.isDeleted) {
        ids.push(task.id);
      }
    });
    if (ids.length > 0) {
      await deleteTasks(ids);
    }
    this.setState({ tasks: await getTasks() });
    if (this.state.tasks[0].id === 0) {
      tasks = this.state.tasks;
      tasks.shift();
      this.setState({ tasks: tasks });
    }
  }

  public render(): React.ReactNode {
    let tasksArea = <ul />;
    let taskArea = <li />;
    if (this.state.tasks !== null) {
      tasksArea = <ul>{
        this.state.tasks.map(task => {
          if (task.isImportant) {
            taskArea = <li key={task.id}><TaskItem Id={task.id} Text={task.text} IsImportant={task.isImportant} IsCompleted={task.isCompleted} IsDeleted={task.isDeleted} /></li>;
          }
          else {
            taskArea = <li key={task.id} className='no-marker'><TaskItem Id={task.id} Text={task.text} IsImportant={task.isImportant} IsCompleted={task.isCompleted} IsDeleted={task.isDeleted} /></li>;
          }
          return taskArea;
        })
      }</ul>;
    }
    return (
      <div className='root'>
        <div className='header'>
          <div className='add-bar'>
            <div>
              <p>Текст новой задачи</p>
            </div>
            <div>
              <input
                type='text'
                value={this.state.text}
                onChange={this.handleTextChange}
              />
            </div>
            <div>
              <input
                type='checkbox'
                checked={this.state.isImportant}
                onChange={this.handleCheckChange}
              />
            </div>
            <div>
              <p>Задача важная</p>
            </div>
            <div>
              <input
                type='button'
                value='Добавить'
                onClick={this.handleSubmit}
              />
            </div>
          </div>
        </div>
        <div className='explorer'>
          <div className='main-content'>
            {tasksArea}
          </div>
          <SideBar />
        </div>
      </div>
    );
  }
}
