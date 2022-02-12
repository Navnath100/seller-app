import React, { useState } from 'react'
import { View, Text, Dimensions, StatusBar, StyleSheet, Image, FlatList, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import colors from '../assets/colors'
import Header from '../components/Header';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GlobalStyles from '../components/GlobalStylesheet';
import { TextInput } from 'react-native-gesture-handler';
import CardView from 'react-native-cardview';
import products from '../constants/products.json'
import CheckBox from '@react-native-community/checkbox';

const { height, width } = Dimensions.get('window');
const cardWidth = (width - 70) / 2;
const cardHeight = cardWidth + ((cardWidth / 100) * 60);
export default function SelectProduct({ navigation, route }) {
    // console.log(route.params.SelectedCategory);
    // const [SelectedCategory, setSelectedCategory] = useState(route.params.SelectedCategory);
    const [SelectedProducts, setSelectedProducts] = useState([]);

    const isSelected = (item) => {
        let rr = false
        // console.log("isSelected called ----", item);
        for (let i = 0; i < SelectedProducts.length; i++) {
            if (SelectedProducts[i].id == item.id) {
                rr = true
            }
        }
        return rr;
    }

    const addAndRemoveFromSelected = (item) => {
        const selected = isSelected(item);
        if (selected) {
            const newArray = SelectedProducts.filter(function (i) {
                return i.id != item.id;
            });
            setSelectedProducts(newArray);
        } else {
            setSelectedProducts([...SelectedProducts,item]);
        }
    }
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
                        <Octicons name='book' size={25} color={colors.white} />
                    </View>
                    <View style={[GlobalStyles.buttonClicked, GlobalStyles.circle]}>
                        <MaterialCommunityIcons name='shape-outline' size={25} color={colors.white} />
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


                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>

                    <View style={[GlobalStyles.TextInputView, { width: width / 100 * 70, borderRadius: 5, backgroundColor: '#E8E8E8' }]}>
                        <AntDesign name='search1' size={25} color={colors.black} />

                        <TextInput style={GlobalStyles.TextInput}
                            placeholder={'Search for a product here...'}
                            placeholderTextColor={"gray"}
                        />
                    </View>
                    <View style={[GlobalStyles.buttonNotClicked, { width: 30, height: 30, marginTop: 20, marginStart: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }]}>
                        <MaterialCommunityIcons name='filter-variant' size={25} color={colors.black} />

                    </View>
                </View>

                <Text style={{ fontSize: 14, alignSelf: 'center', fontWeight: 'bold', marginVertical: 10 }}>2 out of 5 Products Choosen</Text>

                <FlatList
                    style={{ width, height: height - 250, alignSelf: 'center' }}
                    data={products}
                    renderItem={({ item }) => {
                        const isSelect = isSelected(item);
                        return (
                            <TouchableNativeFeedback
                                style={{}}
                                onPress={() => addAndRemoveFromSelected(item)}
                            >
                                <CardView
                                    cardElevation={5}
                                    cardMaxElevation={5}
                                    cornerRadius={20}
                                    style={{ height:cardHeight,width: cardWidth, margin: 10, padding: 10,backgroundColor:isSelect?'#d9d9d9':colors.white }}
                                >
                                    <Image
                                        style={{ width: cardWidth - 10, height: cardWidth,alignSelf:'center' }}
                                        source={{
                                            uri:item.image
                                        }}
                                    />
                                    <Text style={{ fontSize: 10 }}>{item.product_name}</Text>
                                    <Text style={{ fontSize: 12, fontWeight: '600' }}>{item.currency}  <Text style={{ fontWeight: 'bold' }}>{item.price}</Text></Text>
                                    <Text style={{ fontSize: 10, textDecorationLine: 'none', color: '#43CD38' }}><Text style={{ color: "#808080", textDecorationLine: 'line-through' }}>{item.currency} {item.price}</Text>   {item.offer}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <CheckBox
                                            style={{}}
                                            disabled={false}
                                            value={isSelect}
                                            onValueChange={(newValue) => { }}
                                        />
                                        <Text style={{ fontSize: 10, fontWeight: 'bold' }}>Choose this product</Text>
                                    </View>
                                </CardView>
                            </TouchableNativeFeedback>
                        )
                    }}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{
                        width: width,
                        paddingHorizontal: 15,
                        alignSelf: 'center',
                        flexDirection: 'row',
                        flexWrap: 'wrap'//Needed for wrapping for the items
                    }}
                />

                <TouchableOpacity
                    style={[GlobalStyles.buttonClicked, { height: 50, width: width / 100 * 90, bottom: 10, alignSelf: 'center' }]}
                    onPress={() => navigation.navigate("ArrangeProducts",{
                        SelectedProducts,
                        // SelectedCategory:route.params.SelectedCategory
                    })}
                >
                    <SimpleLineIcons name='control-play' size={20} color={colors.white} />
                </TouchableOpacity>

            </View>
        </>
    )
}

const styles = StyleSheet.create({


})
