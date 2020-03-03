import * as React from 'react';
import { HashRouter } from 'react-router-dom';
import { autobind } from 'core-decorators';

import TasksArea from '../tasks-area/tasks-area';
import { SideBar } from '../side-bar/side-bar';

import './app.css';

/** Корневой компонент. */
@autobind
export default class App extends React.Component {

  /** @inheritdoc */
  public render(): React.ReactNode {
    return (
      <HashRouter>
        <div className='root'>
          <TasksArea />
          <SideBar />
        </div>
      </HashRouter>
    );
  }
}
