import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {HOME_TAB_NAVIGATOR} from './routes';
import Home from 'screens/Home/Home';

const HomeTabNavigator = () => {
  type HomeTabParamList = {
    HOME: undefined;
  };

  const Tab = createBottomTabNavigator<HomeTabParamList>();

  //TODO: Add screens
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name={HOME_TAB_NAVIGATOR.HOME}
        component={Home}
      />
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;
