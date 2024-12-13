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
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    height: '17%',
  },
  modalHeaderText: {
    color: theme.colorBlack,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  },
  modalMesssageText: {
    color: theme.colorBlack,
    fontWeight: '500',
    textAlign: 'center',
    marginHorizontal: '7%',
    fontSize: 13,
    marginVertical: 5,
  },
  textGroup: {
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonGroup: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    width: '100%',
    height: '30%',
    borderColor: platform.isIOS ? theme.colorGray : theme.colorBlack,
    borderTopWidth: 0.5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 17,
    color: theme.colorHyperBlue,
    fontWeight: '500',
  },
  buttonContainer: {
    width: '35%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    borderRightWidth: platform.isIOS ? 1 : 0.5,
    borderColor: platform.isIOS ? theme.colorGray : theme.colorBlack,
    height: '100%',
  },
});
