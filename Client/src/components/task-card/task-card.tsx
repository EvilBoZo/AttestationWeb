import * as React from 'react';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import { autobind } from 'core-decorators';

import SideBar from '../nav-bar/nav-bar';
import Task from '../../types/task';
import { editTask, getTaskById } from '../../api';

import './task-card.css';

interface ITaskCardParams {
  id: string;
}

interface ITaskCardProps extends RouteComponentProps<ITaskCardParams> { }

interface ITaskCardState {
  task: Task;
  text: string;
  isImportant: boolean;
  isCompleted: boolean;
}

/**
 * Компонент карточки задачи.
 */
@autobind
export default class TaskCard extends React.Component<ITaskCardProps, ITaskCardState> {
  constructor(props: ITaskCardProps) {
    super(props);
    this.state = { task: new Task(0, '', false, false, false), text: '', isImportant: false, isCompleted: false };
  }

  public async componentWillMount() {
    // tslint:disable-next-line: radix
    this.setState({ task: await getTaskById(parseInt(this.props.match.params.id)) });
    this.setState({ text: this.state.task.text, isImportant: this.state.task.isImportant, isCompleted: this.state.task.isCompleted });
  }

  private handleTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ text: event.target.value });
  }

  private handleImportantChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ isImportant: event.target.checked });
  }

  private handleCompletedChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ isCompleted: event.target.checked });
  }

  private async handleSubmit(): Promise<void> {
    const task = new Task(this.state.task.id, this.state.text, this.state.isImportant, this.state.isCompleted, false);
    this.setState({ task: task });
    try {
      await editTask(task);
    }
    catch (error) {
      alert(error.message);
    }
  }

  public render(): React.ReactNode {
    return (
      <div className='root'>
        <div className='header'>
          <div className='back-link'>
            <NavLink to='/'>Вернуться к списку</NavLink>
          </div>
        </div>
        <div className='explorer'>
          <div className='main-content'>
            <div>
              <div className='task-card-item'>
                <div>
                  <p>Текст задачи</p>
                </div>
                <div>
                  <input
                    type='text'
                    value={this.state.text}
                    onChange={this.handleTextChange}
                  />
                </div>
              </div>
              <div className='task-card-item'>
                <div>
                  <input
                    type='checkbox'
                    checked={this.state.isImportant}
                    onChange={this.handleImportantChange}
                  />
                </div>
                <div>
                  <p>Задача важная</p>
                </div>
              </div>
              <div className='task-card-item'>
                <div>
                  <input
                    type='checkbox'
                    checked={this.state.isCompleted}
                    onChange={this.handleCompletedChange}
                  />
                </div>
                <div>
                  <p>Задача выполнена</p>
                </div>
              </div>
              <div className='task-card-item'>
                <div>
                  <input
                    type='button'
                    value='Сохранить'
                    onClick={this.handleSubmit}
                  />
                </div>
              </div>
            </div>
          </div>
          <SideBar />
        </div>
      </div>
    );
  }
}