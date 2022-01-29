import React, { useState } from 'react'
import { View, Text, TextInput, Image,ScrollView, TouchableNativeFeedback, Dimensions, TouchableOpacity, ImageBackground, StatusBar, Alert } from 'react-native'
import GlobalStyles from '../components/GlobalStylesheet'
import * as RNLocalize from "react-native-localize";
import RNLocation from 'react-native-location';
import { AuthContext } from '../components/context';
import Users from '../model/users';
import CountryDropdown from '../components/countryDropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import BouncyCheckbox from "react-native-bouncy-checkbox";

const width = Dimensions.get('window').width

export default SignIn = () => {
    // RNLocation.configure({
    //     distanceFilter: null
    //    })
    const { signIn } = React.useContext(AuthContext);
    const [phoneNo, setPhoneNo] = React.useState(undefined);
    const [password, setPassword] = React.useState(undefined);
    const [countryCodeSelectionDropdown, setCountryCodeSelectionDropdown] = useState(false)
    const [selectedCountry, setSelectedCountry] = React.useState({ "code": "IN", "dial_code": "+91", "flag": "🇮🇳", "name": { "by": "", "cz": "Indie", "en": "India", "pl": "Indie", "ru": "Индия", "ua": "Індія" } });

    const handleDropdownVisibility = (selectedCountry) => {
        setSelectedCountry(selectedCountry);
        setCountryCodeSelectionDropdown(!countryCodeSelectionDropdown);
    }

    const getUerPermision = async () => {
        permission = await RNLocation.requestPermission({
            ios: "whenInUse",
            android: {
                detail: "coarse",
                rationale: {
                    title: "We need to access your location",
                    message: "We use your location to show where you are on the map",
                    buttonPositive: "OK",
                    buttonNegative: "Cancel"
                }
            }
        })
        // console.log(permission)
    }
    const permissionHandle = async () => {
        console.log('here')
        let permission = await RNLocation.checkPermission({
            ios: 'whenInUse', // or 'always'
            android: {
                detail: 'coarse' // or 'fine'
            }
        });
        console.log(permission)
        if (!permission) {
            getUerPermision();
        } else {
            let location = await RNLocation.getLatestLocation({ timeout: 100 })
            console.log(location, location.longitude, location.latitude,
                location.timestamp)
            console.log(RNLocalize.getCountry());
        }
    }

    // permissionHandle();
    const loginHandle = (username, password) => {

        const foundUser = Users.filter(item => {
            return username == item.username && password == item.password;
        });

        if (username == "" || password == "") {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                { text: 'Okay' }
            ]);
            return;
        }

        if (foundUser.length == 0) {
            Alert.alert('Invalid User!', 'Username or password is incorrect.', [
                { text: 'Okay' }
            ]);
            return;
        }
        signIn(foundUser);
    }

    return (
        <View style={{ flex: 1, backgroundColor: "transparent" }}>
            <StatusBar
                animated={true}
                barStyle="dark-content"
                backgroundColor="#FFF"
                hidden={false}
            />
            <ImageBackground
                style={{ flex: 1, backgroundColor: "#fff", alignItems: "center" }}
                source={require('../assets/Icons/AuthBg.png')}>
                    <ScrollView>
                <View style={GlobalStyles.box}>
                    <Text style={{ fontSize: 48, color: "#FFFFFF", fontWeight: "600" }}>LOGO</Text>
                    <Text style={{ fontSize: 18, color: "#FFFFFF", fontWeight: "600", marginTop: 25 }}>Login</Text>
                    <View style={[GlobalStyles.TextInputView, { marginTop: 30 }]}>
                        <TouchableOpacity
                            style={{ height: 40, width: 90, borderRadius: 15, backgroundColor: "#4185EF", flexDirection: "row", alignItems: "center", justifyContent: "center" }}
                            onPress={() => setCountryCodeSelectionDropdown(!countryCodeSelectionDropdown)}
                        >
                            <Text style={{ marginEnd: 5, fontSize: 14, color: "#FFF" }}>{selectedCountry.flag}  {selectedCountry.dial_code}</Text>
                            <FontAwesome name="angle-down" size={25} color={"#FFF"} />

                        </TouchableOpacity>
                        <View style={{ height: 20, width: 1, borderColor: "#FFF", borderEndWidth: 1, marginHorizontal: 10, alignSelf: 'center' }} />
                        <CountryDropdown visibility={countryCodeSelectionDropdown} handleDropdownVisibility={handleDropdownVisibility} />
                        <TextInput style={[GlobalStyles.TextInput]}
                            placeholder={"PHONE NUMBER"}
                            placeholderTextColor={"#FFF"}
                            defaultValue={phoneNo}
                            onChangeText={val => setPhoneNo(val)}
                        />
                    </View>
                    <View style={[GlobalStyles.TextInputView, { marginTop: 30 }]}>
                        <Image
                            style={{ marginHorizontal: 10, alignSelf: "center" }}
                            source={require('../assets/Icons/otp.png')}
                        />
                        <TextInput style={[GlobalStyles.TextInput]}
                            placeholder={"PIN"}
                            placeholderTextColor={"#FFF"}
                            secureTextEntry={true}
                            keyboardType='number-pad'
                            onChangeText={val => setPassword(val)}
                        />
                    </View>

                    <Text style={{ fontSize: 12, color: "#FFFFFF", fontWeight: "600", marginBottom: 20, marginTop: 10, alignSelf: 'flex-end', marginEnd: (width / 100) * 10 }}>RESEND PIN? <Text style={{ fontWeight: 'bold' }}>2:24</Text></Text>

                    <View style={{ flexDirection: 'row' }}>
                        <BouncyCheckbox
                            size={15}
                            style={{alignSelf:'flex-start',marginEnd:5}}
                            disableText={true}
                            isChecked={true}
                            fillColor='#FFF'
                            iconComponent={<Feather name="check" size={12} color={"#4185EF"} />}
                            onPress={(isChecked: true) => { }}
                        />
                        <View style={{ flexDirection: "column" }}>
                            <Text style={{ fontSize: 8, fontWeight: '400', color: '#FFF' }}>I have read and agreed to the following policies</Text>
                            <Text style={{ fontSize: 9, fontWeight: '600', color: '#FFF', marginBottom: 20 }}>T&C, Privacy Policy, Children Protective Rules</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={[GlobalStyles.Button, { width: "80%", backgroundColor: "#000000" }]}
                        onPress={() => loginHandle(phoneNo, password)}
                    >
                        <Text style={{ color: "#FFF", fontSize: 14, fontWeight: "700" }}>LOGIN</Text>
                    </TouchableOpacity>

                </View>
                </ScrollView>
            </ImageBackground>
        </View>
    )
}
