import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MAIN_STACK_NAVIGATOR} from './routes';
import HomeTabNavigator from './HomeTabNavigator';
import {SendScreen, ReceiveScreen} from 'screens';

const MainStackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={MAIN_STACK_NAVIGATOR.HOME_TAB_NAVIGATOR}
        component={HomeTabNavigator}
      />
       <Stack.Screen
        name={MAIN_STACK_NAVIGATOR.SEND_SCREEN}
        component={SendScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={MAIN_STACK_NAVIGATOR.RECEIVE_SCREEN}
        component={ReceiveScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
