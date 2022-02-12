import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList, Image,ImageBackground } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import Users from '../../model/users';
import colors from '../../assets/colors';
import GlobalStyles from '../../components/GlobalStylesheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native-gesture-handler';
import RtmEngine, { RtmMessage } from 'agora-react-native-rtm';
const { height, width } = Dimensions.get("window")

export default function OverlayComponentOnLive(props) {
    const _RtmEngine = new RtmEngine();

    const [user, setUser] = useState({ username: "Navnath" })
    const [InstanceID, setInstanceID] = useState("a457c62a9459477aba4b1ba9a1cecf31");
    const [ChannelID, setChannelID] = useState("tech");
    const [Message, setMessage] = React.useState('');
    const [AllMessages, setAllMessages] = React.useState([]);
    
    useEffect(() => {
        getUserDetails();
        initializeRtm();
    }, []);
    
    async function getUserDetails() {
        try {
            const username = await AsyncStorage.getItem("userToken");
            const foundUser = Users.filter(item => {
                return username == item.username;
            });
            setUser(foundUser[0]);
        } catch (error) {
            alert("error : ", error);
        }
    }

    async function initializeRtm() {
        
        // console.log(user);
        try {
            leave().then(async() => {
                await _RtmEngine.createInstance(InstanceID);
                await _RtmEngine.loginV2(user.username);
                await _RtmEngine.joinChannel(ChannelID);
            });
        } catch (e) {
            alert("While initializeRtm :" + e);
        }
    }

    async function send() {
        try {
            _RtmEngine.sendMessage(ChannelID, new RtmMessage(Message), {});
            setAllMessages([...AllMessages, `${Message} - ${user.username}`]);
            setMessage("")
        } catch (e) {
            alert(e);
        }
    }
    
    _RtmEngine.addListener('ChannelMessageReceived', (msg, sender) => {
        console.log("MessageReceived", msg, sender);
        setAllMessages([...msgs, `${msg.text} - ${sender.userId}`]);
        // alert(sender.userId);
    });
    async function leave() {
        try {
            await _RtmEngine.leaveChannel(ChannelID);
            _RtmEngine.release(InstanceID);
        } catch (e) {
            console.log("catched while leaving : " + e);
        }
    }

    const RenderPrducts = () => {
        return (
            <View style={{ height: 90, width: 250, borderRadius: 5, padding: 5, backgroundColor: "#00000099" }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image
                        style={{ width: 40, height: 40, borderRadius: 100 }}
                        source={{ uri: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRFrVLNkAzNiKdiC7hr4Jq7vgLHqQoL1hnJns0Pe6eJ5X7ykFpG" }}
                    />
                    <View style={{ marginStart: 10 }}>
                        <Text style={{ fontSize: 12, fontWeight: '600', color: colors.white }}>Beer Honey T-shirt</Text>
                        <Text style={{ fontSize: 14, fontWeight: '700', color: colors.primary }}>$15.99</Text>
                    </View>
                </View>
                <Text style={{ fontSize: 12, fontWeight: '600', color: colors.white, margin: 2 }}>00:31</Text>
                <Text style={{ fontSize: 8, fontWeight: '300', color: colors.white, margin: 2 }}>Time left for this product</Text>
            </View>
        );
    }
    const RenderMessages = ({ item }) => {
        return (
            <View style={{ width: width / 100 * 95, borderRadius: 5, backgroundColor: "#00000099", marginBottom: 2 }}>
                <Text style={{ fontSize: 10, fontWeight: '500', color: colors.white, margin: 2, padding: 8 }}>{item}</Text>
            </View>
        );
    }

    return (
        <View
            style={{ elevation:1,position: 'absolute', height: height, width: width, paddingStart: 10, paddingEnd: 10,backgroundColor: "transparent" }}
            source={require('../../assets/images/tv.png')}
        >
            {/* <ImageBackground
            style={{ position: 'absolute', height: 200, width: 250, paddingStart: 10, paddingEnd: 10,backgroundColor:props.videoCall ? "transparent" : colors.dark }}
            source={require('../../assets/images/tv.png')}
        >
            <Text style={{fontSize:18,fontWeight:"600"}}>Live Stream has ended but you can comment and chat with the customers!</Text>
        </ImageBackground> */}
            <View style={{ flexDirection: 'row', marginTop: 70, justifyContent: 'space-between'}}>
                <View style={{ flexDirection: "row" }}>
                    <Image
                        style={{ height: 50, width: 50, borderRadius: 100 }}
                        source={{
                            uri: 'https://www.htplonline.com/wp-content/uploads/2020/01/Awesome-Profile-Pictures-for-Guys-look-away2.jpg',
                        }}
                    />
                    <Text style={{ width: width / 100 * 50, fontSize: 18, fontWeight: "700", color: colors.white, paddingStart: 5 }}>Saurav Sinha{'\n'}
                        <Text style={{ fontSize: 12, fontWeight: "500" }}>Christmas Sale | Get Flat 30% OFF on all the 5 products | Hurry Up!</Text></Text>
                </View>
                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 24, fontWeight: "700", color: colors.white }}>04:31</Text>
                    <View style={[GlobalStyles.buttonClicked, { width: 60, marginTop: 10 }]}>
                        <Text style={[{ fontSize: 12, fontWeight: "700", color: colors.white }]}>Live</Text>
                    </View>
                    <View style={{ height: 40, width: 40, marginTop: 20, flexWrap: 'wrap' }}>
                        <View style={{ position: "absolute", height: 20, width: 20, borderRadius: 100, top: -5, end: -5, alignSelf: 'flex-end', backgroundColor: colors.primary, elevation: 1, zIndex: 1, alignItems: "center", justifyContent: 'center' }}>
                            <Text style={{ fontSize: 10, fontWeight: "600", color: colors.white }}>76</Text>
                        </View>
                        <AntDesign name={"shoppingcart"} size={40} color={colors.white} />
                    </View>
                </View>
            </View>
            {/* <View style={{ backgroundColor: colors.bgBlack, marginStart: -20, marginTop: height / 100 * 15, flexDirection: 'row', padding: 20, alignItems: 'center', alignSelf: 'flex-start', borderTopEndRadius: 5, borderBottomEndRadius: 5 }}>
                    <Text style={{ fontSize: 14, fontWeight: "700", color: colors.white, marginEnd: 10 }}>1 Minute remaining</Text>
                    <AntDesign name={"clockcircle"} size={20} color={colors.white} />
                </View> */}
            <View style={{ position: 'absolute', bottom: 206, elevation: 1, zIndex: 1, alignSelf: 'center' }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={AllMessages}
                    renderItem={RenderMessages}
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent={() => <View style={{ marginEnd: 5 }} />}
                />
            </View>
            <View style={{ width: width / 100 * 95, height: 40, backgroundColor: "#00000099", flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, justifyContent: 'space-between', borderRadius: 5, position: 'absolute', bottom: 161, elevation: 1, zIndex: 1, alignSelf: 'center' }}>
                <TextInput
                    style={{ width: width - 80 / 100 * 95, fontSize: 12, fontWeight: "500", color: colors.white }}
                    placeholder={"Say something..."}
                    placeholderTextColor={colors.white}
                    defaultValue={Message}
                    onChangeText={(text) => setMessage(text)}
                />
                <Ionicons
                    style={{ height: 30, width: 30, padding: 6, borderRadius: 100, backgroundColor: colors.primary }}
                    name={"send"} size={18}
                    color={colors.white}
                    onPress={() => send()}
                />
            </View>
            <View style={{ position: 'absolute', bottom: 66, elevation: 1, zIndex: 1, alignSelf: 'center' }}>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={[{}, {}, {}, {}]}
                    renderItem={RenderPrducts}
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent={() => <View style={{ marginEnd: 5 }} />}
                />
            </View>
        </View>
    );
}
