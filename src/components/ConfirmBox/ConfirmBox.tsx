import {Pressable, View, Text, Modal} from 'react-native';
import {styles} from './ConfirmBox.style';
import platform from '../../../utils/platform';
interface ConfirmBoxProps {
  modalVisible?: boolean;
  setModalVisible?: any;
  allowOnlySingleButton?: boolean;
  message: string;
  onClickHandler: () => void;
  onTrueButtonText?: string;
  onFalseButtonText?: string;
  isPromoCode?: boolean;
  header?: string;
}

export const ConfirmBox = (props: ConfirmBoxProps) => {
  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
          props.setModalVisible(!props.modalVisible);
        }}>
        <View style={styles.container}>
          <View
            style={[styles.modalView, props.isPromoCode ? {width: '80%'} : {}]}>
            <View style={styles.textGroup}>
              {/* <Text style={styles.modalHeaderText}>
                {props.header ? props.header : 'Printograph'}
              </Text> */}
              <Text
                style={[
                  styles.modalMesssageText,
                  props.isPromoCode ? {fontSize: platform.getFontSize()} : {},
                ]}>
                {props.message}
              </Text>
            </View>
            <View style={styles.buttonGroup}>
              <Pressable
                style={[
                  styles.buttonContainer,
                  props.isPromoCode ? {width: '40%'} : {},
                ]}
                onPress={() => {
                  props.onClickHandler();
                  props.setModalVisible(!props.modalVisible);
                }}>
                <Text style={styles.buttonText}>
                  {props.onTrueButtonText ?? 'Yes'}
                </Text>
              </Pressable>

              <View style={styles.cancelButton}>
                <Text></Text>
              </View>

              <Pressable
                style={[
                  styles.buttonContainer,
                  props.isPromoCode ? {width: '40%'} : {},
                ]}
                onPress={() => props.setModalVisible(!props.modalVisible)}>
                <Text style={styles.buttonText}>
                  {props.onFalseButtonText ?? 'No'}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
