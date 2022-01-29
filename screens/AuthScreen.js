import React from 'react'
import { View, Text, StatusBar } from 'react-native'

export default function AuthScreen() {
    return (
        <View>
            <StatusBar
            barStyle="dark-content"
            translucent={false}
            backgroundColor="#FFF"
            />
            <Text>Auth screen</Text>
        </View>
    )
}
