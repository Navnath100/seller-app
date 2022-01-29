import React from 'react'
import { View, Text, Dimensions, StatusBar, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import colors from '../assets/colors'
import Header from '../components/Header';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GlobalStyles from '../components/GlobalStylesheet';
import CardView from 'react-native-cardview';

const { height, width } = Dimensions.get('window');
const cardWidth = (width / 100) * 90
export default function LiveScheduled({navigation}) {
    return (
        <>
            <StatusBar
                translucent={true}
                animated={true}
                barStyle="light-content"
                backgroundColor='transparent'
                hidden={false}
            />
            <Header navigation={navigation} />
            <View style={{ height: height - 45 }} >
                <View style={GlobalStyles.circleContainer}>
                    <View style={[GlobalStyles.buttonClicked, GlobalStyles.circle]}>
                        <MaterialCommunityIcons name='check-bold' size={25} color={colors.white} />
                    </View>
                    <View style={[GlobalStyles.buttonClicked, GlobalStyles.circle]}>
                        <MaterialCommunityIcons name='check-bold' size={25} color={colors.white} />
                    </View>
                    <View style={[GlobalStyles.buttonClicked, GlobalStyles.circle]}>
                        <MaterialCommunityIcons name='check-bold' size={25} color={colors.white} />
                    </View>
                    <View style={[GlobalStyles.buttonClicked, GlobalStyles.circle]}>
                        <MaterialCommunityIcons name='check-bold' size={25} color={colors.white} />
                    </View>
                    <View style={[GlobalStyles.buttonClicked, GlobalStyles.circle]}>
                        <MaterialCommunityIcons name='check-bold' size={25} color={colors.white} />
                    </View>
                </View>

                <CardView
                    cardElevation={5}
                    cardMaxElevation={2}
                    cornerRadius={20}
                    style={{ width: cardWidth, margin: 20, alignItems: 'center', justifyContent: 'center', marginVertical: 30 }}
                >
                    {/* <View style={{ width: cardWidth }}> */}
                        <Text style={{ fontSize: 100, textAlign: 'center', marginVertical: 30,color:colors.black }}>🎉</Text>
                        <Text style={styles.thankYouText}>YAY!</Text>
                        <Text style={styles.signUpCompletionText}>Your Live Stream has been scheduled successfully. We will notify you 30 minutes before the schedule.</Text>
                        <Text style={[styles.signUpCompletionText, { fontWeight: '600' }]}>Have a great day!</Text>
                    {/* </View> */}
                </CardView>

                <TouchableOpacity 
                style={[GlobalStyles.buttonClicked, { height: 50, width: width / 100 * 90, position: 'absolute', bottom: 10, alignSelf: 'center' }]}
                onPress={()=>navigation.navigate("Home")}
                >
                    <SimpleLineIcons name='home' size={20} color={colors.white} />
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    thankYouText : { fontSize: 24 ,textAlign:'center',fontWeight:'800',color:'#000'},
    signUpCompletionText : { width:'80%',fontSize: 18 ,textAlign:'center',alignSelf:'center',fontWeight:'400',color:'#000',padding:10}

})
