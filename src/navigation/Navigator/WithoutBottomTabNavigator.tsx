import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AddStockScreen} from '../../screens/dashboard/Stock';
import {SaveOrderScreen} from '../../screens/dashboard/Billing/SaveOrder';
import {OrderSummary} from '../../screens/dashboard/Billing/OrderSummary';

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

      <Stack.Screen
        name="SaveOrderScreen"
        key={Math.random()}
        component={SaveOrderScreen}
        options={{
          headerBackVisible: true,
          headerTitle: 'Save Order',
          // headerShown: false,
          headerTitleAlign: 'center',
          animation: 'default',
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name="OrderSummary"
        key={Math.random()}
        component={OrderSummary}
        options={{
          headerBackVisible: true,
          headerTitle: 'Order Details',
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
