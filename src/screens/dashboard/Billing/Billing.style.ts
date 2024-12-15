import {StyleSheet} from 'react-native';
import {theme} from '../../../themes/default';
import platform from '../../../../utils/platform';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colorWhite,
    borderTopWidth: 1,
    borderColor: theme.colorBorder,
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
    height: 30,
    width: 30,
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
    fontSize: 16,
    backgroundColor: theme.colorWhite,
  },

  //Price

  priceContainer: {
    height: 'auto',
    padding: '5%',
    // backgroundColor: theme.backgroundGray,
    width: '100%',
    zIndex: 999,
  },
  priceRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: '1%',
    marginTop: '2%',
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

  //Save Order
  bodyContainer: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    // justifyContent: 'center',
    color: theme.colorBlack,
    borderWidth: 1,
    borderColor: theme.colorWhite,
    borderTopWidth: 0,
  },
  inputGroup: {
    marginTop: '7%',
    width: '93%',
  },
  inputFields: {marginBottom: '2%'},
  FieldTopTitle: {
    marginLeft: '1%',
    fontSize: 12,
    fontWeight: '600',
  },
  flexRowDirection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginTop: '1%',
  },
  usernameInputText: {
    backgroundColor: theme.colorWhite,
    height: 20,
    width: '100%',
    fontSize: 16,
  },
  inputTextView: {
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    // marginTop: '5%',
  },
  fieldLabelText: {
    fontSize: platform.getFontSize() + 6,
    color: theme.colorGray,
    // backgroundColor: 'red',
  },
  dropdownItem: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  dropdownItemText: {
    fontSize: platform.getFontSize() + 4,
    color: theme.colorBlack,
    textAlign: 'center',
    fontWeight: '400',
  },

  shippingItemsContainer: {
    width: '95%',
    margin: '3%',
    // borderColor: theme.colorBorder,
    borderWidth: 1,
    borderRadius: 10,
  },
  orderSummaryContainer: {
    width: '100%',
    backgroundColor: theme.colorBlack,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  orderSummaryText: {
    color: theme.colorWhite,
    margin: '2%',
    fontWeight: '600',
    fontSize: platform.getFontSize() + 5,
  },
  shippingItem: {
    flexDirection: 'row',
    width: '90%',
    marginVertical: '2%',
    marginLeft: '3%',
    // alignSelf: 'center',
  },
  itemDetailsContainer: {width: '85%', marginLeft: '5%'},
  itemImageContainer: {width: '10%'},
  itemHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
  },
  itemNameText: {
    width: '80%',
    alignSelf: 'flex-end',
    marginRight: '3%',
    fontSize: platform.getFontSize() + 4,
    fontWeight: '500',
    color: theme.colorBlack,
  },
  itemQtyContainer: {marginVertical: '2%'},
  itemQtyHeaderText: {
    fontSize: platform.getFontSize() + 1,
    color: theme.colorBlack,
  },
  itemQtyText: {
    fontSize: platform.getFontSize() + 4,
    color: theme.colorBlack,
    fontWeight: '500',
  },
});
