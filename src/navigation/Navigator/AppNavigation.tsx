import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BottomTabNavigator} from './BottomTabNavigator';
import WithoutBottomTabNavigator from './WithoutBottomTabNavigator';
const AppStack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer key={Math.random()}>
      <AppStack.Navigator>
        <AppStack.Screen
          name="BottomTabs"
          component={BottomTabNavigator}
          options={{
            headerShown: false,
            animation: 'none',
            gestureEnabled: false,
          }}
        />
        <AppStack.Screen
          name="WithoutBottomTabs"
          component={WithoutBottomTabNavigator}
          options={{
            headerShown: false,
            animation: 'none',
            gestureEnabled: false,
          }}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};
