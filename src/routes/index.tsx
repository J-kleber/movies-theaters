import React from 'react';
import { StatusBar } from 'react-native';
import AppRoutes from './app.routes';

const Routes: React.FC = () => {
  return (
    <>
      <StatusBar hidden />
      <AppRoutes />
    </>
  );
};

export default Routes;
