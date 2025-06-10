

import { View, Text, Button,TouchableOpacity,TextInput,Alert } from 'react-native';
import { router } from 'expo-router';
import React,{useState,useEffect,useContext} from 'react';
import ScrollableContainer from '../../component/scrollableitems'
import BoxContainer from '../../component/boxcontainer' 
import SimarCard from '../../component/purchasesimmer' 
import Currency from '../../currency'
import Fetchapimethod from '../../configration/fetchapimethod'
const  LoaingPassword = ()=> {
 const [password,setPassword] = useState("")
 const [rePassword,setRePassword] = useState("")
 const [updateloading,setupdateloading] = useState(false)
 const updateHandler = ()=>{
   
 }
  return (
    <ScrollableContainer   style={{gap:4}}>
      <Text style={{alignSelf:'center',fontWeight:'bold',letterSpacing:2,fontSize:16}}>Login Password</Text>
       <View style={{justifyContent:"center",flex:1,}}>
      <BoxContainer style={{gap:12,marginTop:12}}>
      <Text style={{alignSelf:'center',fontWeight:'bold',letterSpacing:1,fontSize:16,color:'#6aa',borderBottomWidth:0.2,paddingBottom:6}}>Update Login Password </Text>
       <TextInput onChangeText={setPassword} style={{borderBottomWidth:0.5,color:'#000',borderRadius:5,paddingHorizontal:12}} placeholderTextColor='#000' secureTextEntry placeholder={"Enter The Password"} />
       <TextInput onChangeText={setRePassword} style={{borderBottomWidth:0.5,color:'#000',borderRadius:5,paddingHorizontal:12}} placeholderTextColor='#000' placeholder={"Re Enter The Password"} />
       
       <TouchableOpacity disabled={updateloading} onPress={updateHandler}><Text style={{backgroundColor:'#6aa',color:'white',paddingVertical:4,textAlign:'center',fontWeight:'bold'}}>{updateloading  ? <ActivityIndicator size="large" size={18} color="white" /> : "Update" }</Text></TouchableOpacity>
      </BoxContainer>
      </View>
       
    </ScrollableContainer>
  );
}

export default LoaingPassword