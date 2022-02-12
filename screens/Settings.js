import React, { useState, useEffect } from 'react'
import { View, Text, StatusBar, ImageBackground, Image, ScrollView, TextInput, Platform, Modal, StyleSheet, Dimensions, TouchableOpacity, FlatList, SafeAreaView } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GlobalStyles from '../components/GlobalStylesheet'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default function Settings(props) {
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const [settingsVisibility, setSettingsVisibility] = useState(true);
    const [Password, setPassword] = useState(true);
    const [Facebook, setFacebook] = useState({ clicked: true, text: "Test" });
    const [Instagram, setInstagram] = useState(true);
    const [Youtube, setYoutube] = useState(true);
    const [Camera, setCamera] = useState(true);
    const [Microphone, setMicrophone] = useState(true);
    const [Gps, setGps] = useState(true);
    const [AuthModal, setAuthModal] = useState(false);

    useEffect(() => {
        // setAuthModal(true);
    }, [])
    function Switch(props) {
        // console.log();
        if (props.clicked) {
            setSettingsVisibility(true)
        } else if (!props.clicked) {
            setSettingsVisibility(false);
        }
    }

    const SettingsView = (params) =>
    (
        <ScrollView>
            {/* <View style={{ width: "100%", paddingHorizontal: 20, marginVertical: 10 }}>
                <Text style={{ fontSize: 14, fontWeight: "600", marginVertical: 5 }}>About</Text>
                <Text style={{ fontSize: 12, fontWeight: "400" }}>Neque diam amet auctor dis vitae. Pellentesque sed et quis ut urna molestie neque, mauris. Sed magnis justo, at donec massa pellentesque a fermentum. Viverra lacinia molestie arcu orci mauris.</Text>
            </View> */}
            <View style={styles.settingView}>
                <View style={{ flexDirection: "row" }}>
                    <MaterialCommunityIcons name="account" size={20} color={"#000"} style={styles.settingIcon} />
                    <Text style={styles.settingTitle}>lorem.ipsum@gmail.com</Text>
                </View>
            </View>
            <View style={styles.settingView}>
                <View style={{ flexDirection: "row" }}>
                    <MaterialCommunityIcons name="lock" size={20} color={"#000"} style={styles.settingIcon} />
                    <Text style={styles.settingTitle}>Password</Text>
                </View>
                <TouchableOpacity style={Password ? GlobalStyles.buttonClicked : GlobalStyles.buttonNotClicked} onPress={() => { }}>
                    <Text style={[Password ? GlobalStyles.buttonClickedText : GlobalStyles.buttonNotClickedText]}>Change</Text>
                </TouchableOpacity>
            </View>

            <View style={{ borderColor: "#000", borderBottomWidth: 0.5, marginVertical: 15 }} />

            <Text style={{ fontWeight: "400", fontSize: 12, paddingHorizontal: 20, marginTop: 10, marginBottom: 15 }}>Social Media</Text>

            <View style={styles.settingView}>
                <View style={{ flexDirection: "row" }}>
                    <FontAwesome name="facebook-f" size={20} color={"#000"} style={styles.settingIcon} />
                    <Text style={styles.settingTitle}>Facebook</Text>
                </View>
                <TouchableOpacity style={Facebook.clicked ? GlobalStyles.buttonClicked : GlobalStyles.buttonNotClicked} onPress={() => { }}>
                    <Text style={[Facebook.clicked ? GlobalStyles.buttonClickedText : GlobalStyles.buttonNotClickedText]}>{Facebook.text}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.settingView}>
                <View style={{ flexDirection: "row" }}>
                    <FontAwesome name="instagram" size={20} color={"#000"} style={styles.settingIcon} />
                    <Text style={styles.settingTitle}>Instagram</Text>
                </View>
                <TouchableOpacity style={GlobalStyles.buttonNotClicked} onPress={() => { }}>
                    <Text style={[GlobalStyles.buttonNotClickedText]}>Link</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.settingView}>
                <View style={{ flexDirection: "row" }}>
                    <FontAwesome name="youtube-play" size={20} color={"#000"} style={styles.settingIcon} />
                    <Text style={styles.settingTitle}>Youtube</Text>
                </View>
                <TouchableOpacity style={GlobalStyles.buttonNotClicked} onPress={() => { }}>
                    <Text style={[GlobalStyles.buttonNotClickedText]}>Link</Text>
                </TouchableOpacity>
            </View>

            <View style={{ borderColor: "#000", borderBottomWidth: 0.5, marginVertical: 15 }} />

            <Text style={{ fontWeight: "400", fontSize: 12, paddingHorizontal: 20, marginTop: 10, marginBottom: 15 }}>Permissions</Text>
            <View style={styles.settingView}>
                <View style={{ flexDirection: "row" }}>
                    <FontAwesome name="camera" size={20} color={"#000"} style={styles.settingIcon} />
                    <Text style={styles.settingTitle}>Camera</Text>
                </View>
                <TouchableOpacity style={GlobalStyles.buttonClicked} onPress={() => { }}>
                    <Text style={[GlobalStyles.buttonClickedText]}>YES</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.settingView}>
                <View style={{ flexDirection: "row" }}>
                    <FontAwesome name="microphone" size={20} color={"#000"} style={styles.settingIcon} />
                    <Text style={styles.settingTitle}>Microphone</Text>
                </View>
                <TouchableOpacity style={GlobalStyles.buttonNotClicked} onPress={() => { }}>
                    <Text style={[GlobalStyles.buttonNotClickedText]}>NO</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.settingView}>
                <View style={{ flexDirection: "row" }}>
                    <MaterialCommunityIcons name="crosshairs-gps" size={20} color={"#000"} style={styles.settingIcon} />
                    <Text style={styles.settingTitle}>GPS</Text>
                </View>
                <TouchableOpacity style={GlobalStyles.buttonNotClicked} onPress={() => { }}>
                    <Text style={[GlobalStyles.buttonNotClickedText]}>NO</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )

    return (
        <View style={{ flex: 1,marginTop:50 }}>
            <StatusBar
                translucent={true}
                animated={true}
                barStyle="light-content"
                backgroundColor='transparent'
                hidden={false}
            />
            {/* <ImageBackground
                style={{ height: 270 }}
                source={require('../assets/images/aboutPageBg.png')}
            >
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", marginTop: 30, justifyContent: "space-between" }}>
                        <Feather name="arrow-left" size={25} color={"#FFF"} style={{ marginStart: 15 }} />
                        <Text style={{ color: "#FFF", fontWeight: "600", fontSize: 18 }}>LOGO</Text>
                        <Feather name="menu" size={25} color={"#FFF"} style={{ marginEnd: 15 }} onPress={() => props.navigation.openDrawer()} />
                    </View>
                    <View style={{ position: "absolute", bottom: 0, flexDirection: "row", margin: 10 }}>
                        <Image
                            style={{ height: 50, width: 50 }}
                            source={require('../assets/images/profile-pic.png')}
                        />
                        <View style={{ marginStart: 10, alignSelf: "center" }}>
                            <Text style={{ color: "#FFF", fontWeight: "bold", fontSize: 14 }}>Alexio Morales</Text>
                            <Text style={{ color: "#FFF", fontWeight: "400", fontSize: 12 }}>Dubai, United Arab Emirates</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground> */}

            
            <SettingsView />

            <Modal
                transparent={true}
                visible={AuthModal}
            >
                <View style={{ height, width, backgroundColor: '#000000aa' }}>
                    <View style={[GlobalStyles.box]}>
                        <View style={[GlobalStyles.TextInputView, { marginTop: 30 }]}>

                            <TextInput style={[GlobalStyles.TextInput]}
                                placeholder={"ACCESS TOKEN"}
                                placeholderTextColor={"#FFF"}
                                onChangeText={val => { }}
                            />
                        </View>
                        <View style={[GlobalStyles.TextInputView, { marginTop: 30 }]}>

                            <TextInput style={[GlobalStyles.TextInput]}
                                placeholder={"TOKEN TYPE"}
                                placeholderTextColor={"#FFF"}
                                onChangeText={val => { }}
                            />
                        </View>
                        <View style={[GlobalStyles.TextInputView, { marginTop: 30 }]}>

                            <TextInput style={[GlobalStyles.TextInput]}
                                placeholder={"REFRESH TYPE"}
                                placeholderTextColor={"#FFF"}
                                onChangeText={val => { }}
                            />
                        </View>
                        <TouchableOpacity
                            style={[GlobalStyles.Button, { width: (width / 100) * 80, marginTop: 30 }]}
                            onPress={() => setAuthModal(false)}
                        >
                            {/* <Text style={{ color: "#FFF", fontSize: 14, fontWeight: "700" }}>LOGIN</Text> */}
                            <SimpleLineIcons name={'link'} size={20} color={'#FFF'} />
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    AboutInfoContainer: {
        flexDirection: "row",
        height: 60,
        width: "100%",
        // justifyContent:"space-evenly",
        // paddingStart:"5%",
        // paddingEnd:"5%",
        backgroundColor: "#FFF",
        elevation: 600,
        alignItems: "center"
    },
    AboutInfoView: {
        height: 60,
        width: "33.33%",
        alignItems: "center",
        justifyContent: "center",
    },
    AboutTitle: { fontSize: 10 },
    AboutText: {
        fontSize: 18,
        fontWeight: "600"
    },
    settingTitle: { fontSize: 14, fontWeight: "500" },
    settingIcon: { height: 20, width: 20, marginEnd: 10 },
    settingView: { width: "100%", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20, marginVertical: 10 },
    timelineCountsContainer: { width: "33.33%", flexDirection: "row", alignItems: "center", justifyContent: "center" },
})