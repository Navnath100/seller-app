import React from 'react'
import { View, Text, Image } from 'react-native'
import colors from '../assets/colors'
import Feather from 'react-native-vector-icons/Feather';

export default function Header(props) {
  // console.log(navigation);
  return (
    <View style={{ height: 70,justifyContent: 'space-between', backgroundColor: colors.primary, alignItems: 'center',paddingTop:20, paddingHorizontal: 10, flexDirection: 'row',elevation:10 }}>
      <Feather name="arrow-left" size={25} color={"#FFF"} style={{ marginStart: 5}} 
      onPress={()=>props.navigation.goBack()}
      />

      <Image
      style={{maxWidth:100,maxHeight:40,resizeMode:'stretch'}}
        source={require('../assets/images/LOGO.png')}
      />
      <Feather name="menu" size={25} color={"#FFF"} style={{ marginEnd: 5}} onPress={() => props.navigation.openDrawer()} />

    </View>
  )
}
