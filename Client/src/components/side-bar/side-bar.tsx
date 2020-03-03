import * as React from 'react';
import { NavLink } from 'react-router-dom';

/** Компонент правой панели навигации. */
export const SideBar = () => {
  return (
    <div className='root__side-bar'>
      <div className='header' />
      <div className='flexible-column flexible-column_colored'>
        <p className='flexible-column__item'>Сортировать</p>
        <NavLink className='flexible-column__item' to='/sort/importance'>По важности</NavLink>
        <NavLink className='flexible-column__item' to='/sort/completed'>По выполненности</NavLink>
      </div>
    </div>
  );
};