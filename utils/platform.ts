import {Dimensions, Platform} from 'react-native';
const window = Dimensions.get('window');

const isIOS = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';
const getPlatformType = () => {
  return Platform.OS;
};

const getFontSize = () => {
  let fontSize = 10;
  let m_iDeviceType = 1;
  let width = window.width;

  if (width <= 480) {
    fontSize = width / (40.0 * m_iDeviceType); //= 8            8,
  } else if (width <= 790) {
    fontSize = width / (38.0 * m_iDeviceType); //= 10           10,
  } else if (width <= 1090) {
    fontSize = width / (34 * m_iDeviceType); //= 10           10,
  } else if (width <= 1440) {
    fontSize = width / (35.0 * m_iDeviceType); //= 10           10,
  } else if (width <= 1600) {
    fontSize = width / (35.5 * m_iDeviceType); //= 10           10,
  } else if (width <= 2200) {
    fontSize = width / (28.5 * m_iDeviceType); //= 10           10,
  } else {
    fontSize = width / (24.6 * m_iDeviceType); //= 13.008130    13,
  }

  return fontSize;
};

export default {
  isIOS,
  isAndroid,
  getPlatformType,
  getFontSize,
};
