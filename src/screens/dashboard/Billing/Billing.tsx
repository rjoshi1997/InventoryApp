import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import {memo, useEffect, useMemo, useState} from 'react';
import {styles} from './Billing.style';
import {styles as stockStyle} from '../Stock/Stock.style';
import {Avatar, Divider, List, Text, TextInput} from 'react-native-paper';
import imagePath from '../../../constants/imagePath';
import {navigate} from '../../../navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {theme} from '../../../themes/default';
import {CollapseExpandView} from '../../../components/CollapseExpandView';

export const BillingScreen = (props: any) => {
  const navigation = useNavigation();
  const navigator = navigate(navigation);
  const [listData, setListData] = useState<any>([]);
  const [search, setSearch] = useState('');
  // const [searchResults, setSearchResults] = useState<any>([]);
  const [selectedListData, setSelectedListData] = useState<any>([]);
  const [quantities, setQuantities] = useState<any>({});
  const [cart, setCart] = useState({
    totalQty: 0,
    totalProduct: 0,
    subTotal: 0,
    selectedData: [],
  });

  const getGroupCategory = async (data: any) => {
    return data.reduce((groups: any, item: any) => {
      if (!groups[item.category]) {
        groups[item.category] = {isOpen: false, items: []};
      }
      groups[item.category].items.push(item);
      return groups;
    }, {});
  };

  const getListItems = async () => {
    const data = await AsyncStorage.getItem('ProductJson');
    // setListData(data ? JSON.parse(data) : []);

    if (data) {
      const groupedData = await getGroupCategory(JSON.parse(data));
      setListData(groupedData);
      setSelectedListData(groupedData);
    } else {
      setListData([]);
      setSelectedListData([]);
    }
  };

  const productSearchFilter = async (text: any) => {
    setSearch(text);
    if (text) {
      const results: any = [];

      // Iterate through categories
      Object.keys(listData).forEach(key => {
        const categoryItems = listData[key].items;
        categoryItems.forEach((item: {name: string; price: string}) => {
          if (item.name.toLowerCase().includes(text.toLowerCase())) {
            results.push(item);
          }
          if (item.price.toLowerCase().includes(text.toLowerCase())) {
            results.push(item);
          }
        });
      });

      const data = await getGroupCategory(results);
      setSelectedListData(data);
    } else {
      setSelectedListData(listData);
    }
  };

  const changeQuantity = (product: any, change: number, action = 'BUTTON') => {
    const productKey = `${product.category}_${product.name}`;
    const currentQuantity = quantities[productKey] || 0;
    let newQuantity = 0;
    if (action == 'TEXT') {
      newQuantity = change;
    } else {
      newQuantity = currentQuantity + change;
    }

    const updatedQuantities = {
      ...quantities,
      [productKey]: Math.max(newQuantity, 0),
    };
    setQuantities(updatedQuantities);

    const updatedCart: any = Object.keys(updatedQuantities)
      .filter(key => updatedQuantities[key] > 0)
      .map(key => {
        const [category, name] = key.split('_');

        const product: any = Object.values(selectedListData[category].items)
          .flat()
          .find(
            (item: any) => item.category === category && item.name === name,
          );

        return {...product, quantity: updatedQuantities[key]};
      });

    const totalProducts = updatedCart.reduce(
      (total: any, item: any) => total + item.quantity,
      0,
    );

    const subtotal = updatedCart.reduce((sum: any, item: any) => {
      return sum + parseFloat(item.price) * item.quantity;
    }, 0);

    setCart({
      totalQty: totalProducts,
      totalProduct: updatedCart.length,
      subTotal: subtotal,
      selectedData: updatedCart,
    });
  };

  const saveOrder = () => {
    navigator.openSaveOrderScreen(cart);
  };

  useEffect(() => {
    getListItems();
  }, []);

  const RenderItem = (data: any) => {
    const item = data.item;
    const firstCharacter: any = Array.from(item.name)[0];

    const productKey = `${item.category}_${item.name}`;
    const quantity = quantities[productKey] || 0;
    const [currentQty, setCurrentQty] = useState<any>(quantity);

    return (
      <View
        style={[
          stockStyle.listItemContainer,
          {borderWidth: 0, alignSelf: 'flex-start'},
        ]}
        key={productKey}>
        <View style={{flexDirection: 'row', width: '100%'}}>
          <Avatar.Text
            style={{
              alignSelf: 'center',
              borderRadius: 10,
              backgroundColor: theme.colorGp,
            }}
            size={40}
            label={item.price}
          />
          <View style={stockStyle.listItemDetailSection}>
            <Text style={[stockStyle.listSliderText]}>{item.name}</Text>
            <Text style={[stockStyle.listSliderText]}>₹{item.price}</Text>
          </View>
          <View style={styles.quantityContainer}>
            <Pressable
              // style={{alignItems: 'center', justifyContent: 'center'}}
              onPress={() => {
                changeQuantity(item, -1);
              }}>
              <Image
                resizeMode="contain"
                style={styles.quantityButtonImage}
                source={imagePath.minusButton}
              />
            </Pressable>

            <View style={styles.quantityTextContainer}>
              <TextInput
                keyboardType="number-pad"
                placeholder="0"
                value={currentQty > 0 ? String(currentQty) : ''}
                autoCapitalize="none"
                placeholderTextColor={theme.colorGray}
                contentStyle={{textAlign: 'center'}}
                style={styles.priceInputText}
                theme={{colors: {primary: theme.colorBlack}}}
                underlineStyle={{display: 'none'}}
                onSubmitEditing={event => {
                  const textValue = event.nativeEvent.text;
                  changeQuantity(item, parseInt(textValue), 'TEXT');
                }}
                onChangeText={qty => {
                  setCurrentQty(qty);
                }}
                onBlur={() => {
                  changeQuantity(item, parseInt(currentQty), 'TEXT');
                }}
              />
            </View>

            <Pressable
              onPress={() => {
                changeQuantity(item, 1);
              }}>
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

  const CategoryList = memo(({selectedListData}: any) => {
    return (
      <View>
        {Object.keys(selectedListData).map(category => {
          // Sort products by name within each category
          const sortedProducts = selectedListData[category].items.sort(
            (a: any, b: any) => a.name.localeCompare(b.name),
          );

          return (
            <CollapseExpandView
              key={category}
              isShowBodyContent={selectedListData[category].isOpen}
              headerTitle={category}
              selectedListData={selectedListData}
              setSelectedListData={setSelectedListData}>
              {sortedProducts.map((item: any) => (
                <RenderItem key={item.category + '_' + item.name} item={item} />
              ))}
            </CollapseExpandView>
          );
        })}
      </View>
    );
  });

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
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
            <Text style={styles.priceRowRText}>{cart.totalProduct}</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceRowRText}>Total Quantity(s)</Text>
            <Text style={styles.priceRowRText}>{cart.totalQty}</Text>
          </View>

          <View style={styles.priceSubtotalRow}>
            <Text style={styles.priceRowBText}>Order Subtotal</Text>
            <Text style={styles.priceRowBText}>
              ₹ {cart.subTotal.toFixed(2)}
            </Text>
          </View>
        </View>

        <Pressable
          disabled={cart.totalProduct ? false : true}
          style={[
            {
              backgroundColor: theme.colorGp,
              alignItems: 'center',
              borderRadius: 100,
            },
            cart.totalProduct ? {opacity: 1} : {opacity: 0.5},
          ]}
          onPress={saveOrder}>
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
            placeholder="Search Product Name Or Product Price"
            placeholderTextColor={theme.colorGray}
            keyboardType={'default'}
            onChangeText={text => productSearchFilter(text)}
            value={search}
          />
        </View>

        <CategoryList selectedListData={selectedListData} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
