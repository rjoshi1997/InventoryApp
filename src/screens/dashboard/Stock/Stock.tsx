import {
  ScrollView,
  View,
  StatusBar,
  Text,
  Pressable,
  Image,
} from 'react-native';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import {useState} from 'react';
import {styles} from './Stock.style';
import {Divider} from 'react-native-paper';
import imagePath from '../../../constants/imagePath';
import {navigate} from '../../../navigation';

export const StockScreen = (props: any) => {
  const navigation = useNavigation();
  const navigator = navigate(navigation);

  return (
    <View style={styles.accountButtonListContainer}>
      <Pressable
        onPress={() => {
          navigator.openAddStockScreen({pageName: 'Store'});
        }}>
        <View style={styles.accountButtonContainer}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitleText}>Store</Text>
          </View>
          <View style={styles.sectionRightArrowContainer}>
            <Image
              key={Math.random()}
              resizeMode="contain"
              style={styles.sectionRightArrow}
              source={imagePath.ExpandRightArrow}
            />
          </View>
        </View>
        {/* <Divider key={Math.random()} style={styles.listDivider} /> */}
      </Pressable>

      <Pressable
        onPress={() => {
          navigator.openAddStockScreen({pageName: 'Cetegory'});
        }}>
        <View style={styles.accountButtonContainer}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitleText}>Cetegory</Text>
          </View>
          <View style={styles.sectionRightArrowContainer}>
            <Image
              key={Math.random()}
              resizeMode="contain"
              style={styles.sectionRightArrow}
              source={imagePath.ExpandRightArrow}
            />
          </View>
        </View>
        {/* <Divider key={Math.random()} style={styles.listDivider} /> */}
      </Pressable>

      <Pressable
        onPress={() => {
          navigator.openAddStockScreen({pageName: 'Product'});
        }}>
        <View style={styles.accountButtonContainer}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitleText}>Product</Text>
          </View>
          <View style={styles.sectionRightArrowContainer}>
            <Image
              key={Math.random()}
              resizeMode="contain"
              style={styles.sectionRightArrow}
              source={imagePath.ExpandRightArrow}
            />
          </View>
        </View>
        {/* <Divider key={Math.random()} style={styles.listDivider} /> */}
      </Pressable>

      <Pressable
        onPress={() => {
          // showAlertBoxForLogin('Profile');
        }}>
        <View style={styles.accountButtonContainer}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitleText}>Export Summary</Text>
          </View>
          <View style={styles.sectionRightArrowContainer}>
            <Image
              key={Math.random()}
              resizeMode="contain"
              style={styles.sectionRightArrow}
              source={imagePath.ExpandRightArrow}
            />
          </View>
        </View>
        {/* <Divider key={Math.random()} style={styles.listDivider} /> */}
      </Pressable>
    </View>
  );
};
