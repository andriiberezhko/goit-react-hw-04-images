import React from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { TailSpin } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="loader">
      <TailSpin height="100" width="100" color="#3f51b5" ariaLabel="loading" />
    </div>
  );
};

export default Loader;
