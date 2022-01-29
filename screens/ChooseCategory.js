import React from 'react'
import { View, Text, Dimensions, StatusBar, StyleSheet } from 'react-native'
import colors from '../assets/colors'
import Header from '../components/Header';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GlobalStyles from '../components/GlobalStylesheet';
import CardView from 'react-native-cardview';
import { FlatList } from 'react-native';
import categories from "../constants/categories.json"
import { TouchableOpacity,TouchableNativeFeedback } from 'react-native';

const { height, width } = Dimensions.get('window');
const cardWidth = (width - 80) / 3;
const cardHeight = cardWidth + ((cardWidth / 100) * 20);
export default function ChooseCategory(props) {
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
            <View>
                <View style={GlobalStyles.circleContainer}>
                    <View style={[GlobalStyles.buttonClicked, GlobalStyles.circle]}>
                        <Octicons name='book' size={25} color={colors.white} />
                    </View>
                    <View style={[GlobalStyles.buttonNotClicked, GlobalStyles.circle]}>
                        <MaterialCommunityIcons name='shape-outline' size={25} color={colors.primary} />
                    </View>
                    <View style={[GlobalStyles.buttonNotClicked, GlobalStyles.circle]}>
                        <MaterialCommunityIcons name='clock-outline' size={25} color={colors.primary} />
                    </View>
                    <View style={[GlobalStyles.buttonNotClicked, GlobalStyles.circle]}>
                        <AntDesign name='sharealt' size={25} color={colors.primary} />
                    </View>
                    <View style={[GlobalStyles.buttonNotClicked, GlobalStyles.circle]}>
                        <SimpleLineIcons name='control-play' size={20} color={colors.primary} />
                    </View>
                </View>
                <Text style={{ width: width / 100 * 80, alignSelf: "center", marginVertical: 20, fontWeight: '600', color: colors.black, fontSize: 14 }}>Choose the category of the product that you want to advertise</Text>

                <FlatList
                style={{height:height-195,marginHorizontal:10}}
                    data={categories}
                    renderItem={({item}) => {
                        return (
                            <TouchableNativeFeedback 
                            onPress={()=>props.navigation.navigate("SelectProduct",{SelectedCategory:item})}
                            >
                            <CardView
                                cardElevation={5}
                                cardMaxElevation={2}
                                cornerRadius={20}
                                style={{ height: cardHeight,width: cardWidth, margin: 10, alignItems: 'center', justifyContent: 'center' }}
                                >
                                <Text style={{ fontSize: 36,color:colors.black }}>{item.icon}</Text>
                                <Text style={{ fontSize: 12, fontWeight: "bold", marginVertical: 10,color:colors.black }}>{item.name}</Text>
                            </CardView>
                            </TouchableNativeFeedback>
                        )
                    }}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{
                        flexDirection: 'row',
                        flexWrap: 'wrap'//Needed for wrapping for the items
                    }}
                />


            </View>
        </>
    )
}

const styles = StyleSheet.create({


})
