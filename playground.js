import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  View,
  ScrollView,
} from 'react-native';
// import {Button} from 'react-native-elements';
import RtmEngine, { RtmMessage } from 'agora-react-native-rtm';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-community/async-storage';

const Chat = ({ navigation }) => {
  const [text, onChangeText] = React.useState('');
  const [msgs, setMsgs] = React.useState([]);
  const [name, setName] = React.useState('');
  const rtmEngine = new RtmEngine();

  async function user() {
    try {
      const userName = await AsyncStorage.getItem('userToken');
      setName(userName);
      await rtmEngine.createInstance('a457c62a9459477aba4b1ba9a1cecf31');
      await rtmEngine.loginV2(userName);
      await rtmEngine.joinChannel('tech');
    } catch (e) {
      alert("While setName :" + e);
    }
  }

  useEffect(() => {
    // leave()
    user();
  }, []);
  // rtmEngine?.logout();
  async function send() {
    try {
      // console.log('msg:', typeof text);
      rtmEngine.sendMessage('tech', new RtmMessage(text), {});
      setMsgs([...msgs, `${text} - ${name}`]);
      //console.log(msgs);
    } catch (e) {
      alert(e);
    }
  }
  rtmEngine.addListener('ChannelMessageReceived', (msg, sender) => {
    setMsgs([...msgs, `${msg.text} - ${sender.userId}`]);
  });

  async function leave() {
    try {
      await rtmEngine.leaveChannel('tech');
      rtmEngine.release('a457c62a9459477aba4b1ba9a1cecf31');
    } catch (e) {
      console.log("catched while leave : " + e);
    }
  }

  return (
    <SafeAreaView style={styles.bgLoginSignup}>
      <Text
        style={{
          color: '#dbdbdb',
          textAlign: 'center',
          marginTop: 50,
          fontSize: 40,
        }}>
        Chat
      </Text>
      <TouchableOpacity onPress={leave}>
        <Text
          style={{
            color: 'lightgrey',
            textAlign: 'center',
            marginTop: 50,
            fontSize: 15,
            color: 'red',
          }}>
          Leave Channel
        </Text>
      </TouchableOpacity>
      <ScrollView>
        {
          msgs.map(msg => {
            return (
              <Text
                key={msg + Math.random() * 10000}
                style={{ color: 'white', marginTop: 10, paddingLeft: 20 }}>
                {msg}
              </Text>
            );
          })}
      </ScrollView>
      <View style={{ marginBottom: 5, marginTop: 10 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <TextInput
            style={{
              width: 300,
              borderColor: 'white',
              borderWidth: 1,
              borderRadius: 5,
              color: 'white',
              height: 41,
            }}
            onChangeText={onChangeText}
          />
          <TouchableOpacity onPress={send} >
            <Text style={{ color: "#fff" }}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );

};

export default Chat;

const styles = StyleSheet.create({
  bgLoginSignup: {
    backgroundColor: '#252B39',
    flex: 1,
  },
});
