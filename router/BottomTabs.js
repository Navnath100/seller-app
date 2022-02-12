import React, { useEffect } from 'react';
import { View, ActivityIndicator, StatusBar, PermissionsAndroid, LogBox, Platform } from 'react-native';
import {
    NavigationContainer,
    DefaultTheme as NavigationDefaultTheme,
    DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    Provider as PaperProvider,
    DefaultTheme as PaperDefaultTheme,
    DarkTheme as PaperDarkTheme
} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Chat from '../Chat';
import play from '../playground';
import Home from '../screens/Home';
import About from '../screens/About';
import GoLive from '../screens/GoLive/GoLive';
import Subscriptions from '../screens/Subscriptions';
import ChooseCategory from '../screens/ChooseCategory';
import SelectProduct from '../screens/SelectProduct';
import ArrangeProducts from '../screens/ArrangeProducts';
import ChoosePlatform from '../screens/ChoosePlatform';
import ScheduleLive from '../screens/ScheduleLive';
import LiveScheduled from '../screens/LiveScheduled';
import colors from '../assets/colors';
import Settings from '../screens/Settings';
import Timeline from '../screens/Timeline';
const Tab = createBottomTabNavigator();

const App = () => {
    LogBox.ignoreLogs([
        "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
        'new NativeEventEmitter'
    ]);
    return (
        <PaperProvider>
            <Tab.Navigator
                backBehavior="history"
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: colors.primary,
                    tabBarIconStyle: { color: colors.primary }
                }}

            >
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{ tabBarIcon: ({focused}) => <AntDesign name='home' size={20} color={focused ? colors.primary:colors.black} /> }}
                    
                />
                <Tab.Screen
                    name="Timeline"
                    component={Timeline}
                    options={{ tabBarIcon: ({focused}) => <MaterialCommunityIcons name='alarm' size={20} color={focused ? colors.primary:colors.black} /> }}
                    
                />
                <Tab.Screen 
                name="Subscriptions" 
                component={Subscriptions} 
                options={{ tabBarIcon: ({focused}) => <MaterialCommunityIcons name='medal-outline' size={20} color={focused ? colors.primary:colors.black} /> }}
                />
                <Tab.Screen 
                name="Settings" 
                component={Settings} 
                options={{ tabBarIcon: ({focused}) => <Ionicons name='settings-outline' size={20} color={focused ? colors.primary:colors.black} /> }}
                />
            </Tab.Navigator>
        </PaperProvider>
    );
}

export default App;