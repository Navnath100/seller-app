import React, { useEffect } from 'react';
import { View, ActivityIndicator, StatusBar, PermissionsAndroid, LogBox, Platform } from 'react-native';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme
} from 'react-native-paper';
import { DrawerContent } from './router/DrawerContent';
import Home from './screens/Home';
import About from './screens/About';
import GoLive from './screens/GoLive/GoLive';
import Subscriptions from './screens/Subscriptions';
import ChooseCategory from './screens/ChooseCategory';
import SelectProduct from './screens/SelectProduct';
import ArrangeProducts from './screens/ArrangeProducts';
import ChoosePlatform from './screens/ChoosePlatform';
import ScheduleLive from './screens/ScheduleLive';
import LiveScheduled from './screens/LiveScheduled';
import Permissions from './screens/Permissions';
import { AuthContext } from './components/context';
import RootStackScreen from './router/RootStackScreen';
import AsyncStorage from '@react-native-community/async-storage';

import BottomTabs from './router/BottomTabs'

require('./constants/server');

const Drawer = createDrawerNavigator();

const App = () => {
  LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
    'new NativeEventEmitter'
  ]);
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null); 

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async (foundUser) => {
      // setUserToken('fgkj');
      // setIsLoading(false);
      const userToken = String(foundUser[0].userToken);
      const userName = foundUser[0].username;

      try {
        await AsyncStorage.setItem('userToken', userName);
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', id: userName, token: userToken });
    },
    signOut: async () => {
      // setUserToken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      // setUserToken('fgkj');
      // setIsLoading(false);
    },
    toggleTheme: () => {
      setIsDarkTheme(isDarkTheme => !isDarkTheme);
    }
  }), []);

  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <StatusBar
          translucent={true}
          animated={true}
          barStyle="light-content"
          backgroundColor='transparent'
          hidden={false}
        />
        <NavigationContainer theme={theme}>
          {loginState.userToken !== null ? (
            <Drawer.Navigator
              backBehavior="history"
              screenOptions={{
                headerShown: false
              }}
              drawerContent={props => <DrawerContent {...props} />}
            >
              <Drawer.Screen name="BottomTabs" component={BottomTabs} />
              <Drawer.Screen name="Home" component={Home} />
              <Drawer.Screen name="Permissions" component={Permissions} />
              <Drawer.Screen name="ScheduleLive" component={ScheduleLive} />
              <Drawer.Screen name="SelectProduct" component={SelectProduct} />
              <Drawer.Screen name="ChooseCategory" component={ChooseCategory} />
              <Drawer.Screen name="ArrangeProducts" component={ArrangeProducts} />
              <Drawer.Screen name="LiveScheduled" component={LiveScheduled} />
              <Drawer.Screen name="ChoosePlatform" component={ChoosePlatform} />
              <Drawer.Screen name="About" component={About} />
              <Drawer.Screen name="GoLive" component={GoLive} />
              <Drawer.Screen name="Subscriptions" component={Subscriptions} />
            </Drawer.Navigator>
          )
            :
            <RootStackScreen />
          }
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
}

export default App;