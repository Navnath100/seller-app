import React,{useState} from 'react'
import { View, Text, StatusBar, ImageBackground, Image, TextInput, TouchableOpacity, SafeAreaView, TouchableNativeFeedback, ScrollView, StyleSheet } from 'react-native'
import GlobalStyles from '../components/GlobalStylesheet'
import SelectDropdown from 'react-native-select-dropdown'
import DropDownPicker from 'react-native-dropdown-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CountryDropdown from '../components/countryDropdown';
import Feather from 'react-native-vector-icons/Feather';

export default SignUp = () => {
    const [username, setUserName] = React.useState(undefined);
    const [password, setPassword] = React.useState(undefined);
    const [countryCodeSelectionDropdown, setCountryCodeSelectionDropdown] = React.useState(false);
    const [signUpStep, setSignUpStep] = useState('first')
    const [selectedCountry, setSelectedCountry] = React.useState({ "code": "IN", "dial_code": "+91", "flag": "🇮🇳", "name": { "by": "", "cz": "Indie", "en": "India", "pl": "Indie", "ru": "Индия", "ua": "Індія" } });
    // console.log(selectedCountry);

    const handleDropdownVisibility = (selectedCountry) => {
        setSelectedCountry(selectedCountry);
        setCountryCodeSelectionDropdown(!countryCodeSelectionDropdown);
    }

    const FirstStepSignUp = () => (
        <View style={GlobalStyles.box}>
            <ScrollView>
                <Text style={{ fontSize: 48, color: "#FFFFFF", fontWeight: "600", alignSelf: "center" }}>LOGO</Text>
                <Text style={{ fontSize: 18, color: "#FFFFFF", fontWeight: "600", marginTop: 25, alignSelf: "center" }}>FILL YOUR INFORMATION</Text>

                <View style={[GlobalStyles.TextInputView, { marginTop: 30 }]}>
                    <Image
                        style={{ marginEnd: 10 }}
                        source={require('../assets/Icons/acc.png')}
                    />
                    <TextInput style={[GlobalStyles.TextInput]}
                        placeholder={"FULL NAME"}
                        placeholderTextColor={"#FFF"}
                        numberOfLines={1}
                        defaultValue={username}
                        onChangeText={val => setUserName(val)}
                    />
                </View>
                <View style={[GlobalStyles.TextInputView, { marginTop: 30 }]}>
                    <Image
                        style={{ marginEnd: 10 }}
                        source={require('../assets/Icons/acc.png')}
                    />
                    <TextInput style={[GlobalStyles.TextInput]}
                        placeholder={"COMPANY NAME"}
                        placeholderTextColor={"#FFF"}
                        numberOfLines={1}
                        defaultValue={username}
                        onChangeText={val => setUserName(val)}
                    />
                </View>
                <View style={[GlobalStyles.TextInputView, { marginTop: 30 }]}>
                    <Image
                        style={{ marginEnd: 10 }}
                        source={require('../assets/Icons/acc.png')}
                    />
                    <TextInput style={[GlobalStyles.TextInput]}
                        placeholder={"COUNTRY"}
                        placeholderTextColor={"#FFF"}
                        numberOfLines={1}
                        defaultValue={username}
                        onChangeText={val => setUserName(val)}
                    />
                </View>

                <View style={[GlobalStyles.TextInputView, { alignSelf: "center", marginTop: 30 }]}>
                    <TouchableOpacity
                        style={{ height: 40, borderRadius: 15, width: 80, backgroundColor: "#4185EF", flexDirection: "row", marginEnd: 2, alignItems: "center", justifyContent: "center" }}
                        onPress={() => setCountryCodeSelectionDropdown(!countryCodeSelectionDropdown)}
                    >
                        <Text style={{ marginEnd: 5, fontSize: 14, color: "#FFF" }}>{selectedCountry.flag}  {selectedCountry.dial_code}</Text>
                        <FontAwesome name="angle-down" size={25} color={"#FFF"} />

                    </TouchableOpacity>
                    <CountryDropdown visibility={countryCodeSelectionDropdown} handleDropdownVisibility={handleDropdownVisibility} />

                    <TextInput style={[GlobalStyles.TextInput]}
                        placeholder={"OTP"}
                        placeholderTextColor={"#FFF"}
                        secureTextEntry={false}
                        onChangeText={val => setPassword(val)}
                    />
                </View>
                {/* <View style={[GlobalStyles.TextInputView, { marginTop: 30 }]}>
                        <Image
                            style={{ marginEnd: 10, alignSelf: "flex-end", marginBottom: 10 }}
                            source={require('../assets/Icons/otp.png')}
                        />
                        <TextInput style={[GlobalStyles.TextInput]}
                            placeholder={"OTP"}
                            placeholderTextColor={"#FFF"}
                            secureTextEntry={true}
                            onChangeText={val => setPassword(val)}
                        />
                    </View>

                    <View style={[GlobalStyles.TextInputView, { marginTop: 30, height: 160, alignItems: "flex-start", justifyContent: 'flex-start' }]}>
                        <TextInput style={[GlobalStyles.TextInput, { alignSelf: "flex-start", height: 145, textAlign: "left", textAlignVertical: "top", borderRadius: 20, marginTop: 0 }]}
                            placeholder={"ABOUT YOU"}
                            placeholderTextColor={"#FFF"}
                            multiline={true}
                            onChangeText={val => setPassword(val)}
                        />
                    </View> */}

                <TouchableOpacity 
                style={[GlobalStyles.Button, { width: "80%", backgroundColor: "#000000", alignSelf: "center", marginTop: 20 }]}
                onPress={()=>setSignUpStep('second')}
                >
                    <Text style={{ color: "#FFF", fontSize: 14, fontWeight: "700" }}>CONTINUE</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )

    const SecondStepSignUp = () => (
        <View style={GlobalStyles.box}>
            <ScrollView>
                <Text style={{ fontSize: 48, color: "#FFFFFF", fontWeight: "600", alignSelf: "center" }}>LOGO</Text>
                <Text style={{ fontSize: 18, color: "#FFFFFF", fontWeight: "600", marginTop: 25, alignSelf: "center" }}>FILL YOUR INFORMATION</Text>
                <View style={[GlobalStyles.TextInputView, { marginTop: 30 }]}>
                    <Image
                        style={{ marginEnd: 10 }}
                        source={require('../assets/Icons/otp.png')}
                    />
                    <TextInput style={[GlobalStyles.TextInput]}
                        placeholder={"OTP"}
                        placeholderTextColor={"#FFF"}
                        secureTextEntry={true}
                        onChangeText={val => setPassword(val)}
                    />
                </View>

                <View style={[GlobalStyles.TextInputView, { marginTop: 30, height: 160, alignItems: "flex-start", justifyContent: 'flex-start' }]}>
                    <TextInput style={[GlobalStyles.TextInput, { alignSelf: "flex-start", height: 145, textAlign: "left", textAlignVertical: "top", borderRadius: 20, marginTop: 0 }]}
                        placeholder={"ABOUT YOU"}
                        placeholderTextColor={"#FFF"}
                        multiline={true}
                        onChangeText={val => setPassword(val)}
                    />
                </View>

                <TouchableOpacity 
                style={[GlobalStyles.Button, { width: "80%", backgroundColor: "#000000", alignSelf: "center", marginTop: 20 }]}
                onPress={()=>setSignUpStep('completed')}
                >
                    {/* <Text style={{ color: "#FFF", fontSize: 14, fontWeight: "700" }}>CONTINUE</Text> */}
                    <Feather name="check" size={35} color={"#FFF"} />
                </TouchableOpacity>
            </ScrollView>
        </View>
    )

    const OnCompletionSignUp = () => (
        <View style={GlobalStyles.box}>
            <Text style={{ fontSize: 100 ,textAlign:'center',marginVertical:30}}>🎉</Text>
            <Text style={styles.thankYouText}>THANK YOU</Text>
            <Text style={styles.signUpCompletionText}>...for showing your interest. Our seller support team will get in touch with you within 24-48 hrs.</Text>
            <Text style={[styles.signUpCompletionText,{fontWeight:'800'}]}>Have a nice day!</Text>
        </View>
    )



    return (
        <View style={styles.container}>
            <StatusBar
                animated={true}
                barStyle="dark-content"
                backgroundColor="#FFF"
                hidden={false}
            />
            <ImageBackground
                style={{ flex: 1, alignItems: "center" }}
                source={require('../assets/Icons/AuthBg.png')}>

                {
                    signUpStep == "first" ?
                        <FirstStepSignUp /> : null

                }

                {
                    signUpStep == 'second' ?
                        <SecondStepSignUp /> : null
                }
                {
                    signUpStep == 'completed' ?
                        <OnCompletionSignUp /> : null
                }


            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{ flex: 1, backgroundColor: "transparent" },
    thankYouText : { fontSize: 24 ,textAlign:'center',fontWeight:'800',color:'#fff'},
    signUpCompletionText : { width:'80%',fontSize: 18 ,textAlign:'center',alignSelf:'center',fontWeight:'600',color:'#fff',padding:10}
})
