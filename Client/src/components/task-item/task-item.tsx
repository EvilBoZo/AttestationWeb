import * as React from 'react';
import { autobind } from 'core-decorators';
import { NavLink } from 'react-router-dom';

import Task from '../../types/task';
import { editTask } from '../../api';

import './task-item.css';

interface ITaskItemProps {
  Id: number;
  Text: string;
  IsImportant: boolean;
  IsCompleted: boolean;
  IsDeleted: boolean;
}

interface ITaskItemState {
  Text: string;
  IsImportant: boolean;
  IsCompleted: boolean;
  IsDeleted: boolean;
}

/**
 * Компонент элемента списка задач.
 */
@autobind
export default class TaskItem extends React.Component<ITaskItemProps, ITaskItemState> {

  constructor(props: ITaskItemProps) {
    super(props);
    this.state = { Text: this.props.Text, IsImportant: this.props.IsImportant, IsCompleted: this.props.IsCompleted, IsDeleted: false };
  }

  private async HandleCompletedClick(): Promise<void> {
    let isCompleted: boolean;
    if (this.state.IsCompleted) {
      isCompleted = false;
      this.setState({ IsCompleted: isCompleted });
      this.setComplete(isCompleted);
    }
    else {
      isCompleted = true;
      this.setState({ IsCompleted: isCompleted });
      this.setComplete(isCompleted);
    }
  }

  private async HandleDeletedClick(): Promise<void> {
    let isDeleted: boolean;
    if (this.state.IsDeleted) {
      isDeleted = false;
      this.setState({ IsDeleted: isDeleted });
      this.setDelete(isDeleted);
    }
    else {
      isDeleted = true;
      this.setState({ IsDeleted: isDeleted });
      this.setDelete(isDeleted);
    }
  }

  private async setComplete(isCompleted: boolean): Promise<void> {
    try {
      await editTask(new Task(this.props.Id, this.state.Text, this.state.IsImportant, isCompleted, this.state.IsDeleted));
    }
    catch (error) {
      alert(error.message);
    }
  }

  private async setDelete(isDeleted: boolean): Promise<void> {
    try {
      await editTask(new Task(this.props.Id, this.state.Text, this.state.IsImportant, this.state.IsCompleted, isDeleted));
    }
    catch (error) {
      alert(error.message);
    }
  }

  public render(): React.ReactNode {
    return (
      <div className='item'>
        <div className='item-text'>
          <NavLink to={'/todo/' + this.props.Id}>{this.state.IsCompleted ? <del>{this.props.Text}</del> : this.props.Text}</NavLink>
        </div>
        <div className='item-buttons'>
          <input
            type='button'
            value={this.state.IsCompleted ? 'Вернуть в работу' : 'Выполнить'}
            onClick={this.HandleCompletedClick}
          />
          <input
            type='button'
            value={!this.state.IsDeleted ? 'Удалить' : 'Восстановить'}
            onClick={this.HandleDeletedClick}
          />
        </div>
      </div>
    );
  }
}