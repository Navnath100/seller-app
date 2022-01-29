import React,{useState} from 'react'
import { View, Text, Dimensions, StatusBar, StyleSheet, TouchableOpacity, TextInput, Image, FlatList } from 'react-native'
import colors from '../assets/colors'
import Header from '../components/Header';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GlobalStyles from '../components/GlobalStylesheet';
import CardView from 'react-native-cardview';
// import DraggableFlatList, {
//     ScaleDecorator,
//   } from "react-native-draggable-flatlist";

  const NUM_ITEMS = 10;
    function getColor(i: number) {
      const multiplier = 255 / (NUM_ITEMS - 1);
      const colorVal = i * multiplier;
      return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
    }
    
      type Item = {
        key: string;
        label: string;
        height: number;
        width: number;
        backgroundColor: string;
      };
    
      const initialData: Item[] = [...Array(NUM_ITEMS)].map((d, index) => {
        const backgroundColor = getColor(index);
        return {
          key: `item-${index}`,
          label: String(index) + "",
          height: 100,
          width: 60 + Math.random() * 40,
          backgroundColor,
        };
      });

const { height, width } = Dimensions.get('window');
const cardWidth = (width / 100) * 95;
const cardHeight = 140
export default function ArrangeProducts({ navigation, route }) {
    // console.log(route.params.SelectedCategory);
    // console.log(route.params.SelectedProducts);
    const [SelectedProducts, setSelectedProducts] = useState([]);
    navigation.addListener('focus', async () => {
        setSelectedProducts(route.params.SelectedProducts);
    })
    // console.log(SelectedProducts);
    const renderPrducts = ({item,index}) => {
        // console.log(index);
        return(
        <CardView
            cardElevation={5}
            cardMaxElevation={5}
            cornerRadius={20}
            style={{ width: cardWidth, alignSelf: 'center', marginVertical: 10,marginBottom:SelectedProducts.length == index+1?60:10, flexDirection: 'row', }}
        >
            {/* <View style={}> */}
            <View style={{ width: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary }}>
                <Text style={{ fontSize: 36, color: colors.white, fontWeight: 'bold' }}>{index+1}</Text>
            </View>
            <View style={{ width: cardWidth - 100, flexDirection: 'row', paddingHorizontal: 5 }}>
                <Image
                    style={{ width: cardHeight - 30, height: cardHeight - 10 }}
                    source={{uri:item.image}}
                />
                <View style={{ width: cardWidth - 100 - (cardHeight - 30), alignItems: 'flex-start', paddingVertical: 10, marginStart: 10 }}>
                    <Text style={{ height: cardHeight / 4, fontSize: 10, fontWeight: '400', flexWrap: 'wrap' }}>Beer Honey T-Shirt</Text>
                    <Text style={{ fontSize: 12, fontWeight: '600', marginTop: 10 }}>AED <Text style={{ fontWeight: 'bold' }}>1,353.05</Text></Text>
                    <View style={{ position: 'absolute', bottom: 10, flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                        <TextInput
                            style={{ width:50,height: 40, fontWeight: 'bold', fontSize: 18, borderBottomColor: '#aeaeae', borderBottomWidth: 2 }}
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
                                    style={{ width:50,height: 40, fontWeight: 'bold', fontSize: 18, borderBottomColor: '#aeaeae', borderBottomWidth: 2 }}
                                    onChangeText={(val) => { }}
                                    placeholder="S S"
                                    maxLength={2}
                                    textAlign={'center'}
                                    textAlignVertical={'top'}
                                    placeholderTextColor={"#aeaeae"}
                                    keyboardType="numeric"
                                />
                    </View>
                </View>
            </View>
            <View style={{ width: 50, alignItems: 'center', justifyContent: 'center' }}>
                <MaterialCommunityIcons name='equal' size={30} color={colors.black} />
            </View>
            {/* </View> */}
        </CardView>
        );
    }

    //   const renderItem = ({ item, drag, isActive }: RenderItemParams<Item>) => {
    //     return (
    //       <ScaleDecorator>
    //         <TouchableOpacity
    //           onLongPress={drag}
    //           disabled={isActive}
    //           style={[
    //             styles.rowItem,
    //             { backgroundColor: isActive ? "red" : item.backgroundColor },
    //           ]}
    //         >
    //           <Text style={styles.text}>{item.label}</Text>
    //         </TouchableOpacity>
    //       </ScaleDecorator>
    //     );
    //   };

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
            <View style={{ height: height - 45, alignItems: 'center' }} >
                <View style={GlobalStyles.circleContainer}>
                    <View style={[GlobalStyles.buttonClicked, GlobalStyles.circle]}>
                        <Octicons name='book' size={25} color={colors.white} />
                    </View>
                    <View style={[GlobalStyles.buttonClicked, GlobalStyles.circle]}>
                        <MaterialCommunityIcons name='shape' size={25} color={colors.white} />
                    </View>
                    <View style={[GlobalStyles.buttonClicked, GlobalStyles.circle]}>
                        <MaterialCommunityIcons name='clock-outline' size={25} color={colors.white} />
                    </View>
                    <View style={[GlobalStyles.buttonNotClicked, GlobalStyles.circle]}>
                        <AntDesign name='sharealt' size={25} color={colors.primary} />
                    </View>
                    <View style={[GlobalStyles.buttonNotClicked, GlobalStyles.circle]}>
                        <SimpleLineIcons name='control-play' size={20} color={colors.primary} />
                    </View>
                </View>

                <Text style={{ fontSize: 14, fontWeight: '500', marginVertical: 15 }}>Arrange the Products to advertise First</Text>
                <Text style={{ fontSize: 12, fontWeight: '500', }}>Total duration of the Live Stream is <Text style={{ fontWeight: 'bold' }}>09:00</Text></Text>
                <Text style={{ fontSize: 11, fontWeight: '400',marginBottom:10 }}>Duration Remaining 20:00 <Text style={{ fontWeight: 'bold' }}>20:00</Text></Text>

                <FlatList
                    data={SelectedProducts}
                    renderItem={renderPrducts}
                    keyExtractor={(item, index) => index}
                    showsVerticalScrollIndicator={false}
                />

{/* <DraggableFlatList
      data={SelectedProducts}
      onDragEnd={({ data }) => setSelectedProducts(data)}
      keyExtractor={(item,index) => index}
      renderItem={renderItem}
    /> */}


                <TouchableOpacity 
                style={[GlobalStyles.buttonClicked, { height: 50, width: width / 100 * 90, position: 'absolute', bottom: 5, alignSelf: 'center' }]}
                onPress={()=>navigation.navigate('ChoosePlatform')}>
                    <SimpleLineIcons name='control-play' size={20} color={colors.white} />
                </TouchableOpacity>
            </View>



        </>
    )
}

const styles = StyleSheet.create({


})
