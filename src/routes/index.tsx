import React from 'react';
import { StatusBar } from 'react-native';
import { useMovie } from '../hooks/movies';
import AppRoutes from './app.routes';
import Loading from '../components/Loading';

const Routes: React.FC = () => {
  const { loading } = useMovie();

  if (loading) {
    return (
      <>
        <StatusBar translucent backgroundColor={'#ffffff00'} animated />
        <Loading />
      </>
    );
  }

  return (
    <>
      <StatusBar translucent backgroundColor={'#ffffff00'} animated />
      <AppRoutes />
    </>
  );
};

export default Routes;
