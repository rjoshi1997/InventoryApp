import {StyleSheet} from 'react-native';
import platform from '../../../utils/platform';
import {theme} from '../../themes/default';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.transparent,
  },
  modalView: {
    backgroundColor: theme.colorWhite,
    borderRadius: 10,
    padding: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
    width: '95%',
    // height: '50%',
  },
  modalBody: {
    marginTop: '10%',
    width: '100%',
    // height: '100%',
    // backgroundColor: 'red',
    alignItems: 'center',
  },
  modalHeaderText: {
    color: theme.colorBlack,
    textAlign: 'center',
    fontSize: platform.getFontSize() + 10,
    fontWeight: 'bold',
    // backgroundColor: 'red',
    // margin: 5,
  },
  modalMesssageText: {
    color: theme.colorBlack,
    fontWeight: '500',
    textAlign: 'center',
    marginHorizontal: '7%',
    fontSize: 13,
    marginVertical: 5,
  },
  modelCloseIcon: {
    width: 33,
    height: 25,
    resizeMode: 'contain',
    margin: 5,
  },
  modalHeaderDivider: {
    borderColor: theme.colorGray,
    borderWidth: 0.6,
    width: '95%',
    alignSelf: 'center',
  },
  textGroup: {
    height: '15%',
    // alignItems: 'center',
    // backgroundColor: 'red',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  buttonGroup: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    width: '100%',
    height: '30%',
    borderWidth: 0.5,
    borderColor: theme.colorGray,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 17,
    color: theme.colorHyperBlue,
    fontWeight: '500',
  },
  cancelButton: {
    borderRightWidth: 0.5,
    borderColor: platform.isIOS ? theme.colorGray : theme.colorBlack,
    height: '100%',
  },
});
