import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import MovieDetails from '../pages/MovieDetails';

const Stack = createStackNavigator();

const AppRoutes: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: '#ffffff',
      },
    }}
    initialRouteName="Dashboard"
  >
    <Stack.Screen name="Dashboard" component={Dashboard} />
    <Stack.Screen name="MovieDetails" component={MovieDetails} />
  </Stack.Navigator>
);

export default AppRoutes;
