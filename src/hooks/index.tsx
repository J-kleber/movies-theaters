import React from 'react';
import { MovieProvider } from './movies';

const AppProvider: React.FC = ({ children }) => {
  return <MovieProvider>{children}</MovieProvider>;
};

export default AppProvider;
