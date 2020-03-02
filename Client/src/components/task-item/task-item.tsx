import * as React from 'react';
import { autobind } from 'core-decorators';
import { NavLink } from 'react-router-dom';

import Task from '../../types/task';
import { deleteTask, editTask } from '../../api';

import './task-item.css';

interface ITaskItemProps {
  id: number;
  text: string;
  isImportant: boolean;
  isCompleted: boolean;
  isDeleted: boolean;
  refreshTasks(): Promise<void>;
}

interface ITaskItemState {
  text: string;
  isImportant: boolean;
  isCompleted: boolean;
  isDeleted: boolean;
}

/** Компонент элемента списка задач. */
@autobind
export default class TaskItem extends React.Component<ITaskItemProps, ITaskItemState> {

  /** @inheritdoc */
  constructor(props: ITaskItemProps) {
    super(props);
    this.state = { text: this.props.text, isImportant: this.props.isImportant, isCompleted: this.props.isCompleted, isDeleted: false };
  }

  /** Обработчик события нажатия кнопки "Выполнить". */
  private async handleCompletedClick(): Promise<void> {
    let isCompleted: boolean;
    if (this.state.isCompleted)
      isCompleted = false;
    else
      isCompleted = true;
    this.setState({ isCompleted: isCompleted });
    await editTask(new Task(this.props.id, this.state.text, this.state.isImportant, isCompleted, this.state.isDeleted));
    await this.props.refreshTasks();
  }

  /** Обработчик события нажатия кнопки "Удалить". */
  private async handleDeletedClick(): Promise<void> {
    await deleteTask(this.props.id);
    await this.props.refreshTasks();
  }

  /** @inheritdoc */
  public render(): React.ReactNode {
    return (
      <div className='task-item'>
        <div className='task-item-info'>
          <div className='task-item-info__item'>
            <p>{this.props.id}</p>
          </div>
          <div className='task-item-info__item'>
            <NavLink to={'/todo/' + this.props.id}>{this.state.isCompleted ? <del>{this.props.text}</del> : this.props.text}</NavLink>
          </div>
        </div>
        <div className='task-item-buttons'>
          <div className='task-item-buttons__item'>
            <input
              type='button'
              value={this.state.isCompleted ? 'Вернуть в работу' : 'Выполнить'}
              onClick={this.handleCompletedClick}
            />
          </div>
          <div className='task-item-buttons__item'>
            <input
              type='button'
              value='Удалить'
              onClick={this.handleDeletedClick}
            />
          </div>
        </div>
      </div>
    );
  }
}