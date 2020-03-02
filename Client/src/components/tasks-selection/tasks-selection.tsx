import * as React from 'react';
import { autobind } from 'core-decorators';

import TaskItem from '../task-item/task-item';
import Task from '../../types/task';

import './tasks-selection.css';

interface ITasksSelectionProps {
  tasks: Array<Task>;
  refreshTasks(): Promise<void>;
}

/** Компонент для отображения выполненных задач. */
@autobind
export default class TasksSelection extends React.Component<ITasksSelectionProps> {

  /** @inheritdoc */
  constructor(props: ITasksSelectionProps) {
    super(props);
  }

  /** @inheritdoc */
  public render(): React.ReactNode {
    let tasksArea = <ul />;
    let taskArea = <li />;
    if (this.props.tasks !== null) {
      tasksArea = <ul>{
        this.props.tasks.map(task => {
          if (task.isImportant) {
            taskArea =
              <li key={task.id}>
                <TaskItem
                  id={task.id}
                  text={task.text}
                  isImportant={task.isImportant}
                  isCompleted={task.isCompleted}
                  isDeleted={task.isDeleted}
                  refreshTasks={this.props.refreshTasks}
                />
              </li>;
          }
          else {
            taskArea =
              <li
                key={task.id}
                className='no-marker'
              >
                <TaskItem
                  id={task.id}
                  text={task.text}
                  isImportant={task.isImportant}
                  isCompleted={task.isCompleted}
                  isDeleted={task.isDeleted}
                  refreshTasks={this.props.refreshTasks}
                />
              </li>;
          }
          return taskArea;
        })
      }</ul>;
    }
    return (
      <div className='tasks-selection'>
        {tasksArea}
      </div>
    );
  }
}
