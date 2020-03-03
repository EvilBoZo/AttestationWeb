import * as React from 'react';

import { BackLink } from '../back-link/back-link';

import './not-found.css';

/** Компонент правой панели навигации. */
export const NotFound = () => {
  return (
    <div className='root__tasks-area'>
      <div className='header'>
        <BackLink />
      </div>
      <h1>Страница не найдена.</h1>
    </div>
  );
};