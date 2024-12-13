import {Image, Pressable, ScrollView, View} from 'react-native';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {styles} from './Billing.style';
import {styles as stockStyle} from '../Stock/Stock.style';
import {Avatar, Divider, List, Text, TextInput} from 'react-native-paper';
import imagePath from '../../../constants/imagePath';
import {navigate} from '../../../navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {theme} from '../../../themes/default';
import {CollapseExpandView} from '../../../components/CollapseExpandView';
import {teal100} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

export const BillingScreen = (props: any) => {
  const navigation = useNavigation();
  const navigator = navigate(navigation);
  const [listData, setListData] = useState<any>([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<any>([]);

  const getGroupCategory = async (data: any) => {
    return data.reduce((groups: any, item: any) => {
      (groups[item.category] = groups[item.category] || []).push(item);
      return groups;
    }, {});
  };

  const getListItems = async () => {
    const data = await AsyncStorage.getItem('ProductJson');
    // setListData(data ? JSON.parse(data) : []);

    if (data) {
      const groupedData = await getGroupCategory(JSON.parse(data));
      setListData(groupedData);
      setSearchResults(groupedData);
    } else {
      setListData([]);
      setSearchResults([]);
    }
  };

  const productSearchFilter = async (text: any) => {
    setSearch(text);
    if (text) {
      const results: any = [];

      // Iterate through categories
      Object.keys(listData).forEach(key => {
        const categoryItems = listData[key];
        categoryItems.forEach((item: {name: string}) => {
          if (item.name.toLowerCase().includes(text.toLowerCase())) {
            results.push(item);
          }
        });
      });

      const data = await getGroupCategory(results);
      setSearchResults(data);
    } else {
      setSearchResults(listData);
    }
  };

  useEffect(() => {
    getListItems();
  }, []);

  const RenderItem = (data: any) => {
    const item = data.item;
    const firstCharacter: any = Array.from(item.name)[0];
    return (
      <View
        style={[
          stockStyle.listItemContainer,
          {borderWidth: 0, alignSelf: 'flex-start'},
          // {borderTopWidth: 1, borderBottomWidth: 1},
          // isFirstItem ? {borderTopWidth: 0} : {},
          // isLastItem ? {borderBottomWidth: 1} : {borderTopWidth: 1},
        ]}
        key={Math.random()}>
        <View style={{flexDirection: 'row', width: '100%'}}>
          <Avatar.Text
            style={{
              alignSelf: 'center',
              // marginLeft: '2%',
              borderRadius: 10,
              backgroundColor: theme.colorGp,
            }}
            size={40}
            label={firstCharacter}
          />
          <View style={stockStyle.listItemDetailSection}>
            <Text style={[stockStyle.listSliderText]}>{item.name}</Text>
            <Text style={[stockStyle.listSliderText]}>₹{item.price}</Text>
          </View>
          <View style={styles.quantityContainer}>
            <Pressable
            // style={{alignItems: 'center', justifyContent: 'center'}}
            // onPress={() => updateQuantityHandler(false)}
            >
              <Image
                resizeMode="contain"
                style={styles.quantityButtonImage}
                source={imagePath.minusButton}
              />
            </Pressable>

            <View style={styles.quantityTextContainer}>
              <TextInput
                keyboardType="number-pad"
                defaultValue="0"
                // value={textBoxValue}
                // placeholder={'0'}
                autoCapitalize="none"
                placeholderTextColor={theme.colorGray}
                contentStyle={{textAlign: 'center'}}
                style={styles.priceInputText}
                theme={{colors: {primary: theme.colorBlack}}}
                underlineStyle={{display: 'none'}}
                onChangeText={username => {
                  // setTextBoxValue(username);
                  // setUserCredentails({...userCredentails, username: username});
                  // updateState({username});
                  // setIsShowUserCloseButton(true);
                }}
              />
            </View>

            <Pressable
            // style={{alignItems: 'center', justifyContent: 'center'}}
            // onPress={() => updateQuantityHandler(false)}
            >
              <Image
                resizeMode="contain"
                style={styles.quantityButtonImage}
                source={imagePath.addButton}
              />
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          paddingBottom: '5%',
          width: '95%',
          // height: '10%',
          alignSelf: 'center',
          borderBottomWidth: 1,
          borderColor: theme.colorBorder,
          // backgroundColor: 'red',
        }}>
        <View style={styles.priceContainer}>
          <View style={styles.priceRow}>
            <Text style={styles.priceRowRText}>Product(s)</Text>
            <Text style={styles.priceRowRText}>{0}</Text>
          </View>

          <View style={styles.priceSubtotalRow}>
            <Text style={styles.priceRowBText}>Order Subtotal</Text>
            <Text style={styles.priceRowBText}>₹ {(0.0).toFixed(2)}</Text>
          </View>
        </View>

        <Pressable
          style={{
            backgroundColor: theme.colorGp,
            alignItems: 'center',
            borderRadius: 100,
          }}
          onPress={() => {}}>
          <View
            style={{
              justifyContent: 'center',
              height: 50,
              width: 85,
            }}>
            <Text style={[styles.priceRowRText]}>Save Order</Text>
          </View>
        </Pressable>
      </View>
      <ScrollView
        style={{marginBottom: 10}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.orderSearchSection}>
          <Image
            style={styles.orderSearchIcon}
            source={imagePath.tabIconSearch}
          />
          <TextInput
            style={styles.orderSearchInput}
            theme={{colors: {primary: theme.colorWhite}}}
            // selectionColor={theme.primaryColor}
            cursorColor={theme.colorBlack}
            underlineColor={theme.colorWhite}
            placeholder="Search Product Name"
            placeholderTextColor={theme.colorGray}
            keyboardType={'default'}
            onChangeText={text => productSearchFilter(text)}
            value={search}
          />
        </View>

        {Object.keys(searchResults).map(category => {
          // Sort products by name within each category

          const sortedProducts = searchResults[category].sort(
            (a: any, b: any) => a.name.localeCompare(b.name),
          );

          return (
            <CollapseExpandView
              key={Math.random()}
              isShowBodyContent={false}
              headerTitle={category}>
              {sortedProducts.map((item: any) => (
                <RenderItem key={Math.random()} item={item}></RenderItem>
              ))}
            </CollapseExpandView>
          );
        })}
      </ScrollView>
    </View>
  );
};
