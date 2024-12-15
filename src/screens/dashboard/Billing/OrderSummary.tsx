import {Pressable, ScrollView, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from './Billing.style';
import {navigate} from '../../../navigation';
import {Avatar, Divider, TextInput} from 'react-native-paper';
import {theme} from '../../../themes/default';

export const OrderSummary = (props: any) => {
  const navigation = useNavigation();
  const navigator = navigate(navigation);
  const params = props.route.params;
  const selectedData = params.selectedData;

  return (
    <View style={styles.container}>
      <ScrollView
        style={{marginBottom: 10}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.bodyContainer}>
          <View style={styles.shippingItemsContainer}>
            <View style={styles.orderSummaryContainer}>
              <Text style={styles.orderSummaryText}>
                Order Summary (ID:{params.orderNumber})
              </Text>
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
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
