import { autobind } from 'core-decorators';

import TasksCompleted from '../tasks-completed/tasks-completed';
import { getImportanceTasks } from '../../api';

/**
 * Компонент для отображения важных задач.
 */
@autobind
export default class TasksImportance extends TasksCompleted {
  public async componentWillMount() {
    this.setState({ tasks: await getImportanceTasks() });
  }
}
