import {styles} from './OrdersListing.style';
import {navigate} from '../../../../navigation';
import {useNavigation} from '@react-navigation/native';
import {View, Text, FlatList, Pressable, Image, Keyboard} from 'react-native';

import imagePath from '../../../../constants/imagePath';
import {useEffect, useState} from 'react';
import {TextInput} from 'react-native-paper';
import {theme} from '../../../../themes/default';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';

export const OrdersListing = () => {
  const navigation = useNavigation();
  const navigator = navigate(navigation);

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>();
  const [masterDataSource, setMasterDataSource] = useState<any>();
  const [isFilterData, setIsFilterData] = useState(true);

  const getOrderListing = async () => {
    const data = await AsyncStorage.getItem('OrderListJson');
    setFilteredDataSource(data ? JSON.parse(data) : []);
    setMasterDataSource(data ? JSON.parse(data) : []);
  };

  const printPDF = async (printHtmlFormat: string) => {
    const results: any = await RNHTMLtoPDF.convert({
      html: printHtmlFormat,
      fileName: 'test',
      base64: true,
    });
    await RNPrint.print({filePath: results.filePath});
  };

  const filterRecentOrders = (orders: any) => {
    const oneMonthAgo = moment().subtract(1, 'months'); // Get date one month ago

    const filterRecentOrders = orders.filter((order: any) => {
      const orderDate = moment(order.orderDate, 'DD-MM-YYYY h:mm A'); // Parse orderDate with the given format
      return orderDate.isSameOrAfter(oneMonthAgo); // Include orders within the last month
    });

    setFilteredDataSource(filterRecentOrders);
    setMasterDataSource(filterRecentOrders);
    AsyncStorage.setItem('OrderListJson', JSON.stringify(filterRecentOrders));
  };

  useEffect(() => {
    getOrderListing();
  }, []);

  useEffect(() => {
    if (isFilterData && masterDataSource) {
      filterRecentOrders(masterDataSource);
      setIsFilterData(false);
    }
  }, [masterDataSource]);

  const orderSearchFilter = (text: any) => {
    if (text) {
      const newData = masterDataSource.filter(function (item: any) {
        let isFound = false;
        const itemTitleData = item?.name
          ? item?.name.toUpperCase()
          : ''.toUpperCase();

        const itemIdData = item?.orderNumber.toString()
          ? item?.orderNumber.toString()
          : '';

        const textData = text.toUpperCase();
        if (itemTitleData.indexOf(textData) > -1) {
          isFound = true;
        } else if (itemIdData.indexOf(textData) > -1) {
          isFound = true;
        }

        return isFound;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({item, index}: any) => {
    return (
      <View
        // onPress={() => navigator.openOrdersDetails({item: item})}
        style={[
          styles.pressableListItem,
          index + 1 == filteredDataSource.length
            ? {borderBottomWidth: 1, borderColor: theme.colorGray}
            : {},
          index == 0 ? {borderTopWidth: 1, borderColor: theme.colorGray} : {},
        ]}>
        <View style={styles.listItemView}>
          <View style={styles.listItemId}>
            <Text style={styles.listItemIdText}>
              Order ID #{item?.orderNumber}
            </Text>
          </View>

          <View style={styles.listItemPriceSection}>
            <Text style={styles.listItemDates}>{item.orderDate}</Text>
          </View>
        </View>
        <View style={styles.secondLineView}>
          <View style={{width: '30%'}}>
            <Text style={styles.cutomerName}>{item.name}</Text>
            <Text style={styles.cutomerPhone}>{item.phone}</Text>
          </View>
          <View
            style={{
              width: '30%',
            }}>
            <Text style={[styles.cutomerName, {textAlign: 'center'}]}>
              ₹ {item.subTotal}
            </Text>
          </View>
          <View
            style={{
              width: '30%',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <Pressable
              onPress={() => {
                navigator.openOrderSummary(item);
              }}>
              <Image
                resizeMode="contain"
                style={{width: 25, height: 50, marginRight: '5%'}}
                source={imagePath.eyeShowIcon}
              />
            </Pressable>
            <Pressable
              onPress={() => {
                printPDF(item.printHtmlFormat);
              }}>
              <Image
                tintColor={theme.colorBlack}
                resizeMode="contain"
                style={{width: 50, height: 50}}
                source={imagePath.printerIcon}
              />
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return <View style={styles.itemSeparatorView} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredDataSource}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
        onScroll={Keyboard.dismiss}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.orderSearchSection}>
            <Image
              style={styles.orderSearchIcon}
              source={imagePath.tabIconSearch}
            />
            <TextInput
              style={styles.orderSearchInput}
              theme={{colors: {primary: theme.colorWhite}}}
              selectionColor={theme.primaryColor}
              underlineColor={theme.colorWhite}
              cursorColor={theme.colorBlack}
              placeholder="Search Cutomer Name OR Order Number"
              placeholderTextColor={theme.colorGray}
              keyboardType={'default'}
              onChangeText={text => orderSearchFilter(text)}
              value={search}
            />
          </View>
        }
      />
    </View>
  );
};
