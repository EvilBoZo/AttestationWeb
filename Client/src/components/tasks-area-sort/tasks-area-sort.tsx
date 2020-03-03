import * as React from 'react';
import { autobind } from 'core-decorators';
import Task from 'src/types/task';

import TaskItemsList from '../task-items-list/task-items-list';
import { BackLink } from '../back-link/back-link';

interface ITasksAreaSortProps {
  tasks: Array<Task>;
  refreshTasks(): Promise<void>;
}

/** Корневой компонент. */
@autobind
export default class TasksAreaSort extends React.Component<ITasksAreaSortProps> {

  /** @inheritdoc */
  constructor(props: ITasksAreaSortProps) {
    super(props);
  }

  /** @inheritdoc */
  public render(): React.ReactNode {
    return (
      <div>
        <BackLink />
        <TaskItemsList tasks={this.props.tasks} refreshTasks={this.props.refreshTasks} />
      </div>
    );
  }
}