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
import {Avatar, Button, Divider, TextInput} from 'react-native-paper';
import {navigate} from '../../../../navigation';
import {SwipeListView} from 'react-native-swipe-list-view';
import imagePath from '../../../../constants/imagePath';
import {theme} from '../../../../themes/default';
import platform from '../../../../../utils/platform';
import {PopupBox} from '../../../../components/PopupBox';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AddStockScreen = (props: any) => {
  const navigation = useNavigation();
  const navigator = navigate(navigation);
  const data = props.route.params;
  const pageName = data.pageName;
  const [listData, setListData] = useState<any>([]);
  const [categoryListData, setCategoryListData] = useState<any>([]);
  const [textBoxValue, setTextBoxValue] = useState('');
  const [showPopupBox, setShowPopupBox] = useState(false);

  const getListItems = async () => {
    const data = await AsyncStorage.getItem(pageName + 'Json');
    setListData(data ? JSON.parse(data) : []);
  };

  const getCategoryListItems = async () => {
    const data = await AsyncStorage.getItem('CategoryJson');
    setCategoryListData(data ? JSON.parse(data) : []);
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: pageName,
    });
    getListItems();
    if (pageName == 'Product') {
      getCategoryListItems();
    }
  }, []);

  const saveNewItem = () => {
    const storeData = [...listData, {name: textBoxValue}];
    setListData(storeData);
    AsyncStorage.setItem(pageName + 'Json', JSON.stringify(storeData));

    // if (pageName == 'Store') {
    // } else if (pageName == 'Category') {
    // } else if (pageName == 'Product') {
    // }

    setTextBoxValue('');
    setShowPopupBox(false);
  };

  const ItemSliderButtons = (props: any) => {
    return (
      <View style={styles.sliderButtonContainer}>
        <Button icon="delete" mode="contained">
          Delete
        </Button>
        {/* <Pressable
          style={styles.sliderDeleteButton}
          onPress={() => {
            // props.setShowDeleteItem(true);
            // props.setDeleteCartItemId(props.data.item.id);
          }}>
          <View style={styles.sliderButtonsContent}>
            <Image style={styles.sliderImage} source={imagePath.deleteIcon} />
            <Text style={styles.sliderText}>Delete</Text>
          </View>
        </Pressable> */}
      </View>
    );
  };

  const CartItem = (data: any) => {
    const isFirstItem = data.index === 0;
    const isLastItem = data.index === data.section.data.length - 1;
    const item = data.item;
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
          <Avatar.Text
            style={{
              alignSelf: 'center',
              marginLeft: '2%',
              borderRadius: 10,
              backgroundColor: theme.colorGp,
            }}
            size={50}
            label={data.index + 1}
          />
          {/* <View
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
          </View> */}
          <View style={styles.listItemDetailSection}>
            <Text style={styles.listHeaderSliderText}>Name:</Text>
            <Text style={[styles.listSliderText]}>{item.name}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.addNewStockContainer}>
      <View style={[styles.addNewStockView]}>
        <SwipeListView
          useSectionList
          sections={[
            {
              data: listData,
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
              value={textBoxValue}
              placeholder={'Enter ' + pageName + ' Name'}
              autoCapitalize="none"
              placeholderTextColor={theme.colorGray}
              contentStyle={{paddingLeft: '0%'}}
              style={styles.usernameInputText}
              theme={{colors: {primary: theme.colorBlack}}}
              underlineStyle={{display: 'none'}}
              onChangeText={username => {
                setTextBoxValue(username);
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

          {pageName == 'Product' && (
            <View style={[styles.inputTextView, {marginTop: '5%'}]}>
              <TextInput
                autoFocus={true}
                keyboardType={'number-pad'}
                // defaultValue={userCredentails?.username}
                // value={textBoxValue}
                placeholder={'Enter Price'}
                autoCapitalize="none"
                placeholderTextColor={theme.colorGray}
                contentStyle={{paddingLeft: '0%'}}
                style={styles.usernameInputText}
                theme={{colors: {primary: theme.colorBlack}}}
                underlineStyle={{display: 'none'}}
                onChangeText={username => {
                  // setTextBoxValue(username);
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
          )}

          <TouchableOpacity
            disabled={textBoxValue.length ? false : true}
            style={[
              styles.loginButton,
              textBoxValue.length ? {opacity: 1} : {opacity: 0.5},
            ]}
            onPress={saveNewItem}>
            <Text style={styles.loginButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </PopupBox>
    </View>
  );
};
