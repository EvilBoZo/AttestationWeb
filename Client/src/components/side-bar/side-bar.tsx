import * as React from 'react';
import { NavLink } from 'react-router-dom';

import './side-bar.css';

/**
 * Компонент правой панели навигации.
 */
export const SideBar = () => {
  return (
    <div className='side-bar'>
      <div className='side-bar__item'>
        <p>Сортировать</p>
      </div>
      <div className='side-bar__item'>
        <NavLink to='/sort/importance'>По важности</NavLink>
      </div>
      <div className='side-bar__item'>
        <NavLink to='/sort/completed'>По выполненности</NavLink>
      </div>
    </div>
  );
};