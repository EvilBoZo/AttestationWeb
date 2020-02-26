import * as React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import Tasks from '../tasks/tasks';
import TaskCard from '../task-card/task-card';
import TasksImportance from '../tasks-importance/tasks-importance';
import TasksCompleted from '../tasks-completed/tasks-completed';

/**
 * Корневой компонент.
 */
export default class App extends React.Component {
  public render(): React.ReactNode {
    return (
      <HashRouter>
        <div >
          <Route exact={true} path='/' component={Tasks} />
          <Route path='/sort/importance' component={TasksImportance} />
          <Route path='/sort/completed' component={TasksCompleted} />
          <Route path='/todo/:id' component={TaskCard} />
        </div>
      </HashRouter>
    );
  }
}
