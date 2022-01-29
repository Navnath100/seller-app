import React from 'react'
import { View, Text,Modal,TouchableNativeFeedback,TouchableOpacity, FlatList, StyleSheet, TextInput } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { countryCodes } from './countryCodes';

export default function countryDropdown(props) {
  const [selectedCountry, setSelectedCountry] = React.useState(null);
  const [filteredCountryCodes,setFilteredCountryCodes] = React.useState(countryCodes);
  const renderItem = ({ item }) => {
    const backgroundColor = "#FFF";
    const color = item === selectedCountry ? 'green' : 'black';
    const IconVisibility = item === selectedCountry ? true : false;
    
    const Item = ({ item, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={onPress}>
            <View  style={[styles.item, backgroundColor,{flexDirection:"row",justifyContent:"space-between"}]}>
                <Text style={[styles.title, textColor]}>{item.flag}   {item.name.en} ({item.dial_code})</Text>
                {
                    IconVisibility ?
                    <MaterialIcons name="done" size={25} color={"green"} />
                    : null
                }
            </View>
        </TouchableOpacity>
      );
    return (
      <Item
        item={item}
        onPress={() => {
            setSelectedCountry(item);
            props.handleDropdownVisibility(item);
            setFilteredCountryCodes(countryCodes);
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  const filterCountries =(textToSearch)=>{
    setFilteredCountryCodes(countryCodes.filter(i=>
        i.name.en.toLowerCase().includes(textToSearch.toLowerCase())
      ))
  }

    return (
            <Modal
                transparent={true}
                visible={props.visibility}
            >
                <View style={{height:"100%",width:"100%",backgroundColor:"transparent",alignItems:"center",justifyContent:"center"}}>
                    <View style={{height:"80%",width:"70%",backgroundColor:"#fff",borderRadius:15}}>
                        <TextInput
                        style={{marginTop:5,marginHorizontal:10}}
                          placeholder='Search country...'
                          onChangeText={(text)=>filterCountries(text)}
                        />
                        <FlatList
                            data={filteredCountryCodes}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.code}
                            extraData={selectedCountry}
                            maxToRenderPerBatch={241}
                        />
                    </View>
                </View>
            </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    item: {
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 14,
    },
  });
