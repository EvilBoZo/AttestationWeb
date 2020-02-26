import * as React from 'react';
import { autobind } from 'core-decorators';
import { NavLink } from 'react-router-dom';

import TaskItem from '../task-item/task-item';
import SideBar from '../nav-bar/nav-bar';
import Task from '../../types/task';
import { getCompletedTasks } from '../../api';

interface ITasksCompletedProps { }

interface ITasksCompletedState {
  tasks: Array<Task>;
}

/**
 * Компонент для отображения выполненных задач.
 */
@autobind
export default class TasksCompleted extends React.Component<ITasksCompletedProps, ITasksCompletedState> {
  constructor(props: ITasksCompletedProps) {
    super(props);
    this.state = { tasks: [] };
  }

  public async componentWillMount() {
    this.setState({ tasks: await getCompletedTasks() });
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
          <div className='back-link'>
            <NavLink to='/'>Вернуться к списку</NavLink>
          </div>
        </div>
        <div className='explorer'>
          <div className='main-content'>
            <div className='main-content'>
              {tasksArea}
            </div>
          </div>
          <SideBar />
        </div>
      </div>
    );
  }
}
