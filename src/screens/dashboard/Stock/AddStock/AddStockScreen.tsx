import {
  ScrollView,
  View,
  StatusBar,
  Text,
  Pressable,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {styles} from '../Stock.style';
import {Divider, TextInput} from 'react-native-paper';
import {navigate} from '../../../../navigation';
import {SwipeListView} from 'react-native-swipe-list-view';
import imagePath from '../../../../constants/imagePath';
import {theme} from '../../../../themes/default';
import platform from '../../../../../utils/platform';
import {PopupBox} from '../../../../components/PopupBox';

export const AddStockScreen = (props: any) => {
  const navigation = useNavigation();
  const navigator = navigate(navigation);
  const data = props.route.params;
  const pageName = data.pageName;
  const [listData, setListData] = useState<any>([]);
  const [showPopupBox, setShowPopupBox] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: pageName,
    });

    // setListData([1, 2, 3]);
  }, []);

  const ItemSliderButtons = (props: any) => {
    return (
      <View style={styles.sliderButtonContainer}>
        <Pressable
          style={styles.sliderDeleteButton}
          onPress={() => {
            // props.setShowDeleteItem(true);
            // props.setDeleteCartItemId(props.data.item.id);
          }}>
          <View style={styles.sliderButtonsContent}>
            <Image style={styles.sliderImage} source={imagePath.deleteIcon} />
            <Text style={styles.sliderText}>Delete</Text>
          </View>
        </Pressable>
      </View>
    );
  };

  const CartItem = (data: any) => {
    const isFirstItem = data.index === 0;
    const isLastItem = data.index === data.section.data.length - 1;
    return (
      <View
        style={[
          styles.listItemContainer,
          // {borderTopWidth: 1, borderBottomWidth: 1},
          // isFirstItem ? {borderTopWidth: 0} : {},
          // isLastItem ? {borderBottomWidth: 1} : {borderTopWidth: 1},
        ]}
        key={Math.random()}>
        <View style={{flexDirection: 'row', width: '100%'}}>
          <View
            style={{
              height: '70%',
              width: '10%',
              // padding: '2%',
              alignSelf: 'center',
              marginLeft: '2%',
              borderRadius: 10,
              backgroundColor: theme.colorGp,
            }}>
            <Text
              style={[
                styles.itemSliderBadgeText,
                data.index + 1 > 99
                  ? {fontSize: platform.getFontSize() + 12, marginTop: '10%'}
                  : {},
              ]}>
              {data.index + 1}
            </Text>
          </View>
          <View style={styles.listItemDetailSection}>
            <Text style={styles.listHeaderSliderText}>{pageName} Name:</Text>
            <Text style={[styles.listSliderText]}>Ravi</Text>
          </View>
        </View>
      </View>
    );
  };

  const addNewItem = () => {};

  return (
    <View style={styles.addNewStockContainer}>
      <View style={[styles.addNewStockView]}>
        <SwipeListView
          useSectionList
          sections={[
            {
              data: [],
            },
          ]}
          stickySectionHeadersEnabled={true}
          recalculateHiddenLayout={true}
          renderItem={CartItem}
          renderHiddenItem={ItemSliderButtons}
          showsVerticalScrollIndicator={false}
          rightOpenValue={-70}
          disableRightSwipe={true}
        />
      </View>

      <View style={styles.addNewItemButtonView}>
        <Pressable
          onPress={() => setShowPopupBox(true)}
          style={styles.addNewItemButton}>
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>

      <PopupBox
        modalVisible={showPopupBox}
        setModalClose={setShowPopupBox}
        modalHeader={'Add ' + pageName}>
        <View style={{width: '100%'}}>
          <View style={styles.inputTextView}>
            <TextInput
              autoFocus={true}
              // defaultValue={userCredentails?.username}
              // value={localStorageUserValue}
              placeholder={'Enter ' + pageName + ' Name'}
              autoCapitalize="none"
              placeholderTextColor={theme.colorGray}
              contentStyle={{paddingLeft: '0%'}}
              style={styles.usernameInputText}
              theme={{colors: {primary: theme.colorBlack}}}
              underlineStyle={{display: 'none'}}
              onChangeText={username => {
                // setUserCredentails({...userCredentails, username: username});
                // updateState({username});
                // setIsShowUserCloseButton(true);
              }}
              onFocus={e => {
                // updateState({username});
                // setIsShowUserCloseButton(true);
                // setIsShowIconUsernameValid(false);
              }}
            />
          </View>

          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </PopupBox>
    </View>
  );
};
