import {Dimensions, StyleSheet} from 'react-native';
import platform from '../../../utils/platform';
import DeviceInfo from 'react-native-device-info';
import {theme} from '../../themes/default';
const screen = Dimensions.get('screen');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '95%',
    alignSelf: 'center',
    backgroundColor: theme.colorWhite,
    marginTop: 10,
    borderColor: theme.colorBorder,
    borderWidth: 1,
    borderRadius: 10,
  },
  headerView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 15,
    marginTop: 20,
    marginBottom: 20,
  },
  bodyContent: {
    marginLeft: 15,
    marginBottom: 15,
  },
  headerTitleText: {
    fontSize: platform.getFontSize() + 5,
    fontWeight: 'bold',
    color: theme.colorBlack,
  },
  expandRightArrow: {
    width: 15,
    height: 15,
  },
});
