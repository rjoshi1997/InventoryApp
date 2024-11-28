import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AddStockScreen} from '../../screens/dashboard/Stock';

export const WithoutBottomTabNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddStockScreen"
        key={Math.random()}
        component={AddStockScreen}
        options={{
          headerBackVisible: true,
          headerTitle: '',
          // headerShown: false,
          headerTitleAlign: 'center',
          animation: 'default',
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default WithoutBottomTabNavigator;
