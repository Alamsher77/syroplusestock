

 
import { View, Text, Button,TouchableOpacity,TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import React,{useState,useEffect,useContext} from 'react';
import ScrollableContainer from '../../component/scrollableitems'
import BoxContainer from '../../component/boxcontainer'
import { AuthContext } from '../../context/AuthContext'; 
import Currency from '../../currency'
import {MaterialCommunityIcons,Entypo} from '@expo/vector-icons';
const  WithdrawalToBank = ()=> {
  const {user} = useContext(AuthContext);
  const router = useRouter(); 
  return (
    <ScrollableContainer style={{gap:4}}>
      <Text style={{alignSelf:'center',fontWeight:'bold',letterSpacing:2,fontSize:16}}>Withdrawal</Text>
      <View style={{flexDirection:'row',justifyContent:'flex-end',marginBottom:12}}>
         <TouchableOpacity><Text  style={{fontWeight:'bold',fontSize:12,paddingHorizontal:12,paddingVertical:6,backgroundColor:'#777',color:'white',borderRadius:5
         }}>Records</Text></TouchableOpacity>
      </View>
      
      <BoxContainer >
       <TextInput style={{borderWidth:0.5,borderRadius:5 }} type="number" placeholder="Rs 0.00" />
       <Text style={{marginTop:12,color:'gray'}}>Single fee: 6%</Text>
       <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:12}}>
        <Text style={{color:'gray'}}>Account Balance</Text>
        <Text style={{color:'#22bB22',fontWeight:'bold'}}>{Currency(user?.withdrawal_wallet)}</Text>
       </View>
      </BoxContainer>
      
      <BoxContainer>
      <TouchableOpacity  style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
       <View style={{flexDirection:'row',gap:8,justifyContent:'center',alignItems:'center'}}>
        <MaterialCommunityIcons name="bank" size={20} color="#22bB22" />
        <Text style={{color:'gray'}}>Select your bank</Text>
        </View>
       <Entypo name="chevron-small-right" size={24} color="black" />
       </TouchableOpacity>
      </BoxContainer>
      
      <BoxContainer style={{gap:4}}>
       <Text style={{color:'gray',fontSize:14}}>Withdrawal Rules:</Text>
       <Text style={{fontSize:10,color:'gray'}}>1. You can use your bank account to withdraw cash from Monday to Friday from 9 am to 6 pm!</Text>
       <Text  style={{fontSize:10,color:'gray'}}>2. The minimum daily withdrawal amount in 300 rupees. and the maximum daily withdrawal amount in 40,000 rupees!</Text>
       <Text  style={{fontSize:10,color:'gray'}}>3. Each withdrawal fee is 6%, including program development costs and tax deductions.</Text>
       <Text  style={{fontSize:10,color:'gray'}}>4. The withdrawal will be credited within 2-72 hours.</Text>
       <Text></Text>
      </BoxContainer>
      <TouchableOpacity  ><Text style={{backgroundColor:'#FBC02D',marginTop:20,paddingVertical:8,color:'white',textAlign:'center',borderRadius:5,fontWeight:'bold'}}>Withdraw</Text></TouchableOpacity>
    </ScrollableContainer>
  );
}

export default WithdrawalToBank