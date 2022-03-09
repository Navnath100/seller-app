import React, { useState } from 'react'
import { View, Text, Dimensions, TextInput, ScrollView, StatusBar, StyleSheet, TouchableOpacity } from 'react-native'
import colors from '../assets/colors'
import Header from '../components/Header';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GlobalStyles from '../components/GlobalStylesheet';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import CardView from 'react-native-cardview';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker'

const { height, width } = Dimensions.get('window');
const cardWidth = (width / 100) * 95;
const cardHeight = cardWidth + ((cardWidth / 100) * 40);

export default function ScheduleLive({ navigation }) {
    const [Date, setDate] = useState(Date);
    //dropdown state
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("pm");
    const [items, setItems] = useState([
        { label: 'AM', value: 'am' },
        { label: 'PM', value: 'pm' }
    ]); //
    console.log(value);
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
            <View style={{}} >
                <ScrollView>
                    <View style={{ alignItems: 'center' }} >
                        <View style={GlobalStyles.circleContainer}>
                            <View style={[GlobalStyles.buttonClicked, GlobalStyles.circle]}>
                                <Octicons name='book' size={25} color={colors.white} />
                            </View>
                            <View style={[GlobalStyles.buttonClicked, GlobalStyles.circle]}>
                                <MaterialCommunityIcons name='shape' size={25} color={colors.white} />
                            </View>
                            <View style={[GlobalStyles.buttonClicked, GlobalStyles.circle]}>
                                <MaterialCommunityIcons name='clock' size={25} color={colors.white} />
                            </View>
                            <View style={[GlobalStyles.buttonClicked, GlobalStyles.circle]}>
                                <AntDesign name='sharealt' size={25} color={colors.white} />
                            </View>
                            <View style={[GlobalStyles.buttonClicked, GlobalStyles.circle]}>
                                <SimpleLineIcons name='control-play' size={20} color={colors.white} />
                            </View>
                        </View>

                        <Text style={{ color: colors.black, marginTop: 20, fontSize: 14, fontWeight: 'bold' }}>GO LIVE NOW</Text>

                        <TouchableOpacity style={[GlobalStyles.buttonClicked, { height: 50, width: width / 100 * 90, alignSelf: 'center', marginTop: 20 }]}>
                            <SimpleLineIcons name='control-play' size={20} color={colors.white} />
                        </TouchableOpacity>
                        <View style={{ width: width / 100 * 85, borderBottomColor: "#e6e6e6", borderBottomWidth: 1, marginVertical: 30 }} />

                        {/* <Text style={{ fontSize: 14, fontWeight: '400', marginVertical: 10, color: colors.black }}>Or Schedule the Live Stream</Text> */}
                        {/* <Text style={{ color: colors.black }}><Text style={{ fontSize: 14, fontWeight: 'bold' }}>Go Live Now </Text>or <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Schedule</Text> your Live Stream</Text> */}

                        {/* Calender View */}
                        <CardView
                            cardElevation={5}
                            cardMaxElevation={5}
                            cornerRadius={20}
                            style={{ width: cardWidth, padding: 10 }}
                        >
                            <Text style={{ color: colors.black, fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}>SCHEDULE YOUR STREAM</Text>

                            <Text style={{ fontSize: 14, fontWeight: '400', marginVertical: 10, alignSelf: 'flex-start', color: "#3D3D3D", marginStart: 10 }}>Pick a Day</Text>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 36, fontWeight: "500", color: colors.black }}>{moment(Date).format('DD')}</Text>
                                <Text style={{ fontSize: 12, fontWeight: "500", color: colors.black }}>{moment(Date).format('MMMM YYYY')}</Text>
                                <Text style={{ fontSize: 12, fontWeight: "600", color: colors.black }}>{moment(Date).format('dddd')}</Text>
                            </View>
                            <Calendar
                                hideExtraDays={true}
                                onDayPress={day => {
                                    setDate(day.timestamp)
                                    console.log('selected day', day);
                                }}
                            // renderHeader={date => {
                            //     return (

                            //     )
                            // }}
                            />
                        </CardView>
                        {/* Calender View End */}
                        {/* Time View */}
                        {/* <CardView
                            cardElevation={5}
                            cardMaxElevation={5}
                            cornerRadius={20}
                            style={{ minHeight: 60, height:open?280:120, width: cardWidth, margin: 10, alignItems: 'center', padding: 10}}
                        > */}
                        <View style={{ minHeight: 60, height: 100, width: cardWidth, margin: 10, alignItems: 'center', padding: 10 }}>
                            <Text style={{ fontSize: 14, fontWeight: '400', marginVertical: 10, alignSelf: 'flex-start', color: "#3D3D3D", marginStart: 10 }}>Pick a Time</Text>
                            <DatePicker
                                    modal={true}
                                    open={true}
                                    date={new Date()}
                                    onConfirm={(date) => {
                                        // setDatePickerVisibility(false)
                                        // setDOB(date)
                                        console.log(date);
                                    }}
                                    onCancel={() => {}}
                                    mode='time'
                                    title='Pick time'
                                />
                            {/* <View style={{ width: "100%", bottom: 10, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 2, marginTop: 10 }}>
                                <TextInput
                                    style={{ height: 40, fontWeight: 'bold', lineHeight: 20, fontSize: 18, borderBottomColor: '#aeaeae', borderBottomWidth: 2 }}
                                    onChangeText={(val) => { }}
                                    placeholder="H H"
                                    maxLength={2}
                                    textAlign={'center'}
                                    textAlignVertical={'bottom'}
                                    placeholderTextColor={"#aeaeae"}
                                    keyboardType="numeric"
                                />
                                <Text style={{ fontWeight: 'bold', fontSize: 18, color: colors.black }} >:</Text>
                                <TextInput
                                    style={{ height: 40, fontWeight: 'bold', fontSize: 18, borderBottomColor: '#aeaeae', borderBottomWidth: 2 }}
                                    onChangeText={(val) => { }}
                                    placeholder="M M"
                                    maxLength={2}
                                    textAlign={'center'}
                                    textAlignVertical={'top'}
                                    placeholderTextColor={"#aeaeae"}
                                    keyboardType="numeric"
                                />
                                <Text style={{ fontWeight: 'bold', fontSize: 18, color: colors.black }} >:</Text>
                                <TextInput
                                    style={{ height: 40, fontWeight: 'bold', fontSize: 18, borderBottomColor: '#aeaeae', borderBottomWidth: 2 }}
                                    onChangeText={(val) => { }}
                                    placeholder="S S"
                                    maxLength={2}
                                    textAlign={'center'}
                                    textAlignVertical={'top'}
                                    placeholderTextColor={"#aeaeae"}
                                    keyboardType="numeric"
                                />
                                <View>

                                    <DropDownPicker
                                        style={{ height: 40, borderBottomWidth: 1, borderWidth: 0, width: 80 }}
                                        open={open}
                                        value={value}
                                        items={items}
                                        setOpen={() => setOpen(!open)}
                                        setValue={setValue}
                                        dropDownContainerStyle={{ borderWidth: 1, borderColor: "#aeaeae" }}
                                    />
                                </View>
                            </View> */}
                        </View>

                        {/* </CardView> */}
                        {/* Time View End */}
                        <TouchableOpacity
                            style={[GlobalStyles.buttonClicked, { height: 50, width: width / 100 * 90, marginVertical: 10 }]}
                            onPress={() => navigation.navigate("LiveScheduled")}
                        >
                            <SimpleLineIcons name='calendar' size={20} color={colors.white} />
                        </TouchableOpacity>
                        <View style={{ height: 70 }} />
                    </View>
                </ScrollView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({


})
