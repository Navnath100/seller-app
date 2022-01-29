import React from 'react';
import { View,ImageBackground, SafeAreaView,StatusBar} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AuthScreen from '../screens/AuthScreen';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import colors from '../assets/colors'
const Tab = createMaterialTopTabNavigator();

const RootStackScreen = ({navigation}) => { 
    return(
        <>
        <StatusBar
          translucent={false}
          animated={true}
          barStyle="light-content"
          backgroundColor='transparent'
          hidden={false}
        />
        <Tab.Navigator
        initialRouteName="SignIn"
        screenOptions={{
            tabBarActiveTintColor: "#000",
            tabBarLabelStyle: { fontSize: 14 },
            tabBarStyle: { backgroundColor:"#FFF" },
        }}
        >
        <Tab.Screen
            name="SignIn"
            component={SignIn}
            options={{ tabBarLabel: 'LOG IN' }}
        />
        <Tab.Screen
            name="Contact Us"
            component={SignUp}
            options={{ tabBarLabel: 'CONTACT US' }}
        />
        </Tab.Navigator>
        </>
);
}

export default RootStackScreen;