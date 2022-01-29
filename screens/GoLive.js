import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList } from 'react-native'
import AgoraUIKit from 'agora-rn-uikit';
import AsyncStorage from '@react-native-community/async-storage';
import Users from '../model/users';
const { height, width } = Dimensions.get("window")
const App = () => {
    const [user, setUser] = useState(Object)
    const [videoCall, setVideoCall] = useState(false);
    const [rtcProps, setRtcPrps] = useState({
        appId: 'a457c62a9459477aba4b1ba9a1cecf31',
        // channel: 'test',
        mode: 1,
        role: 2
    });

    async function getUserDetails() {
        try {
            const username = await AsyncStorage.getItem("userToken");
            // console.log(username);
            const foundUser = Users.filter(item => {
                return username == item.username;
            });
            setUser(foundUser[0]);
            // console.log("username : ",username);
            // console.log("foundUser : ",foundUser);
            setRtcPrps({ ...rtcProps, role: foundUser[0].role, mode: foundUser[0].mode });
        } catch (error) {
            alert("error : ", error);
        }
    }
    // console.log(rtcProps);

    const setChannel = (item) => {
        setRtcPrps({ ...rtcProps, channel: item.username });
        setVideoCall(true);
    }

    useEffect(() => {
        getUserDetails();
    }, []);

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

    const callbacks = { EndCall: () => { setVideoCall(false) } };

    // console.log(rtcProps);

    return videoCall ? (
        <>
            <AgoraUIKit
            styleProps={{UIKitContainer:{height:height,width:width,margin:0,marginVertical:0}}}
                rtcProps={rtcProps}
                callbacks={callbacks}
            />
            <View
                style={{ position: 'absolute', height: 100, width: 100, backgroundColor: "gray" }}
            ></View>
        </>
    ) :


        <View style={{ alignItems: "center", justifyContent: "center", paddingHorizontal: 20, marginTop: 50 }}>
            <FlatList
                style={{}}
                data={Users}
                renderItem={renderLives}
                keyExtractor={(item) => item.id}
            />
            {/* <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'gray' }}>
                <Text style={[{ alignSelf: 'center' }]}>Broadcaster 1</Text>
                <TouchableOpacity style={styles.buttonClicked} onPress={() => {
                    if (user)
                        setChannel(user);
                }}>
                    <Text style={[styles.buttonClickedText]}>Join</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.buttonClicked} onPress={() => setVideoCall(true)}>
                <Text style={[styles.buttonClickedText]}>Join</Text>
            </TouchableOpacity> */}
        </View>
};
export default App;

const styles = StyleSheet.create({
    buttonClicked: { width: 100, backgroundColor: "#4185EF", borderRadius: 20, alignItems: "center", justifyContent: "center", borderColor: "#4185EF", borderWidth: 1 },
    buttonClickedText: { fontSize: 14, fontWeight: "500", color: "#FFF", padding: 7 },
})
