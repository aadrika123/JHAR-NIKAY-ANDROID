import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import MyTabBar from './TabNavigator';
import TabHome from '../screens/tab-screen/home';
import TabSettings from '../screens/tab-screen/settings';
import WebViewScreen from '../screens/web-view';
import UHFScreen from '../screens/uhf-reader';
import QRNfc from '../screens/qr-nfc';
import Details from '../screens/details';

type RootTabParamList = {
  Home: undefined;
  Settings: undefined;
};

const MyTabs = createBottomTabNavigator<RootTabParamList>({
  tabBar: (props: BottomTabBarProps) => <MyTabBar {...props} />,
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Home: TabHome,
    Settings: TabSettings,
  },
});

export const RootStack = createNativeStackNavigator({
  initialRouteName: 'WebViewScreen',
  screenOptions: {
    headerShown: false,
  },
  screens: {
    MyTabs: {
      screen: MyTabs,
      options: { headerShown: false },
    },
    WebViewScreen: {
      screen: WebViewScreen,
    },
    UHFScreen: {
      screen: UHFScreen,
    },
    Details: {
      screen: Details,
    },
    QRNfc: {
      screen: QRNfc,
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

export type RootStackParamList = StaticParamList<typeof RootStack>;

export default function Routes() {
  return <Navigation />;
}
