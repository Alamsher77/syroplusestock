

import { View, Text, Button,TouchableOpacity,TextInput,Alert, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { router } from 'expo-router';
import React,{useState,useEffect,useContext} from 'react';
import ScrollableContainer from '../../component/scrollableitems'
import BoxContainer from '../../component/boxcontainer' 
import SimarCard from '../../component/purchasesimmer' 
import Currency from '../../currency'
import Fetchapimethod from '../../configration/fetchapimethod'
import Colors from '../../Colors/color';
import Toast from 'react-native-toast-message';
import { Platform } from 'react-native';
const  LoadingPassword = ()=> {
 const [password,setPassword] = useState("")
 const [rePassword,setRePassword] = useState("")
 const [otp,setOtp] = useState()
 const [showOtp,setShowOtp] = useState(false)
 const [timer,setTimer] = useState(null)
 const [resiveOtp,setResiveOtp] = useState(null)
 useEffect(()=>{
    const interval = setInterval(() => {
      if(timer > 0){
        setTimer((prevTimer) => prevTimer - 1);
      } else {
        setTimer(0);
        setResiveOtp(null)
      
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);
 const [updateloading,setupdateloading] = useState(false)
 const updateHandler = async ()=>{
   try {
   setupdateloading(true)
    const data = await Fetchapimethod({method:'post',url:'update_login_password',data:{otp,password,rePassword}})
    setupdateloading(false)
    if(!data?.success){ 
      return Toast.show({
        type: 'error', 
        text2: data?.message,
      });
    }
    Toast.show({
      type: 'success', 
      text2: data?.message,
    });
    setupdateloading(false)

   }catch (error) {
    setupdateloading(false)
    Toast.show({
      type: 'error', 
      text2: error.message,
    });
 }
}

const [sendOtpLoading,setSendOtpLoading] = useState(false)
const sendOtpHandler = async ()=>{
  try { 
    if(timer > 0) return Toast.show({
      type: 'error',
      text2: "Please wait for the timer to finish",
    });
    setSendOtpLoading(true)
    const data = await Fetchapimethod({method:'post',url:'send_login_password_otp',data:{}})
    setSendOtpLoading(false)
    if(!data?.success){ 
      return Toast.show({
        type: 'error', 
        text2: data?.message,
      });
    } 
    setResiveOtp(data?.otp)
    setShowOtp(true)
    setTimer(60); // Set the timer to 60 seconds
    Toast.show({
      type: 'success', 
      text2:data?.message,
    });
  } catch (error) {
    setSendOtpLoading(false)
    Toast.show({
      type: 'error', 
      text2: error.message,
    });
  }
}
  return (
    <KeyboardAvoidingView 
     behavior={Platform.OS == 'ios' ? 'padding': 'height'}
     style={{flex:1}}
    >
    <ScrollableContainer   style={{gap:4}}>
     
      <Text style={{alignSelf:'center',fontWeight:'bold',letterSpacing:2,fontSize:16}}>Login Password</Text>
       <View style={{justifyContent:"center",flex:1,}}>
      <BoxContainer style={{gap:12,marginTop:12}}>
         {(resiveOtp &&  timer > 0) && <Text style={{color:Colors.flipkart,backgroundColor:Colors.mainColor,textAlign:'center',paddingVertical:12}}>Your Otp : {resiveOtp}</Text>}
      <Text style={{alignSelf:'center',fontWeight:'bold',letterSpacing:1,fontSize:16,color:Colors.mainColor,borderBottomWidth:0.2,paddingBottom:6}}>Update Login Password </Text>
      
       <TextInput onChangeText={setPassword} style={{borderBottomWidth:0.5,color:Colors.mainColor,borderRadius:5,paddingHorizontal:12}} placeholderTextColor={Colors.mainColor} secureTextEntry placeholder={"Enter The Password"} />
       <TextInput onChangeText={setRePassword} style={{borderBottomWidth:0.5,color:Colors.mainColor,borderRadius:5,paddingHorizontal:12}} placeholderTextColor={Colors.mainColor} placeholder={"Re Enter The Password"} />
        <View style={{paddingHorizontal:12,paddingVertical:4,backgroundColor:Colors.mainColor,alignSelf:'flex-end',marginTop:8,marginBottom:4,flexDirection:'row',alignItems:'center',borderBottomWidth:0.5,borderColor:Colors.mainColor,paddingBottom:4,shadowColor:'gray',shadowOffset:{width:0,height:0},shadowOpacity:0.5,shadowRadius:1,elevation:2}}>
          <TouchableOpacity disabled={sendOtpLoading} onPress={sendOtpHandler} ><Text style={{color:Colors.flipkart}}>{ sendOtpLoading ? <ActivityIndicator size="small" color={Colors.flipkart} /> : `Send OTP ${timer ?  timer : ''}`}</Text></TouchableOpacity>
          </View >
       { showOtp && <TextInput onChangeText={setOtp} style={{borderBottomWidth:0.5,color:Colors.mainColor,borderRadius:5,paddingHorizontal:12}} placeholderTextColor={Colors.mainColor} placeholder={"Enter The OTP"} /> }
       <TouchableOpacity disabled={updateloading || !otp} onPress={updateHandler}><Text style={{backgroundColor:Colors.mainColor,color:'white',paddingVertical:4,textAlign:'center',fontWeight:'bold',opacity:!otp ? 0.5 : 1}}>{updateloading  ? <ActivityIndicator size="large" size={18} color="white" /> : "Update" }</Text></TouchableOpacity>
      </BoxContainer>
      </View>
       
    </ScrollableContainer>
    </KeyboardAvoidingView>
  );
}

export default LoadingPassword;