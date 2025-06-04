

import { View, Text, Button,TouchableOpacity,TextInput,Alert,ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import React,{useState,useEffect,useContext} from 'react';
import ScrollableContainer from '../../component/scrollableitems'
import BoxContainer from '../../component/boxcontainer' 
import SimarCard from '../../component/purchasesimmer' 
import Currency from '../../currency'
import Fetchapimethod from '../../configration/fetchapimethod'
import { AuthContext } from '../../context/AuthContext';
 
import Toast from 'react-native-toast-message';
const  WithdrawalPassword = ()=> {
  const {user} = useContext(AuthContext);   
   const [newWithdrawalPassword,setNewWithdrawalPasswor] = useState('')
   const [reNewWithdrawalPassword,setReNewWithdrawalPassword] = useState('')
   const [oldWithdrawalPassword,setOldWithdrawalPassword] = useState('')
   const [updateWithdrawalPassword,setUpdateWithdrawalPassword] = useState('')
  const [updateorcreateloading,setupdateorcreateloading] = useState(false)
  const createWithdrawalPasswordHandler = async ()=>{
    try {
      setupdateorcreateloading(true)
      const data = await Fetchapimethod({method:'post',url:'create_withdrawal_password',data:{newWithdrawalPassword,reNewWithdrawalPassword}})
      setupdateorcreateloading(false)
      if(!data?.success){ 
       Toast.show({type:'error',text1: data?.message,});
        return false
      }
      Toast.show({type:'success',text1: data?.message,});
        return false
      
    } catch (e) {
      setupdateorcreateloading(false)
      Toast.show({type:'error',text1: e.message,});
    }
  }
 const updateWithdrawalPasswordHandler = async ()=>{
    try {
      setupdateorcreateloading(true)
      const data = await Fetchapimethod({method:'post',url:'update_withdrawal_password',data:{oldWithdrawalPassword,updateWithdrawalPassword}})
      setupdateorcreateloading(false)
      if(!data?.success){
        Toast.show({type:'error',text1: data?.message,});
        return false
      }
      Toast.show({type:'success',text1: data?.message,});
    } catch (e) {
      setupdateorcreateloading(false)
      Toast.show({type:'error',text1: e.message,});
    }
 }
  return (
    <ScrollableContainer   style={{gap:4}}>
      <Text style={{alignSelf:'center',fontWeight:'bold',letterSpacing:2,fontSize:16}}>Withdrawal Password</Text>
   
      <View style={{justifyContent:"center",flex:1,}}>
      <BoxContainer style={{gap:12,marginTop:12}}>
      <Text style={{alignSelf:'center',fontWeight:'bold',letterSpacing:1,fontSize:16,color:'#6aa',borderBottomWidth:0.2,paddingBottom:6}}>{user?.withdrawal_password ? 'Update Withdrawal  Password' : "Create New Withdrawal Password" }</Text>
       <TextInput onChangeText={user?.withdrawal_password ? setOldWithdrawalPassword : setNewWithdrawalPasswor} style={{borderBottomWidth:0.5,color:'#999',borderRadius:5,paddingHorizontal:12}} placeholderTextColor='#999' secureTextEntry placeholder={user?.withdrawal_password ? 'Enter Old withdrawal password':'Enter Create new withdrawal password'} />
       <TextInput onChangeText={user?.withdrawal_password ? setUpdateWithdrawalPassword : setReNewWithdrawalPassword} style={{borderBottomWidth:0.5,color:'#999',borderRadius:5,paddingHorizontal:12}} placeholderTextColor='#999' placeholder={user?.withdrawal_password ? 'Enter update withdrawal password':'Re Enter Create new withdrawal password'} />
       
       <TouchableOpacity disabled={updateorcreateloading} onPress={user?.withdrawal_password ? updateWithdrawalPasswordHandler : createWithdrawalPasswordHandler}><Text style={{backgroundColor:'#6aa',color:'white',paddingVertical:4,textAlign:'center',fontWeight:'bold'}}>{updateorcreateloading  ? <ActivityIndicator size="large" size={18} color="white" /> : user?.withdrawal_password ? 'Update':'Create'}</Text></TouchableOpacity>
      </BoxContainer>
      </View>
       
    </ScrollableContainer>
  );
}

export default WithdrawalPassword