import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import {AntDesign,Feather} from 'react-native-vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
export default function signoutbutton({ onPress}){
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button2}>
            </View>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    button2:{
      borderWidth:50,
         borderColor:'rgba(0,0,0,0.2)',
         alignItems:'center',
         justifyContent:'center',
         width:"18.0%",
         bottom: "-130%",
         right: "0%",
         left:"0%",
         top:"98%",
         height:"18.0%",
         backgroundColor:'#fff',
         borderRadius:100,
       },
})
