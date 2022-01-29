import React, { useState, useEffect } from 'react';
import { View, Text, Platform, Dimensions, Alert, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { check, request, PERMISSIONS, RESULTS, checkMultiple } from 'react-native-permissions';
import colors from '../assets/colors';
import Header from '../components/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import GlobalStyles from '../components/GlobalStylesheet'
import CardView from 'react-native-cardview';

const { height, width } = Dimensions.get("window")
const cardWidth = (width / 100) * 95;

export default function Permissions({ navigation, route }) {
    const platform = Platform.OS;
    const goBack = route.params.goBack
    const [Location, setLocation] = useState(null);
    const [Mic, setMic] = useState(null);
    const [Camera, setCamera] = useState(null);
    const [OnScreen, setOnScreen] = useState('Location');
    
    useEffect(() => {
        try {
            if (platform == 'android') {
                checkMultiple([PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, PERMISSIONS.ANDROID.RECORD_AUDIO])
                    .then((result) => {
                        setLocation(result['android.permission.ACCESS_FINE_LOCATION']);
                        setCamera(result['android.permission.CAMERA']);
                        setMic(result['android.permission.RECORD_AUDIO']);
                    })
                    .catch((error) => {
                        Alert.alert("Error", error,
                            [{ text: "OK", onPress: () => { } }]
                        );
                    });
            } else if (platform == 'ios' || platform == 'macos') {
                checkMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, PERMISSIONS.IOS.MICROPHONE])
                    .then((result) => {
                        setLocation(result['ios.permission.LOCATION_WHEN_IN_USE']);
                        setCamera(result['ios.permission.CAMERA']);
                        setMic(result['ios.permission.MICROPHONE']);
                    })
                    .catch((error) => {
                        Alert.alert("Error", error,
                            [{ text: "OK", onPress: () => { } }]
                        );
                    });
            }
        } catch (error) {
            console.error(error);
        }

    }, []);

    useEffect(() => {
        if (Location == "granted") {
            setOnScreen("Mic")
        }
    }, [Location]);

    useEffect(() => {
        if (Mic == "granted") {
            setOnScreen("Camera")
        }
    }, [Mic]);

    console.log(Location, Mic, Camera);

    const LocationPermission = () => {
        if (Location != "granted") {
            if (platform == "android") {
                request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
                    setLocation(result)
                    if (Mic != 'granted')
                        setOnScreen("Mic")
                    else if (Camera != 'granted')
                        setOnScreen("Camera")
                    else
                        navigation.navigate(goBack)
                });
            } else if (platform == 'ios' || platform == 'macos') {
                request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then((result) => {
                    setLocation(result);
                    setOnScreen("Mic")
                });
            }
        }

    }

    const MicPermission = () => {
        if (platform == "android" && Mic != "granted") {
            request(PERMISSIONS.ANDROID.RECORD_AUDIO).then((result) => {
                setMic(result)
                if (Camera != 'granted')
                    setOnScreen("Camera")
                else
                    navigation.navigate(goBack)
            });
        } else if (platform == 'ios' || platform == 'macos') {
            request(PERMISSIONS.IOS.MICROPHONE).then((result) => {
                setMic(result);
                if (Camera != 'granted')
                    setOnScreen("Camera")
                else
                    navigation.navigate(goBack)
            });
        }
    }

    const CameraPermission = () => {
        if (platform == "android" && Camera != "granted") {
            request(PERMISSIONS.ANDROID.CAMERA).then((result) => {
                setCamera(result)
                navigation.navigate(goBack)
            });
        } else if (platform == 'ios' || platform == 'macos') {
            request(PERMISSIONS.IOS.CAMERA).then((result) => {
                setCamera(result);
                navigation.navigate(goBack)
            });
        }
    }

    return (
        <>
            <View style={{ height: 70, justifyContent: 'space-between', backgroundColor: colors.primary, alignItems: 'center', paddingTop: 20, paddingHorizontal: 10, flexDirection: 'row', elevation: 10 }}>
                <View style={{ height: 50, width: 25 }} />
                <Image
                    style={{ maxWidth: 100, maxHeight: 40, resizeMode: 'stretch' }}
                    source={require('../assets/images/LOGO.png')}
                />
                <Entypo name="cross" size={25} color={"#FFF"} style={{ marginEnd: 5 }} onPress={() => navigation.navigate(goBack)} />

            </View>
            {
                OnScreen == 'Location' ?
                    <View style={{ flex: 1 }}>
                        <CardView
                            cardElevation={5}
                            cardMaxElevation={5}
                            cornerRadius={20}
                            style={{ width: cardWidth, margin: 10, padding: 10 }}
                        >
                            <View style={{ height: height / 4, width: width / 100 * 90, backgroundColor: "#3D3D3D", alignSelf: 'center', borderRadius: 10, marginVertical: 15 }}>

                            </View>
                            <Text style={{ fontSize: 18, fontWeight: "600", color: colors.black }}>Location Permission</Text>
                            <Text style={{ fontSize: 12, fontWeight: "400", color: colors.black }}>We need geolocation permission to let us know where you are selling from.</Text>
                        </CardView>
                        <TouchableOpacity
                            style={[GlobalStyles.buttonClicked, { height: 50, width: width / 100 * 90, marginVertical: 10, alignSelf: 'center' }]}
                            onPress={() => LocationPermission()}
                        >
                            <AntDesign name='check' size={25} color={colors.white} />
                        </TouchableOpacity>
                    </View>
                    : null
            }
            {
                OnScreen == 'Mic' ?
                    < View style={{ flex: 1 }}>
                        <CardView
                            cardElevation={5}
                            cardMaxElevation={5}
                            cornerRadius={20}
                            style={{ width: cardWidth, margin: 10, padding: 10 }}
                        >
                            <View style={{ height: height / 4, width: width / 100 * 90, backgroundColor: "#3D3D3D", alignSelf: 'center', borderRadius: 10, marginVertical: 15 }}>

                            </View>
                            <Text style={{ fontSize: 18, fontWeight: "600", color: colors.black }}>Mic Permission</Text>
                            <Text style={{ fontSize: 12, fontWeight: "400", color: colors.black }}>We need microphone permission for customers to be able to hear from you.</Text>
                        </CardView>
                        <TouchableOpacity
                            style={[GlobalStyles.buttonClicked, { height: 50, width: width / 100 * 90, marginVertical: 10, alignSelf: 'center' }]}
                            onPress={() => MicPermission()}
                        >
                            <AntDesign name='check' size={25} color={colors.white} />
                        </TouchableOpacity>
                    </View>
                    : null
            }
            {
                OnScreen == 'Camera' ?
                    < View style={{ flex: 1 }}>
                        <CardView
                            cardElevation={5}
                            cardMaxElevation={5}
                            cornerRadius={20}
                            style={{ width: cardWidth, margin: 10, padding: 10 }}
                        >
                            <View style={{ height: height / 4, width: width / 100 * 90, backgroundColor: "#3D3D3D", alignSelf: 'center', borderRadius: 10, marginVertical: 15 }}>

                            </View>
                            <Text style={{ fontSize: 18, fontWeight: "600", color: colors.black }}>Camera Permission</Text>
                            <Text style={{ fontSize: 12, fontWeight: "400", color: colors.black }}>We need camera permission for customers to be able to see you.</Text>
                        </CardView>
                        <TouchableOpacity
                            style={[GlobalStyles.buttonClicked, { height: 50, width: width / 100 * 90, marginVertical: 10, alignSelf: 'center' }]}
                            onPress={() => CameraPermission()}
                        >
                            <AntDesign name='check' size={25} color={colors.white} />
                        </TouchableOpacity>
                    </View>
                    : null
            }

        </>
    )
}
