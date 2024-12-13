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
import {Avatar, TextInput} from 'react-native-paper';
import {navigate} from '../../../../navigation';
import {SwipeListView} from 'react-native-swipe-list-view';
import imagePath from '../../../../constants/imagePath';
import {theme} from '../../../../themes/default';
import {PopupBox} from '../../../../components/PopupBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dropdown} from 'react-native-element-dropdown';
import {ConfirmBox} from '../../../../components/ConfirmBox';

export const AddStockScreen = (props: any) => {
  const navigation = useNavigation();
  const navigator = navigate(navigation);
  const data = props.route.params;
  const pageName = data.pageName;
  const [listData, setListData] = useState<any>([]);
  const [categoryListData, setCategoryListData] = useState<any>([]);
  const [textBoxValue, setTextBoxValue] = useState('');
  const [selectedCategoryValue, setSelectedCategoryValue] = useState('');
  const [textBoxPriceValue, setTextBoxPriceValue] = useState('0');
  const [showPopupBox, setShowPopupBox] = useState(false);
  const [showDeletePopupBox, setShowDeletePopupBox] = useState(false);
  const [itemDeleteIndex, setItemDeleteIndex] = useState<any>(null);
  const [itemUpdatedIndex, setItemUpdatedIndex] = useState<any>(null);

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

  const removeItem = () => {
    const updatedData = [...listData]; // Create a copy of the array
    updatedData.splice(itemDeleteIndex, 1);
    setListData(updatedData);
    AsyncStorage.setItem(pageName + 'Json', JSON.stringify(updatedData));
  };

  const saveNewItem = () => {
    let storeData: any = [];
    if (itemUpdatedIndex != null) {
      storeData = [...listData]; // Create a copy of the array
      storeData[itemUpdatedIndex] = {
        ...storeData[itemUpdatedIndex],
        name: textBoxValue,
      }; // Update the object at the given index
      if (pageName == 'Product') {
        storeData[itemUpdatedIndex] = {
          ...storeData[itemUpdatedIndex],
          category: selectedCategoryValue,
          price: textBoxPriceValue,
        }; // Update the object at the given index
      }
    } else {
      if (pageName == 'Store' || pageName == 'Category') {
        storeData = [...listData, {name: textBoxValue}];
      } else if (pageName == 'Product') {
        storeData = [
          ...listData,
          {
            name: textBoxValue,
            category: selectedCategoryValue,
            price: textBoxPriceValue,
          },
        ];
      }
    }

    setListData(storeData);
    AsyncStorage.setItem(pageName + 'Json', JSON.stringify(storeData));

    setTextBoxValue('');
    setItemUpdatedIndex(null);
    setSelectedCategoryValue('');
    setTextBoxPriceValue('0');
    setShowPopupBox(false);
  };

  const ItemSliderButtons = (props: any) => {
    return (
      <View style={styles.sliderButtonContainer}>
        <Pressable
          style={styles.sliderDeleteButton}
          onPress={() => {
            setItemDeleteIndex(props.index);
            setShowDeletePopupBox(true);
          }}>
          <View pointerEvents="none" style={styles.sliderButtonsContent}>
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
    const item = data.item;
    return (
      <Pressable
        onPress={() => {
          setItemUpdatedIndex(data.index);
          setTextBoxValue(item.name);
          if (pageName == 'Product') {
            setSelectedCategoryValue(item.category);
            setTextBoxPriceValue(item.price);
          }
          setShowPopupBox(true);
        }}
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
          <View style={styles.listItemDetailSection}>
            <Text style={styles.listHeaderSliderText}>Name:</Text>
            <Text style={[styles.listSliderText]}>{item.name}</Text>
            {pageName == 'Product' && (
              <>
                <Text style={styles.listHeaderSliderText}>Category Name:</Text>
                <Text style={[styles.listSliderText]}>{item.category}</Text>
              </>
            )}
          </View>
          {pageName == 'Product' && (
            <View
              style={[
                {
                  width: '25%',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}>
              <Text style={[styles.listPriceText]}>
                ₹{parseFloat(item.price).toFixed(2)}
              </Text>
            </View>
          )}
        </View>
      </Pressable>
    );
  };

  const renderItem = (item: any) => {
    return (
      <View style={styles.dropdownItem}>
        <Text style={styles.dropdownItemText}>{item.name}</Text>
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
          closeOnRowPress
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
        modalHeader={'Save Changes'}>
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
            <>
              <View style={[styles.inputTextView, {marginTop: '5%'}]}>
                <TextInput
                  keyboardType={'number-pad'}
                  value={textBoxPriceValue}
                  placeholder={'Enter Price'}
                  autoCapitalize="none"
                  placeholderTextColor={theme.colorGray}
                  contentStyle={{paddingLeft: '0%'}}
                  style={styles.usernameInputText}
                  theme={{colors: {primary: theme.colorBlack}}}
                  underlineStyle={{display: 'none'}}
                  onChangeText={price => {
                    setTextBoxPriceValue(price);
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
              <View style={[styles.inputTextView, {marginTop: '5%'}]}>
                {/* <Text style={styles.referrerDropdownLabel}>Referrer type</Text> */}
                <Dropdown
                  style={styles.referrerDropdown}
                  mode="default"
                  data={categoryListData}
                  labelField={'name'}
                  valueField={'name'}
                  value={selectedCategoryValue}
                  placeholder={'Please Select an Option'}
                  placeholderStyle={styles.fieldLabelText}
                  containerStyle={{
                    // height: '25%',
                    // padding: '5%',
                    borderRadius: 10,
                  }}
                  selectedTextStyle={styles.fieldLabelText}
                  onChange={item => {
                    setSelectedCategoryValue(item.name);
                  }}
                  renderItem={renderItem}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </>
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
      {showDeletePopupBox && (
        <View>
          <ConfirmBox
            onClickHandler={removeItem}
            modalVisible={showDeletePopupBox}
            setModalVisible={setShowDeletePopupBox}
            allowOnlySingleButton={false}
            message={'Are you sure you want delete?'}
          />
        </View>
      )}
    </View>
  );
};
