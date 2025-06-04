

import { View, Text, Button,TouchableOpacity,TextInput,Alert } from 'react-native';
import { router } from 'expo-router';
import React,{useState,useEffect,useContext} from 'react';
import ScrollableContainer from '../../component/scrollableitems'
import BoxContainer from '../../component/boxcontainer' 
import SimarCard from '../../component/purchasesimmer' 
import Currency from '../../currency'
import Fetchapimethod from '../../configration/fetchapimethod'
const  CustomerServise = ()=> {
 
  return (
    <ScrollableContainer   style={{gap:4}}>
      <Text style={{alignSelf:'center',fontWeight:'bold',letterSpacing:2,fontSize:16}}>Customer Servise</Text>
      
       
    </ScrollableContainer>
  );
}

export default CustomerServise