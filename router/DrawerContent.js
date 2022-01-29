import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useTheme, Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import { AuthContext } from '../components/context';
import colors from '../assets/colors';

export function DrawerContent(props) {
    const { signOut } = React.useContext(AuthContext);

    return (
        <View style={{ flex: 1, backgroundColor: colors.primary }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>

                    <Entypo
                        style={{alignSelf: 'flex-end',marginEnd:10 }}
                        name="cross"
                        color={'#FFF'}
                        size={35}
                        onPress={() => props.navigation.closeDrawer()}
                    />

                    <Drawer.Section style={[styles.drawerSection, {marginTop:0}]}>
                        <DrawerItem
                            style={{}}
                            icon={({ color, size }) => (
                                <Icon
                                    name="home-outline"
                                    color={'#FFF'}
                                    size={30}
                                />
                            )}
                            label="Home"
                            labelStyle={{ color: '#FFF', fontWeight: '300', fontSize: 25 }}
                            onPress={() => { props.navigation.navigate('Home') }}
                        />
                        <DrawerItem
                            style={{}}
                            icon={({ color, size }) => (
                                <Image
                                    style={{}}
                                    source={require('../assets/Icons/acc.png')}
                                />
                            )}
                            label="My Profile"
                            labelStyle={{ color: '#FFF', fontWeight: '300', fontSize: 25 }}
                            onPress={() => { props.navigation.navigate('About') }}
                        />
                        <DrawerItem
                            style={{}}
                            icon={({ color, size }) => (
                                <Image
                                    style={{ height: 30, width: 22 }}
                                    source={require('../assets/Icons/medal.png')}
                                />
                            )}
                            label="Subscriptions"
                            labelStyle={{ color: '#FFF', fontWeight: '300', fontSize: 25 }}
                            onPress={() => { props.navigation.navigate('Subscriptions') }}
                        />
                        <DrawerItem
                            style={{}}
                            icon={({ color, size }) => (
                                <Icon
                                    name="video"
                                    color={'#FFF'}
                                    size={30}
                                />
                            )}
                            label="Go Live"
                            labelStyle={{ color: '#FFF', fontWeight: '300', fontSize: 25 }}

                            onPress={() => { props.navigation.navigate('GoLive') }}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                style={{height:50,borderRadius:20,backgroundColor:'#FFF',justifyContent:'center',elevation:10}}
                    icon={({ color, size }) => (
                        <Icon
                            name="exit-to-app"
                            color={'#FF6565'}
                            size={25}
                        />
                    )}
                    label="Sign Out"
                    labelStyle={{color:'#FF6565',fontSize: 16}}
                    onPress={() => { signOut() }}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});