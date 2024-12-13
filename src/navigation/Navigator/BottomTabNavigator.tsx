import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import {theme} from '../../themes/default';
import DeviceInfo from 'react-native-device-info';
import imagePath from '../../constants/imagePath';
import {StockScreen} from '../../screens/dashboard/Stock';
import {BillingScreen} from '../../screens/dashboard/Billing';

const window = Dimensions.get('screen');

export const BottomTabNavigator = () => {
  const BottomTab = createBottomTabNavigator();

  const TabIcon = () => {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Coming Soon...</Text>
        {/* <ReviewDesign /> */}
      </View>
    );
  };

  let responsiveHeight = window.width / 20 + window.height / 20;

  if (window.width <= 375) {
    responsiveHeight = responsiveHeight - 50;
  }

  return (
    <BottomTab.Navigator
      initialRouteName="Billing"
      screenOptions={{
        tabBarStyle: {height: responsiveHeight},
        tabBarActiveTintColor: theme.colorBlack,
        tabBarInactiveTintColor: theme.colorGray,
        tabBarLabelStyle: {
          paddingBottom: 8,
        },
      }}>
      <BottomTab.Screen
        name="Billing"
        // children={() => <HomeNavigator />}
        component={BillingScreen}
        options={{
          headerTitle: 'INVENTORY',
          headerTitleAlign: 'center',
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => (
            <Image
              source={imagePath.tabIconBilling}
              style={[
                {width: '80%', height: '80%'},
                focused ? {opacity: 1} : {opacity: 0.2},
              ]}
              resizeMode="contain"
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Stock"
        // children={() => <HomeNavigator />}
        component={StockScreen}
        options={{
          headerTitle: 'INVENTORY',
          headerTitleAlign: 'center',
          // headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => (
            <Image
              source={imagePath.tabIconInventory}
              style={[
                {width: '80%', height: '80%'},
                focused ? {opacity: 1} : {opacity: 0.2},
              ]}
              resizeMode="contain"
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
