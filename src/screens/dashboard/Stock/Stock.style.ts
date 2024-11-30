import {StyleSheet} from 'react-native';
import {theme} from '../../../themes/default';
import platform from '../../../../utils/platform';
import DeviceInfo from 'react-native-device-info';

export const styles = StyleSheet.create({
  accountButtonListContainer: {
    marginTop: 10,
    width: '100%',
    // height: '100%',
    // height: screen.height / 4,
    // backgroundColor: theme.colorWhite,
    borderColor: theme.colorBorder,
    // borderBottomWidth: 1,
    // borderTopWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  accountButtonContainer: {
    // backgroundColor: 'red',
    backgroundColor: theme.colorWhite,
    alignSelf: 'center',
    width: '95%',
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderWidth: 1,
    marginBottom: 10,
    borderRadius: 50,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitleText: {
    fontSize: platform.getFontSize() + 4,
    color: theme.colorBlack,
    marginLeft: 10,
  },
  listDivider: {
    // marginVertical: '3%',
    alignSelf: 'center',
    width: '92%',
    // height: '1%',
    // marginLeft: 45,
    borderWidth: 0.5,
    borderColor: theme.colorBorder,
  },
  sectionRightArrowContainer: {
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionRightArrow: {
    width: '60%',
    height: '60%',
    // tintColor: theme.colorBorder,
  },

  // add new stock screen style

  addNewStockContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: theme.colorWhite,
  },
  addNewStockView: {
    height: 'auto',
    borderTopWidth: 1,
    borderColor: theme.colorBorder,
    paddingTop: 10,
    // marginBottom: 40,
  },
  addNewItemButtonView: {
    width: 60, // Set the width of the circle
    height: 60, // Set the height of the circle
    borderRadius: 50, // Make it circular
    backgroundColor: theme.colorGp, // Change to your desired background color
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
    bottom: 0,
    right: 0,
    position: 'absolute',
    margin: '5%',
  },
  addNewItemButton: {
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
  },
  buttonText: {
    fontSize: platform.getFontSize() + 15,
    color: theme.colorWhite,
  },
  listItemContainer: {
    alignSelf: 'center',
    backgroundColor: theme.colorWhite,
    borderColor: 'lightgray',
    // marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    // flexDirection: 'row',
    width: '98%',
  },
  itemSliderBadgeText: {
    color: theme.colorLightBlack,
    fontSize: platform.getFontSize() + 18,
    textAlign: 'center',
  },
  listHeaderSliderText: {
    color: theme.colorGray,
    fontSize: platform.getFontSize() + 4,
    // textAlign: 'center',
    // fontWeight: '500',
  },
  listSliderText: {
    color: theme.colorBlack,
    fontSize: platform.getFontSize() + 5,
    // textAlign: 'center',
    fontWeight: '500',
  },
  listItemDetailSection: {
    width: '100%',
    // backgroundColor: 'red',
    justifyContent: 'flex-start',
    padding: 10,
    flexDirection: 'column',
    alignSelf: 'flex-start',
    height: 'auto',
  },
  sliderButtonContainer: {
    flex: 1,
    // height: '80%',
    marginRight: '2%',
    // marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  sliderDeleteButton: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.colorRed,
    backgroundColor: theme.colorRed,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  sliderButtonsContent: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  sliderImage: {
    alignSelf: 'center',
    height: 25,
    width: 25,
  },
  sliderText: {
    color: theme.colorWhite,
    fontSize: platform.getFontSize() + 1,
    textAlign: 'center',
    fontWeight: '500',
  },

  //Modal

  inputTextView: {
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    // marginTop: '5%',
  },
  usernameInputText: {
    backgroundColor: theme.colorWhite,
    height: 40,
    width: '100%',
    fontSize: DeviceInfo.isTablet() ? 25 : 16,
  },
  loginButton: {
    width: '100%',
    height: DeviceInfo.isTablet() ? 60 : 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
    marginBottom: '3%',
    borderRadius: 20,
    backgroundColor: theme.colorGp,
  },
  loginButtonText: {
    color: theme.colorBlack,
    fontWeight: '600',
    fontSize: DeviceInfo.isTablet() ? 25 : 16,
  },
});
