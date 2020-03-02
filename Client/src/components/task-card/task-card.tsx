import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { autobind } from 'core-decorators';

import Task from '../../types/task';
import { editTask, getTaskById } from '../../api';

import './task-card.css';

interface ITaskCardParams {
  id: string;
}

interface ITaskCardProps extends RouteComponentProps<ITaskCardParams> {
  refreshTasks(): Promise<void>;
}

interface ITaskCardState {
  task: Task;
  text: string;
  isImportant: boolean;
  isCompleted: boolean;
}

/** Компонент карточки задачи. */
@autobind
class TaskCard extends React.Component<ITaskCardProps, ITaskCardState> {

  /** @inheritdoc */
  constructor(props: ITaskCardProps) {
    super(props);
    this.state = { task: new Task(0, '', false, false, false), text: '', isImportant: false, isCompleted: false };
  }

  /** @inheritdoc */
  public async componentWillMount() {
    this.setState({ task: await getTaskById(parseInt(this.props.match.params.id, 10)) });
    this.setState({ text: this.state.task.text, isImportant: this.state.task.isImportant, isCompleted: this.state.task.isCompleted });
  }

  /** Обработчик ввода текста. */
  private handleTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ text: event.target.value });
  }

  /** Обработчик установки флажка важности. */
  private handleImportantChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ isImportant: event.target.checked });
  }

  /** Обработчик установки флажка выполненности. */
  private handleCompletedChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ isCompleted: event.target.checked });
  }

  /** Обработчик нажати кнопки "Сохранить". */
  private async handleSubmit(): Promise<void> {
    const task = new Task(this.state.task.id, this.state.text, this.state.isImportant, this.state.isCompleted, false);
    this.setState({ task: task });
    try {
      await editTask(task);
      await this.props.refreshTasks();
    }
    catch (error) {
      alert(error.message);
    }
  }

  /** @inheritdoc */
  public render(): React.ReactNode {
    return (
      <div className='task-card'>
        <div className='task-card-item'>
          <div className='task-card-item__item'>
            <p>Текст задачи</p>
          </div>
          <div className='task-card-item__item'>
            <input
              type='text'
              value={this.state.text}
              onChange={this.handleTextChange}
            />
          </div>
        </div>
        <div className='task-card-item'>
          <div className='task-card-item__item'>
            <input
              type='checkbox'
              checked={this.state.isImportant}
              onChange={this.handleImportantChange}
            />
          </div>
          <div className='task-card-item__item'>
            <p>Задача важная</p>
          </div>
        </div>
        <div className='task-card-item'>
          <div className='task-card-item__item'>
            <input
              type='checkbox'
              checked={this.state.isCompleted}
              onChange={this.handleCompletedChange}
            />
          </div>
          <div className='task-card-item__item'>
            <p>Задача выполнена</p>
          </div>
        </div>
        <div className='task-card-item'>
          <div className='task-card-item__item'>
            <input
              type='button'
              value='Сохранить'
              onClick={this.handleSubmit}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(TaskCard);