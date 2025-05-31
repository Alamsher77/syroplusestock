
import { View, Text, Button,TouchableOpacity,TextInput,Alert } from 'react-native';
import { router } from 'expo-router';
import React,{useState,useEffect,useContext} from 'react';
import ScrollableContainer from '../../component/scrollableitems'
import BoxContainer from '../../component/boxcontainer'
import { AuthContext } from '../../context/AuthContext'; 
import Currency from '../../currency'
const  RechargeToWallete = ()=> {
  
  const {user} = useContext(AuthContext);
  
  const [amount,setamount] = useState(0)
  const rgex =/^\d*$/.test(amount)  

  const rechargehandler = ()=>{ 
      if(!rgex){
       Alert.alert('Faild validation','please enter the only Number')
        return false
        }
    if(amount < 5){
      Alert.alert("amount","add minimum 100 rupeese")
      return false
    }
     router.push({pathname:'/home/payment',params:{amount}})
    
  }
  return (
    <ScrollableContainer style={{gap:4}}>
      <Text style={{alignSelf:'center',fontWeight:'bold',letterSpacing:2,fontSize:16}}>Recharge</Text>
      <View style={{flexDirection:'row',justifyContent:'flex-end',marginBottom:12}}>
         <TouchableOpacity onPress={()=> router.navigate('/home/rechargehistory')}><Text  style={{fontWeight:'bold',fontSize:12,paddingHorizontal:12,paddingVertical:6,backgroundColor:'#777',color:'white',borderRadius:5
         }}>Records</Text></TouchableOpacity>
      </View>
      
      <BoxContainer >
       <TextInput value={amount} onChangeText={setamount} style={{borderWidth:0.5,borderRadius:5,borderColor: rgex
        ? null : 'red',color:rgex ? null : 'red' }} keyboardType="numeric" type="text" placeholder="Rs 0.00"  placeholderTextColor={rgex ? null : 'red'}  />
       <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:12}}>
        <Text style={{color:'gray'}}>Your account also has</Text>
        <Text style={{color:'#22bB22',fontWeight:'bold'}}>{Currency(user?.wallet)}</Text>
       </View>
      </BoxContainer>
      
      <BoxContainer>
        <Text style={{color:'red'}}>Note: The amount entered and the payment amount must be consistent</Text>
      </BoxContainer>
      
      <TouchableOpacity onPress={rechargehandler}  ><Text style={{backgroundColor:'#FBC02D',marginTop:20,paddingVertical:8,color:'white',textAlign:'center',borderRadius:5,fontWeight:'bold'}}>Recharge</Text></TouchableOpacity>
    </ScrollableContainer>
  );
}

export default RechargeToWallete