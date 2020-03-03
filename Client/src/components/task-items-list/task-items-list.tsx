import * as React from 'react';
import { autobind } from 'core-decorators';

import TaskItem from '../task-item/task-item';
import Task from '../../types/task';

import './task-items-list.css';

interface ITaskItemListProps {
  tasks: Array<Task>;
  refreshTasks(): Promise<void>;
}

/** Компонент для отображения выполненных задач. */
@autobind
export default class TasksSelection extends React.Component<ITaskItemListProps> {

  /** @inheritdoc */
  constructor(props: ITaskItemListProps) {
    super(props);
  }

  /** @inheritdoc */
  public render(): React.ReactNode {
    let taskItemList = <ul />;
    let taskItem = <li />;
    if (this.props.tasks !== null) {
      taskItemList = <ul>{
        this.props.tasks.map(task => {
          if (task.isImportant) {
            taskItem =
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
            taskItem =
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
          return taskItem;
        })
      }</ul>;
    }
    return (
      <div className='task-items-list'>
        {taskItemList}
      </div>
    );
  }
}
