import * as React from 'react';
import { NavLink } from 'react-router-dom';

import './nav-bar.css';

interface ISideBarProps { }

interface ISideBarState { }

/**
 * Компонент правой панели навигации.
 */
export default class SideBar extends React.Component<ISideBarProps, ISideBarState> {
  constructor(props: ISideBarProps) {
    super(props);
  }

  public render(): React.ReactNode {
    return (
      <div className='nav-bar'>
        <div>
          <p>Сортировать</p>
        </div>
        <div>
          <NavLink to='/sort/importance'>По важности</NavLink>
        </div>
        <div>
          <NavLink to='/sort/completed'>По выполненности</NavLink>
        </div>
      </div>
    );
  }
}