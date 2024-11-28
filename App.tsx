import {useEffect} from 'react';
import {StatusBar, Text, View} from 'react-native';
import {AppNavigator} from './src/navigation/Navigator/AppNavigation';
import {LogBox} from 'react-native';
// LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const App = () => {
  return <AppNavigator />;
};

export default App;
