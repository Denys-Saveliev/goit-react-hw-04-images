import React from 'react';
import s from './Loader.module.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { ThreeDots } from 'react-loader-spinner';

const Loader = () => (
  <div className={s.Loader}>
    <ThreeDots height="80" width="80" color="blue" ariaLabel="loading" />
  </div>
);

export default Loader;
