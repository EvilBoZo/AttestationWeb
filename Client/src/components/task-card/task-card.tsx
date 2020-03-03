import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { autobind } from 'core-decorators';

import Task from '../../types/task';
import { editTask, getTaskById } from '../../api';
import { BackLink } from '../back-link/back-link';

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
    await editTask(task);
    await this.props.refreshTasks();
  }

  /** @inheritdoc */
  public render(): React.ReactNode {
    return (
      <div>
        <div className='header'>
          <BackLink />
        </div>
        <div className='flexible-column'>
          <label className='flexible-column__item'>
            <span>Текст задачи: </span>
            <input
              type='text'
              value={this.state.text}
              onChange={this.handleTextChange}
            />
          </label>
          <label className='flexible-column__item'>
            <input
              type='checkbox'
              checked={this.state.isImportant}
              onChange={this.handleImportantChange}
            />
            <span> - Задача важная</span>
          </label>
          <label className='flexible-column__item'>
            <input
              type='checkbox'
              checked={this.state.isCompleted}
              onChange={this.handleCompletedChange}
            />
            <span> - Задача выполнена</span>
          </label>
          <div className='flexible-column__item'>
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