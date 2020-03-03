import * as React from 'react';
import { autobind } from 'core-decorators';

import Task from '../../types/task';

import './add-bar.css';

interface ITasksProps {
  addNewTask(text: string, isImportant: boolean): Promise<void>;
}

interface ITasksState {
  text: string;
  isImportant: boolean;
  tasks: Array<Task>;
}

/** Компонент для отображения списка всех задач. */
@autobind
export default class AddBar extends React.Component<ITasksProps, ITasksState> {

  /** @inheritdoc */
  constructor(props: ITasksProps) {
    super(props);
    this.state = {
      text: '',
      isImportant: false,
      tasks: []
    };
  }

  /** Обработчик ввода текста. */
  private handleTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ text: event.target.value });
  }

  /** Обработчик установки флажка важности. */
  private handleCheckChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ isImportant: event.target.checked });
  }

  /** Обработчик нажатия кнопки "Enter" на клавиатуре. */
  private handleTextKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      this.handleSubmit();
    }
  }

  /** Обработчик нажатия кнопки "Добавить". */
  private async handleSubmit(): Promise<void> {
    await this.props.addNewTask(this.state.text, this.state.isImportant);
    this.setState({
      text: '',
      isImportant: false
    });
  }

  /** @inheritdoc */
  public render(): React.ReactNode {
    return (
      <div className='header flexible-row add-bar'>
        <label className='flexible-row__item'>
          <span>Текст новой задачи: </span>
          <input
            type='text'
            value={this.state.text}
            onChange={this.handleTextChange}
            onKeyPress={this.handleTextKeyPress}
          />
        </label>
        <label className='flexible-row__item'>
          <input
            type='checkbox'
            checked={this.state.isImportant}
            onChange={this.handleCheckChange}
          />
          <span> - Задача важная</span>
        </label>
        <div className='flexible-row__item'>
          <input
            type='button'
            value='Добавить'
            onClick={this.handleSubmit}
          />
        </div>
      </div>
    );
  }
}
