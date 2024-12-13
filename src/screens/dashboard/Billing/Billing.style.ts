import {StyleSheet} from 'react-native';
import {theme} from '../../../themes/default';
import platform from '../../../../utils/platform';
import DeviceInfo from 'react-native-device-info';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colorWhite,
    // marginBottom: '50%',
  },
  quantityContainer: {
    flexDirection: 'row',
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    // marginVertical: 10,
    // backgroundColor: 'red',
  },
  quantityButtonImage: {
    // resizeMode: 'contain',
    height: DeviceInfo.isTablet() ? 35 : 25,
    width: DeviceInfo.isTablet() ? 35 : 25,
    tintColor: theme.colorGp,
  },
  quantityTextContainer: {
    // alignItems: 'center',
    // marginHorizontal: '1%',
    // justifyContent: 'center',
    // alignSelf: 'flex-start',
  },
  priceInputText: {
    height: 30,
    borderBottomWidth: 1,
    fontSize: DeviceInfo.isTablet() ? 25 : 16,
    backgroundColor: theme.colorWhite,
  },

  //Price

  priceContainer: {
    height: 'auto',
    padding: DeviceInfo.isTablet() ? '3%' : '5%',
    // backgroundColor: theme.backgroundGray,
    width: '100%',
    zIndex: 999,
  },
  priceRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: '1%',
  },
  priceSubtotalRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: '2%',
  },
  priceRowRText: {
    fontSize: platform.getFontSize() + 7,
    color: theme.colorBlack,
  },
  priceRowBText: {
    fontSize: platform.getFontSize() + 8,
    color: theme.colorBlack,
    fontWeight: '600',
  },

  orderSearchSection: {
    width: '95%',
    alignSelf: 'center',
    backgroundColor: theme.colorWhite,
    marginTop: '3%',
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 100,
    borderColor: theme.colorGray,
  },
  orderSearchIcon: {
    width: '10%',
    height: '70%',
    opacity: 0.5,
    resizeMode: 'contain',
  },
  orderSearchInput: {
    width: '85%',
    height: 40,
    backgroundColor: theme.colorWhite,
  },
});
