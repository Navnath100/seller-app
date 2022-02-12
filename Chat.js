import React, { useState, useEffect } from 'react';
import { Platform, SafeAreaView, StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RtcEngine, { RtcRemoteView, RtcLocalView, VideoRenderMode, } from 'react-native-agora';
// import requestCameraAndAudioPermission from './components/Permission';
// import styles from './components/Style';
import RtmEngine,{RtmMessage} from 'agora-react-native-rtm';

export default function Chat({navigation}) {
    // const _rtcEngine = RtcEngine;
    const _rtmEngine = new RtmEngine;

    const [appId, setAppId] = useState('a457c62a9459477aba4b1ba9a1cecf31');
    const [token, setToken] = useState(null);
    const [channelName, setChannelName] = useState("navn");
    const [inCall, setInCall] = useState(false);
    const [input, setInput] = useState("");
    const [inLobby, setInLobby] = useState(false);
    const [peerIds, setPeerIds] = useState([]); 
    const [seniors, setSeniors] = useState([]);
    const [myUsername, setMyUsername] = useState(`Navnath`);
    const [rooms, setRooms] = useState({});

    useEffect(() => {
        console.log("useEffect");
        // initRTC();
        initRTM();
    }, []);

    // componentWillUnmount() {
    //     this._rtmEngine?.destroyClient();
    //     this._rtcEngine?.destroy();
    // }
    /**
       * @name initRTM
       * @description Function to initialize the Rtm Engine, attach event listeners and use them to sync usernames
       */
    initRTM = async () => {
        try {
            
            await _rtmEngine.createInstance(appId).catch((e) => console.log("_rtmEngine.createClient : ", e));
            await _rtmEngine.loginV2(myUsername).catch((e) => console.log(" _rtmEngine.login : ", e));
            await _rtmEngine.joinChannel(channelName).catch((e) => console.log("_rtmEngine.joinChannel : ", e));
            setInLobby(true);
        } catch (error) {
            console.log("catched error : ", error);
        }
    };


    _rtmEngine.addListener('ChannelMessageReceived', (msg, sender) => {
        alert(msg, sender);
        // setSent(true);
        // let newMsg = msgs.concat(msg.text + ` by - ${sender.userId}`);
        // setMsgs(newMsg);
        // alert(msg.text);
        // alert(sender.userId);
    });
    

    async function send() {
        try {
          _rtmEngine.sendMessage(channelName, new RtmMessage(input), {});
        } catch (e) {
          alert("sendMessage : ",e);
        }
      }

    return (
        <SafeAreaView style={styles.max}>
            {!inLobby ? (
                <Text style={styles.waitText}>Please wait, joining room...</Text>
            ) : null}
            {
                inLobby ?
                    <View style={styles.fullView}>
                        <Text style={styles.subHeading}>Room List</Text>
                        <TextInput
                            value={input}
                            onChangeText={(val) => setInput(val)}
                            style={styles.input}
                            placeholder="Enter Room Name"
                        />
                        <TouchableOpacity
                            onPress={() => send()}
                            style={styles.button}>
                            <Text style={styles.buttonText}>Send</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("play") }
                            style={styles.button}>
                            <Text style={styles.buttonText}>Change</Text>
                        </TouchableOpacity>
                    </View>
                    : null
            }
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    max: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    button: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#38373A',
        marginBottom: 16,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
    fullView: {
        flex: 5,
        alignContent: 'center',
        marginHorizontal: 24,
    },
    subHeading: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 10,
    },
    waitText: {
        marginTop: 50,
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
    },
    roleText: {
        textAlign: 'center',
        // fontWeight: '700',
        color: '#fbfbfb',
        fontSize: 18,
    },
    spacer: {
        width: '100%',
        padding: '2%',
        marginBottom: 32,
        // borderWidth: 1,
        backgroundColor: '#38373A',
        color: '#fbfbfb',
        // borderColor: '#38373A',
    },
    input: {
        height: 40,
        borderColor: '#38373A',
        borderWidth: 1.5,
        width: '100%',
        alignSelf: 'center',
        padding: 10,
        marginBottom: 10,
    },
    roomsBtn: {
        padding: 8,
        marginBottom: 4,
        backgroundColor: '#38373A',
    },
    roomHead: { fontWeight: 'bold', color: '#fff', fontSize: 16 },
    whiteText: { color: '#fff' },
    video: { width: 150, height: 150 },
});