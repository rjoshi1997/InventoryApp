import {Image, Pressable, ScrollView, Text, View} from 'react-native';
import {styles} from './CollapseExpandView.style';
import {useState} from 'react';
import imagePath from '../../constants/imagePath';

export const CollapseExpandView = (props: any) => {
  const isShowBodyContentFlag = props.isShowBodyContent
    ? props.isShowBodyContent
    : false;
  const [isShowBodyContent, setIsShowBodyContent] = useState(
    isShowBodyContentFlag,
  );

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => setIsShowBodyContent(!isShowBodyContent)}
        style={[
          styles.headerView,
          isShowBodyContent ? {marginBottom: 10} : {},
        ]}>
        <Text style={styles.headerTitleText}>{props.headerTitle}</Text>
        <Image
          source={
            isShowBodyContent
              ? imagePath.CollapseDownArrow
              : imagePath.ExpandRightArrow
          }
          style={styles.expandRightArrow}
          resizeMode="contain"
        />
      </Pressable>
      <View
        style={[
          styles.bodyContent,
          isShowBodyContent ? {display: 'flex'} : {display: 'none'},
        ]}>
        {props.children}
      </View>
    </View>
  );
};
