import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList, ImageBackground } from 'react-native'
import AgoraUIKit from 'agora-rn-uikit';
import AsyncStorage from '@react-native-community/async-storage';
import Users from '../../model/users';
import colors from '../../assets/colors';
import GlobalStyles from '../../components/GlobalStylesheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native-gesture-handler';
import OverlayComponentOnLive from './OverlayComponentOnLive';
const { height, width } = Dimensions.get("window")
const App = ({ navigation }) => {

    const [user, setUser] = useState({ username: "Navnath" })
    const [videoCall, setVideoCall] = useState(false);
    const [rtcProps, setRtcPrps] = useState({
        appId: 'a457c62a9459477aba4b1ba9a1cecf31',
        // channel: 'test',
        mode: 1,
        role: 1
    });

    const [Pin, setPin] = useState(null);
    const [Authenticated, setAuthenticated] = useState(false);
    useEffect(() => {
        getUserDetails()
    }, []);

    async function getUserDetails() {
        try {
            const username = await AsyncStorage.getItem("userToken");
            // console.log(username);
            const foundUser = Users.filter(item => {
                return username == item.username;
            });
            setUser(foundUser[0]);
            console.log("user : ", foundUser[0]);
            // console.log("foundUser : ",foundUser);
            setRtcPrps({ ...rtcProps, role: foundUser[0].role, mode: foundUser[0].mode });
        } catch (error) {
            alert("error : ", error);
        }
    }

    const setChannel = (item) => {
        setAuthenticated(true);
        setRtcPrps({ ...rtcProps, channel: user.username + new Date().getTime() });
        setVideoCall(true);
    }

    const renderLives = ({ item }) => {
        return (

            item.role == 1 ?
                (
                    <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, }}>
                        <Text style={[{ alignSelf: 'center' }]}>{item.username}</Text>
                        <TouchableOpacity style={styles.buttonClicked} onPress={() => {
                            if (user)
                                setChannel(item);
                            else
                                console.log("user not found");
                        }}>

                            <Text style={[styles.buttonClickedText]}>{user.username == item.username ? 'Go Live' : 'Join'}</Text>
                        </TouchableOpacity>
                    </View>
                ) : null

        )
    }

    const callbacks = {
        EndCall: () => {
            setAuthenticated(false);
            setVideoCall(false)
            navigation.goBack();
        }
    };


    // console.log(AllMessages);
    return (
        <>
            {
                !Authenticated ?
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <ImageBackground
                            style={{ width, height: height + 25, alignItems: 'center', justifyContent: 'center' }}
                            source={require('../../assets/images/bg.png')}
                        >
                            <View style={[GlobalStyles.box]}>
                                <Entypo
                                    style={{ alignSelf: 'flex-end', marginEnd: 20 }}
                                    name={"cross"}
                                    size={30}
                                    color={colors.white}
                                    onPress={() => navigation.goBack()}
                                />
                                <View style={[GlobalStyles.TextInputView, { marginTop: 30 }]}>
                                    <TextInput style={[GlobalStyles.TextInput]}
                                        placeholder={"PIN"}
                                        placeholderTextColor={"#FFF"}
                                        defaultValue={Pin}
                                        onChangeText={val => setPin(val)}
                                        keyboardType={'number-pad'}
                                    />
                                </View>
                                <TouchableOpacity
                                    style={[GlobalStyles.Button, { width: "80%", backgroundColor: "#000000", marginTop: 30 }]}
                                    onPress={() => setChannel()}
                                >
                                    <Text style={{ color: "#FFF", fontSize: 14, fontWeight: "700" }}>Verify</Text>
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </View> : null
            }
            {
                videoCall ?
                    <View>
                        < AgoraUIKit
                            styleProps={{
                                localBtnStyles: {
                                    muteLocalAudio: styles.removeBtn,
                                    muteLocalVideo: styles.removeBtn,
                                    switchCamera: styles.removeBtn,
                                    endCall: { width: width / 100 * 95, marginTop: 50 }
                                }
                            }
                            }

                            rtcProps={rtcProps}
                            callbacks={callbacks}
                        />
                        <OverlayComponentOnLive />
                    </View>
                    : null
            }
        </>
    );
};
export default App;

const styles = StyleSheet.create({
    buttonClicked: { width: 100, backgroundColor: "#4185EF", borderRadius: 20, alignItems: "center", justifyContent: "center", borderColor: "#4185EF", borderWidth: 1 },
    buttonClickedText: { fontSize: 14, fontWeight: "500", color: "#FFF", padding: 7 },
    removeBtn: { position: 'absolute', top: 200, height: 0, width: 0 }
})
