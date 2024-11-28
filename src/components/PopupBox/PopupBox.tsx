import {Pressable, View, Text, Modal, Alert, Image} from 'react-native';
import {styles} from './PopupBox.style';
import {useNavigation} from '@react-navigation/native';
import {navigate} from '../../navigation';
import {Divider} from 'react-native-paper';
import imagePath from '../../constants/imagePath';

export const PopupBox = (props: any) => {
  const navigation = useNavigation();
  const navigator = navigate(navigation);

  return (
    <View
      style={[
        styles.container,
        props.modalVisible ? {display: 'flex'} : {display: 'none'},
      ]}>
      <Modal transparent={true} visible={props.modalVisible}>
        <View style={styles.container}>
          <View style={styles.modalView}>
            <View style={styles.textGroup}>
              <View style={{width: '100%'}}>
                <Text style={styles.modalHeaderText}>{props.modalHeader}</Text>
              </View>
              <Pressable
                style={{
                  position: 'absolute',
                  right: 0,
                  width: '10%',
                  height: '100%',
                }}
                onPress={() => {
                  props.setModalClose(false);
                }}>
                <Image
                  source={imagePath.circleClose}
                  style={styles.modelCloseIcon}
                />
              </Pressable>
            </View>
            <View style={styles.modalBody}>{props.children}</View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
