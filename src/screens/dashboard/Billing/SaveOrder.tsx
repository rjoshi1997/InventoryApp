import {Pressable, ScrollView, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from './Billing.style';
import {navigate} from '../../../navigation';
import {Avatar, Divider, TextInput} from 'react-native-paper';
import {theme} from '../../../themes/default';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dropdown} from 'react-native-element-dropdown';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint, {print} from 'react-native-print';
import {ConfirmBox} from '../../../components/ConfirmBox';

export const SaveOrderScreen = (props: any) => {
  const navigation = useNavigation();
  const navigator = navigate(navigation);
  const params = props.route.params;
  const selectedData = params.selectedData;
  const orderNumber = Math.floor(1000 + Math.random() * 9000);
  const [userDetails, setUserDetails] = useState({
    name: '',
    phone: '',
  });
  const [storeListData, setStoreListData] = useState<any>([]);
  const [selectedStoreValue, setSelectedStoreValue] = useState('');
  const [showPrintPopupBox, setShowPrintPopupBox] = useState(false);
  const date = new Date();

  // Extract day, month, and year
  const day = String(date.getDate()).padStart(2, '0'); // Ensures two-digit day
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert to 12-hour format (0 -> 12)
  const dateFormat = `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;

  const getStoreListItems = async () => {
    const data = await AsyncStorage.getItem('StoreJson');
    setStoreListData(data ? JSON.parse(data) : []);
  };

  const getHtmlFormat = () => {
    return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      display: flex;
    }
    .container {
      width: 100%;
      height:100%;
      margin: auto;
      padding: 16px;
      border: 1px solid #ccc;
    }
    .header, .footer {
    margin-top: 10px;
      text-align: center;
      margin-bottom: 16px;
    }
    .header .title {
      font-size: 18px;
      font-weight: bold;
    }
    .header .small-text {
      font-size: 12px;
      color: #555;
    }
    .divider {
      border-bottom: 1px solid #000;
      margin: 8px 0;
    }
    .divider-dashed {
      border-bottom: 1px dashed #ccc;
      margin: 8px 0;
    }
    .row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      font-size: 14px;
    }
    .row .column {
      flex: 1;
      text-align: left;
      word-wrap:break-word;
      max-width: 100px;
      margin-top: 2%;
      margin-bottom: 2%;
    }
    .row .flex2 {
      flex: 2;
      margin-top: 2%;
      margin-bottom: 2%;
      max-width: 150px;
    }
    .total {
      text-align: center;
      font-weight: bold;
      margin-top: 8px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="title">${selectedStoreValue}</div>
      <div class="small-text">M: 9624277000</div>
      <div class="small-text">OrderNo: ${orderNumber}</div>
      <div class="small-text">Date: ${dateFormat}</div>
    </div>
    <div class="divider"></div>
    <div class="header">
      <div class="title">${userDetails.name} | ${userDetails.phone}</div>
    </div>
    <div class="divider-dashed"></div>
    <div class="row">
      <div class="column">SR</div>
      <div class="column flex2">NAME</div>
      <div class="column">QTY</div>
      <div class="column">PRICE</div>
      <div class="column">AMT</div>
    </div>
    <div class="divider-dashed"></div>
    ${selectedData
      .map(
        (item: any, index: number) => `
        <div class="row">
          <div class="column">${index + 1}</div>
          <div class="column flex2">${item.name}</div>
          <div class="column">${item.quantity}</div>
          <div class="column">${item.price}</div>
          <div class="column">${(item.quantity * item.price).toFixed(2)}</div>
        </div>
      `,
      )
      .join('')}
    <div class="divider-dashed"></div>
    <div class="total">Total QUANTITY - ${params.totalQty}</div>
    <div class="total">GRAND TOTAL - ${params.subTotal}</div>
  </div>
</body>
</html>
`;
  };

  const saveOrderItem = async () => {
    let oldData: any = await AsyncStorage.getItem('OrderListJson');
    oldData = oldData ? JSON.parse(oldData) : [];
    let saveData = [
      ...oldData,
      {
        ...params,
        orderNumber: orderNumber,
        orderDate: dateFormat,
        store: selectedStoreValue,
        name: userDetails.name,
        phone: userDetails.phone,
        printHtmlFormat: getHtmlFormat(),
      },
    ];

    AsyncStorage.setItem('OrderListJson', JSON.stringify(saveData));
    setShowPrintPopupBox(true);
  };

  const printPDF = async () => {
    const results: any = await RNHTMLtoPDF.convert({
      html: getHtmlFormat(),
      fileName: 'test',
      base64: true,
    });
    await RNPrint.print({filePath: results.filePath});
    navigator.goBackToOrderScreen();
  };

  useEffect(() => {
    getStoreListItems();
  }, []);

  const getUserNameField = (fieldName: string) => {
    let fieldValue = fieldName == 'Name' ? userDetails.name : userDetails.phone;

    fieldValue = fieldName == 'Store' ? selectedStoreValue : fieldValue;
    let activeField = fieldValue != undefined && fieldValue != '';

    return (
      <View style={styles.inputFields}>
        {activeField && <Text style={[styles.FieldTopTitle]}>{fieldName}</Text>}
        {fieldName == 'Store' && (
          <View style={[styles.inputTextView, {marginTop: '1%'}]}>
            <Dropdown
              search
              style={{width: '100%'}}
              mode="default"
              data={storeListData}
              searchPlaceholder="Search..."
              labelField={'name'}
              valueField={'name'}
              value={fieldValue}
              placeholder={'Please Select Store'}
              placeholderStyle={styles.fieldLabelText}
              containerStyle={{
                padding: '5%',
                paddingHorizontal: 8,
                borderRadius: 10,
              }}
              selectedTextStyle={[
                styles.fieldLabelText,
                {color: theme.colorBlack},
              ]}
              onChange={item => {
                setSelectedStoreValue(item.name);
              }}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}

        {fieldName != 'Store' && (
          <View style={styles.flexRowDirection}>
            <TextInput
              keyboardType={fieldName == 'Phone' ? 'number-pad' : 'default'}
              value={fieldValue}
              placeholder={activeField ? '' : 'Customer ' + fieldName}
              autoCapitalize="none"
              placeholderTextColor={theme.colorGray}
              contentStyle={{paddingLeft: '0%'}}
              style={styles.usernameInputText}
              theme={{colors: {primary: theme.colorBlack}}}
              underlineStyle={{display: 'none'}}
              onChangeText={textInput => {
                if (fieldName == 'Name') {
                  setUserDetails({...userDetails, name: textInput});
                } else {
                  setUserDetails({...userDetails, phone: textInput});
                }
              }}
              onFocus={e => {
                // updateState({username});
                // setIsShowUserCloseButton(true);
                // setIsShowIconUsernameValid(false);
              }}
            />
          </View>
        )}
      </View>
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
    <View style={styles.container}>
      <ScrollView
        style={{marginBottom: 10}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.bodyContainer}>
          <View style={styles.inputGroup}>
            {getUserNameField('Store')}
            {getUserNameField('Name')}
            {getUserNameField('Phone')}
          </View>
          <View style={styles.shippingItemsContainer}>
            <View style={styles.orderSummaryContainer}>
              <Text style={styles.orderSummaryText}>Order Summary</Text>
            </View>

            {selectedData.map((item: any, index: any) => {
              return (
                <View key={index}>
                  <View style={styles.shippingItem}>
                    <View style={styles.itemImageContainer}>
                      <Avatar.Text
                        style={{
                          alignSelf: 'center',
                          borderRadius: 10,
                          backgroundColor: theme.colorGp,
                        }}
                        size={40}
                        label={index + 1}
                      />
                    </View>
                    <View style={styles.itemDetailsContainer}>
                      <View style={styles.itemHeaderContainer}>
                        <Text style={styles.itemNameText}>{item.name}</Text>
                        <Text
                          style={[
                            styles.itemNameText,
                            {
                              textAlign: 'right',
                              width: '22%',
                            },
                          ]}>
                          ₹ {parseInt(item.price) * parseInt(item.quantity)}
                        </Text>
                      </View>
                      <View style={styles.itemQtyContainer}>
                        <Text style={styles.itemQtyHeaderText}>Category:</Text>
                        <Text style={styles.itemQtyText}>{item.category}</Text>
                      </View>
                      <View style={styles.itemQtyContainer}>
                        <Text style={styles.itemQtyHeaderText}>Price:</Text>
                        <Text style={styles.itemQtyText}>₹ {item.price}</Text>
                      </View>
                      <View style={styles.itemQtyContainer}>
                        <Text style={styles.itemQtyHeaderText}>Quanity:</Text>
                        <Text style={styles.itemQtyText}>{item.quantity}</Text>
                      </View>
                    </View>
                  </View>
                  <Divider
                    style={{
                      borderColor: theme.colorGray,
                      borderWidth: 0.7,
                      width: selectedData.length == index + 1 ? '0%' : '95%',
                      alignSelf: 'center',
                    }}
                  />
                </View>
              );
            })}
          </View>
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
                <Text style={styles.priceRowRText}>{params.totalProduct}</Text>
              </View>

              <View style={styles.priceRow}>
                <Text style={styles.priceRowRText}>Total Quantity(s)</Text>
                <Text style={styles.priceRowRText}>{params.totalQty}</Text>
              </View>

              <View style={styles.priceSubtotalRow}>
                <Text style={styles.priceRowBText}>Order Subtotal</Text>
                <Text style={styles.priceRowBText}>
                  ₹ {params.subTotal.toFixed(2)}
                </Text>
              </View>
            </View>

            <Pressable
              onPress={saveOrderItem}
              disabled={selectedStoreValue != '' ? false : true}
              style={[
                {
                  backgroundColor: theme.colorGp,
                  alignItems: 'center',
                  borderRadius: 100,
                },
                selectedStoreValue != '' ? {opacity: 1} : {opacity: 0.5},
              ]}>
              <View
                style={{
                  justifyContent: 'center',
                  height: 50,
                  width: 95,
                }}>
                <Text style={[styles.priceRowRText]}>Place Order</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      {showPrintPopupBox && (
        <View>
          <ConfirmBox
            onClickHandler={printPDF}
            onCancelHandler={navigator.goBackToOrderScreen}
            modalVisible={showPrintPopupBox}
            setModalVisible={setShowPrintPopupBox}
            allowOnlySingleButton={false}
            message={'Do You Want To Print?'}
            header={'Thank you for the order.'}
          />
        </View>
      )}
    </View>
  );
};
