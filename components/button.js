import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import {AntDesign} from 'react-native-vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
export default function HomButton({ onPress}){
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
            </View>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    button:{
      borderWidth:50,
         borderColor:'rgba(0,0,0,0.2)',
         alignItems:'center',
         justifyContent:'center',
         width:"18.0%",
         bottom: "-150%",
         right: "0%",
         left:"0%",
         top:"90%",
         height:"18.0%",
         backgroundColor:'#fff',
         borderRadius:100,
       },
    buttonText:{
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    },
  /*gradient: {
  flex: 1,
  position:'absolute'
  justifyContent: 'center',
  alignItems:'center',
  width:100,
  height:100,
  borderRadius: 50,
  bottom:0
},*/

})
