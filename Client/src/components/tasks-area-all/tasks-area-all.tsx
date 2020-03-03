import * as React from 'react';
import { autobind } from 'core-decorators';
import Task from 'src/types/task';

import AddBar from '../add-bar/add-bar';
import TaskItemsList from '../task-items-list/task-items-list';

interface ITasksAreaAllProps {
  tasks: Array<Task>;
  refreshTasks(): Promise<void>;
  addNewTask(text: string, isImportant: boolean): Promise<void>;
}

/** Корневой компонент. */
@autobind
export default class TasksAreaAll extends React.Component<ITasksAreaAllProps> {

  /** @inheritdoc */
  constructor(props: ITasksAreaAllProps) {
    super(props);
  }

  /** @inheritdoc */
  public render(): React.ReactNode {
    return (
      <div>
        <AddBar addNewTask={this.props.addNewTask} />
        <TaskItemsList tasks={this.props.tasks} refreshTasks={this.props.refreshTasks} />
      </div>
    );
  }
}