import React,{useState} from 'react'
import { View, Text, Dimensions, StatusBar,FlatList, StyleSheet, TouchableOpacity,Image } from 'react-native'
import colors from '../assets/colors'
import Header from '../components/Header';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome5Brands from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GlobalStyles from '../components/GlobalStylesheet';
import socialMediaPlatforms from '../constants/socialMediaPlatforms.json'
import CardView from 'react-native-cardview';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

const { height, width } = Dimensions.get('window');
const cardWidth = (width-60)/3;
const cardHeight = cardWidth;
export default function ChoosePlatform({navigation}) {
const [SelectedPlatforms, setSelectedPlatforms] = useState([])

const isSelected = (item) => {
    let isSelec = false
    for (let i = 0; i < SelectedPlatforms.length; i++) {
        if (SelectedPlatforms[i].id == item.id) {
            isSelec = true
        }
    }
    return isSelec;
}

const addAndRemoveFromSelected = (item) => {
    const selected = isSelected(item);
    if (selected) {
        const newArray = SelectedPlatforms.filter(function (i) {
            return i.id != item.id;
        });
        setSelectedPlatforms(newArray);
    } else {
        setSelectedPlatforms([...SelectedPlatforms,item]);
    }
}

    const renderSocialMediaPlatforms=({item})=>{
const selected = isSelected(item);
        return(
            <CardView
            cardElevation={5}
            cardMaxElevation={5}
            cornerRadius={20} 
            style={{ height : cardHeight,width: cardWidth, margin: 10,backgroundColor:selected?colors.primary:colors.white}}       
        >
            <TouchableNativeFeedback 
            style={{height : cardHeight,width: cardWidth,alignItems:'center',borderRadius:20,justifyContent:'center'}}
             onPress={()=>addAndRemoveFromSelected(item)}>
            <FontAwesome5Brands name={item.icon} size={30} color={selected?colors.white:colors.primary} />
            <Text style={{fontSize:12,fontWeight:'600',lineHeight:18,color:selected?colors.white:colors.primary}}>{item.name}</Text>
            </TouchableNativeFeedback>
            
        </CardView>
        )
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
            <View style={{ height: height - 45,alignItems:'center' }} >
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
                    <View style={[GlobalStyles.buttonNotClicked, GlobalStyles.circle]}>
                        <SimpleLineIcons name='control-play' size={20} color={colors.primary} />
                    </View>
                </View>

                <View style={[GlobalStyles.buttonClicked, { height: 100, width: width / 100 * 90,flexDirection:'row',justifyContent:'space-evenly',marginVertical:30 }]}>
                    <Image
                        style={{ width: 100, height: 30, resizeMode: 'stretch' }}
                        source={require('../assets/images/LOGO.png')}
                    />
                <Text style={{ fontSize: 18, fontWeight: '600',color:colors.white }}> My Company</Text>

                </View>

                <Text style={{ fontSize: 14, fontWeight: '600',marginVertical:20,color:colors.black }}> Choose which platforms you want to go live on  😍</Text>

                <FlatList
                style={{marginTop:20}}
                data={socialMediaPlatforms}
                renderItem={renderSocialMediaPlatforms}
                keyExtractor={(item,index)=>index}
                contentContainerStyle={{
                    flexDirection: 'row',
                    flexWrap: 'wrap'//Needed for wrapping for the items
                }}
                />

                <TouchableOpacity 
                style={[GlobalStyles.buttonClicked, { height: 50, width: width / 100 * 90, position: 'absolute', bottom: 10, alignSelf: 'center' }]}
                onPress={()=>navigation.navigate("ScheduleLive")}
                >
                    <SimpleLineIcons name='clock' size={20} color={colors.white} />
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({


})
