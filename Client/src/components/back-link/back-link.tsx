import * as React from 'react';
import { NavLink } from 'react-router-dom';

import './back-link.css';

/** Компонент правой панели навигации. */
export const BackLink = () => {
  return (
    <div className='back-link'>
      <NavLink to='/'>Вернуться к списку</NavLink>
    </div>
  );
};