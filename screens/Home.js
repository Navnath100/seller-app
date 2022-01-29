import React, { useState, useEffect } from 'react'
import { View, Text, StatusBar, Image, Dimensions, FlatList, Alert, ScrollView,TouchableOpacity } from 'react-native'
import Header from '../components/Header'
import { APIs } from '../constants/apiList';
import { API } from '../constants/network';
import CardView from 'react-native-cardview'
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import colors from '../assets/colors';
import GlobalStyles from '../components/GlobalStylesheet';
import moment from 'moment';

const { height, width } = Dimensions.get('window');

export default function Home({navigation}) {
  const [Schedules, setSchedules] = useState(Array);
  useEffect(() => {
    // getSchedules();
    navigation.navigate("Permissions",{goBack:"Home"})
  }, []);
  // console.log(APIs.getSchedules);
  const getSchedules = async () => {
    API.get(APIs.getSchedules).subscribe({
      next: (next) => {
        setSchedules(next.data);
        // console.log(next);
      },
      error: (err) => {
        console.log("err", err);
        Alert.alert('Error!', err.toString(), [
          { text: 'Okay' }
        ]);
      }
    })
  }

  console.log("Schedules ", Schedules);
  const renderSchedules = ({item}) => {
    return (
      <CardView
        cardElevation={10}
        cardMaxElevation={2}
        cornerRadius={20}
        style={{ width: width - 20, marginVertical: 5, borderColor: "black", padding: 10, borderWidth: 1, marginHorizontal: 10 }}
      >
        <View style={{ flexDirection: 'row' }}>

          <View style={{ width: 110, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 36,color:colors.black }}>{moment(item.date).format('DD')}</Text>
            <Text style={{ fontSize: 12,color:colors.black }}>{moment(item.date).format('MMMM YYYY')}</Text>
            <Text style={{ fontSize: 12,color:colors.black }}>{moment(item.date).format('dddd')}</Text>
          </View>

          <View style={{ borderColor: "#000", borderEndWidth: 0.5 }} />

          <View style={{ width: width - 155, marginStart: 5, padding: 5, fontSize: 12 }}>
            <Text style={{ flexWrap: 'nowrap',color:colors.black }}>{item.title}</Text>
            <View style={{ width: width - 150, flexDirection: 'row',marginVertical:5 }}>
              <View style={{ marginVertical: 15, flexDirection: 'row' }}>
                <SimpleLineIcons style={{}} name={'handbag'} size={20} color={colors.black} />
                <Text style={{ marginStart: 5,color:colors.black, fontSize: 12, alignSelf: 'center' }}>{item.products.length} Products</Text>
              </View>
              <View style={{ height: 20, alignSelf: 'center', borderEndColor: '#000', borderEndWidth: 1, marginHorizontal: 10 }} />
              <View style={{ marginVertical: 5, flexDirection: 'row' ,alignItems:'center'}}>
                <SimpleLineIcons style={{}} name={'clock'} size={20} color={colors.black} />
                <Text style={{ marginStart: 5, fontSize: 12, alignSelf: 'center',color:colors.black }}>{item.duration}</Text>
              </View>
            </View>
            <Text style={{ fontSize: 14, fontWeight: "bold",color:colors.black }}>{moment(item.time).format('hh:mm')}</Text>
          </View>
        </View>
        <View style={{ borderColor: "#000", borderTopWidth: 0.5, marginTop: 10, flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <SimpleLineIcons style={{ padding: 5 }} name={'control-play'} size={30} color={colors.primary} />
          <Entypo style={{}} name={'cross'} size={40} color={'#FF6565'} />
          {/* <Text style={{fontSize:40,textAlignVertical:'top',backgroundColor:'green'}}>×</Text> */}
        </View>
      </CardView>
    )
  }

  const SchedulesView = () => {
    return (
      <View style={{}}>
        <FlatList
          data={Schedules}
          renderItem={renderSchedules}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
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

      <ScrollView>
        <View style={{padding: 0, backgroundColor: colors.white }}>
          <View style={{ margin: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: '500', color: colors.black }}>Hello,</Text>
            <Text style={{ fontSize: 36, fontWeight: '600', color: colors.black }}>Alexio</Text>
            <Text style={{ fontSize: 18, fontWeight: '500', marginTop: 20, color: colors.black }}>Here’s your upcoming scheduled Live Streams</Text>
          </View>
          {
            Schedules.length < 1 ? (
              <View style={{ padding: 20 }}>
                <Image
                  style={{ height: 300, width: width - 40 }}
                  source={require('../assets/images/find.png')}
                />
              </View>
            ) :
              (
                <SchedulesView />
              )
          }
          <View style={{width: width - 40,flexDirection: 'row',paddingVertical:30,alignItems:"center",alignSelf:'center', justifyContent: 'space-evenly' }}>
                  <TouchableOpacity 
                  style={[GlobalStyles.buttonNotClicked, { borderRadius: 20,width: (width - 100)/2,padding:(width/100)*3 }]}
                  onPress={()=>navigation.navigate("ChooseCategory")}
                  >
                    <Octicons name='calendar' size={40} color={colors.primary}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={[GlobalStyles.buttonClicked, { borderRadius: 20,width: (width - 100)/2,padding:(width/100)*3 }]}>
                    <SimpleLineIcons name='control-play' size={40} color={colors.white}/>
                  </TouchableOpacity>
                </View>
        </View>
      </ScrollView>
    </>
  )
}
