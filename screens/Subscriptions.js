import React,{useState,useEffect} from 'react'
import { View, Text, StatusBar, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import colors from '../assets/colors'
import Header from '../components/Header'

const { height, width } = Dimensions.get('window');
export default function Subscriptions(props) {
    const [plan, setPlan] = useState('450')
    return (
        <>
            <StatusBar
                translucent={true}
                animated={true}
                barStyle="light-content"
                backgroundColor='transparent'
                hidden={false}
            />
            <Header navigation={props.navigation} />
            <View style={{ alignItems: 'center', marginVertical: height / 100 * 5 }}>
                <Text style={{ fontSize: 18, fontWeight: '500', fontFamily: 'Poppins-Regular' }}>We have 3 Days trial</Text>
                <Text style={{ fontSize: 18, fontWeight: '500', fontFamily: 'Poppins-Regular' }}>Subscription Plan  🔥</Text>
            </View>
            <View style={[, styles.btnContainer, { height: 50 }]}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Regular', color: '#fff' }}>START TRIAL NOW</Text>
            </View>
            <View style={{ alignItems: 'center', marginVertical: height / 100 * 5 }}>
                <Text style={{ fontSize: 18, fontWeight: '600', fontFamily: 'Poppins-Regular' }}>Our Subscription Plans  ☺️</Text>
            </View>
            <TouchableOpacity onPress={()=>setPlan('450')}>
                <View style={[styles.btnContainer, plan == '450'? styles.btnClickedContainer :styles.btnNotClickedContainer]}>
                    <Text style={[styles.btnText, {color:plan == '450'? "#FFF" : colors.primary }]}>₹450/
                    <Text style={[styles.btnText, {color:plan == '450'? "#FFF" : colors.primary } ,{ fontSize: 24 }]}>month</Text>
                    </Text>
                    <Text style={[styles.btnText, {color:plan == '450'? "#FFF" : colors.primary }, { fontSize: 18 }]}>Basic Subscription</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setPlan('650')}>
                <View style={[styles.btnContainer,plan == '650'? styles.btnClickedContainer : styles.btnNotClickedContainer]}>
                    <Text style={[styles.btnText,{color:plan == '650'? "#FFF" : colors.primary }]}>₹650/<Text style={[styles.btnText, {color:plan == '650'? "#FFF" : colors.primary },{ fontSize: 24 }]}>month</Text></Text>
                    <Text style={[styles.btnText, {color:plan == '650'? "#FFF" : colors.primary },{ fontSize: 18 }]}>Remove Watermark</Text>
                </View>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    btnContainer: {
        width: (width / 100) * 90,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        alignSelf: 'center',
        backgroundColor: colors.primary,
        marginVertical: 10
    },
    btnClickedContainer: {
        backgroundColor: colors.primary,
    },
    btnNotClickedContainer: {
        backgroundColor: '#ebf2ff',
    },
    btnText: { 
        fontSize: 36, 
        fontWeight: '600', 
        fontFamily: 'Poppins-Regular', 
        color: '#FFF' 
    },
})
