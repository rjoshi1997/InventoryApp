import {ScrollView, View, StatusBar, Text} from 'react-native';
import {useNavigationState} from '@react-navigation/native';
import {useState} from 'react';
import HomePageSections from '../../../../assets/json/HomePageSections.json';
import {Sections} from '../Sections';
import {PageSections} from '../../../constants/constants';
import {styles} from './Home.style';
import {Loader} from '../../../components/Loader';
import {PredefinedLabels} from '../../../constants/predefinedLabels';
import {useSelector} from 'react-redux';
import {AuthHook} from '../../../hooks/auth';

export const HomeScreen = (props: any) => {
  const [dashboardData, setDashboardData] = useState(HomePageSections);
  const [isShowLoaderOnThisScreen, setIsShowLoaderOnThisScreen] =
    useState(true);
  // const {userToken, userInfo} = useSelector((state: any) => state.auth);

  const renderScreen = () => {
    if (dashboardData != null) {
      let count = 0;

      return Object.entries(dashboardData).map(([key, value]) => {
        {
          return Object.entries(value)
            .sort(([, a]: any, [, b]: any) => {
              return a.sectionOrder - b.sectionOrder;
            })
            .map(([sectionKey, sectionValue]: any) => {
              count++;
              if (Object.entries(value).length == count) {
                setTimeout(() => {
                  setIsShowLoaderOnThisScreen(false);
                }, 5000);
              }
              return (
                <Sections
                  key={sectionKey}
                  data={dashboardData}
                  section={sectionValue}
                />
              );
            });
        }
      });
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} key={Math.random()}>
      <View key={Math.random()}>{renderScreen()}</View>
      {isShowLoaderOnThisScreen && (
        <Loader
          modalVisible={isShowLoaderOnThisScreen}
          message={PredefinedLabels.INFO_INIT_APP}
        />
      )}
    </ScrollView>
  );
};
