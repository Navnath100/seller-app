import React, { useState,useEffect } from 'react'
import { View, Text, StatusBar, ImageBackground, Image, ScrollView,TextInput, Platform, Modal, StyleSheet, Dimensions, TouchableOpacity, FlatList, SafeAreaView } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GlobalStyles from '../components/GlobalStylesheet'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default function Timeline(props) {
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

    const RenderTimeline = (params) => (
        <View>
            <View style={{ height: 100, borderStartWidth: 1, borderColor: "#4185EF", marginHorizontal: 20, justifyContent: 'center' }}>
                <View style={{ position: "absolute", height: 20, width: 20, borderWidth: 1, borderColor: "#4185EF", marginStart: -10, borderRadius: 100, backgroundColor: "#FFF", top: 40 }} />
                <View style={{ flexDirection: "row" }}>
                    <View style={{ height: 90, width: 90, marginStart: 20, borderRadius: 20, alignItems: 'center', justifyContent: "center" }}>
                        <Image
                            style={{ height: 90, width: 90, borderRadius: 20 }}
                            source={require('../assets/images/timeline-thumbnail.png')}
                        />
                        <MaterialCommunityIcons name="play-circle-outline" size={30} color={"#FFF"} style={{ position: 'absolute' }} />
                    </View>
                    <View style={{ width: (width - 170), position: "relative", height: 80, marginStart: 10, alignSelf: 'center', flexShrink: 1, justifyContent: "center" }}>
                        <Text style={{ position: "absolute", top: 0, fontSize: 8, fontWeight: "400", color: "#000", flexWrap: 'wrap' }}>23 December, 2021  |  Thursday</Text>
                        <View style={{ alignSelf: "center" }}>
                            <Text style={{ fontSize: 10, fontWeight: "500", color: "#000", flexWrap: 'wrap' }}>White Walkers Men's & Boys Multicolor Running Casual...</Text>
                        </View>

                        <View style={{ position: "absolute", bottom: 0, flexShrink: 1, flexDirection: "row", justifyContent: "space-evenly" }}>
                            <View style={styles.timelineCountsContainer}>
                                <MaterialCommunityIcons name="clock-outline" size={15} color={"#4185EF"} style={{ marginEnd: 2 }} />
                                <Text style={{ fontSize: 10, fontWeight: "400", alignSelf: "center" }}>5:12:45</Text>
                            </View>
                            <View style={styles.timelineCountsContainer}>
                                <MaterialCommunityIcons name="thumb-up-outline" size={15} color={"#4185EF"} style={{ marginEnd: 2 }} />
                                <Text style={{ fontSize: 10, fontWeight: "400", alignSelf: "center" }}>412K</Text>
                            </View>
                            <View style={styles.timelineCountsContainer}>
                                <MaterialCommunityIcons name="eye-outline" size={15} color={"#4185EF"} style={{ marginEnd: 2 }} />
                                <Text style={{ fontSize: 10, fontWeight: "400", alignSelf: "center" }}>573K</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ borderBottomWidth: 0.5, borderColor: "#000", marginStart: 40, marginVertical: 5 }} />
            </View>
        </View>
    );

    const TimelineView = (params) => (
        <FlatList
            data={[{}, {}, {}, {}, {}]}
            renderItem={RenderTimeline}
            keyExtractor={(item) => item.id}
        />
    );

    return (
        <View style={{ flex: 1 }}>
            <StatusBar
                translucent={true}
                animated={true}
                barStyle="light-content"
                backgroundColor='transparent'
                hidden={false}
            />
            <ImageBackground
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
                        {/* profile-pic */}
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
            </ImageBackground>

            <View style={styles.AboutInfoContainer}>
                <View style={[styles.AboutInfoView, {}]}>
                    <Text style={styles.AboutText}>125</Text>
                    <Text style={styles.AboutTitle}>FOLLOWERS</Text>
                </View>
                <View style={{ height: 40, borderStartColor: "gray", borderStartWidth: 0.5 }} />
                <View style={styles.AboutInfoView}>
                    <Text style={styles.AboutText}>150</Text>
                    <Text style={styles.AboutTitle}>FOLLOWING</Text>
                </View>
                <View style={{ height: 40, borderStartColor: "gray", borderStartWidth: 0.5 }} />
                <View style={styles.AboutInfoView}>
                    <Text style={styles.AboutText}>321</Text>
                    <Text style={styles.AboutTitle}>LIKES</Text>
                </View>
            </View>

            {/* <View style={[{ flexDirection: "row", justifyContent: "space-evenly", marginVertical: 20 }]}>
                <TouchableOpacity style={settingsVisibility ? GlobalStyles.buttonClicked : GlobalStyles.buttonNotClicked} onPress={() => Switch({ clicked: 1 })}>
                    <Text style={[settingsVisibility ? GlobalStyles.buttonClickedText : GlobalStyles.buttonNotClickedText]}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={settingsVisibility ? GlobalStyles.buttonNotClicked : GlobalStyles.buttonClicked} onPress={() => Switch({ clicked: 0 })}>
                    <Text style={[settingsVisibility ? GlobalStyles.buttonNotClickedText : GlobalStyles.buttonClickedText]}>Timeline</Text>
                </TouchableOpacity>
            </View> */}

            <TimelineView />

            <Modal
                transparent={true}
                visible={AuthModal}
            >
                <View style={{height,width,backgroundColor:'#000000aa'}}>
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
                        style={[GlobalStyles.Button, { width: (width/100)*80,marginTop:30  }]}
                        onPress={() => setAuthModal(false)}
                    >
                        {/* <Text style={{ color: "#FFF", fontSize: 14, fontWeight: "700" }}>LOGIN</Text> */}
                        <SimpleLineIcons name={'link'} size={20} color={'#FFF'}/>
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