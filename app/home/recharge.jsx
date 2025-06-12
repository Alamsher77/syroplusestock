
import { View, Text, Button,TouchableOpacity,TextInput,Alert } from 'react-native';
import { router } from 'expo-router';
import React,{useState,useEffect,useContext} from 'react';
import ScrollableContainer from '../../component/scrollableitems'
import BoxContainer from '../../component/boxcontainer'
import { AuthContext } from '../../context/AuthContext'; 
import Currency from '../../currency'
import axios from 'axios'; 
import Colors from '../../Colors/color'
import Fetchapimethod from '../../configration/fetchapimethod'
import Toast from 'react-native-toast-message'
const  RechargeToWallete = ()=> {
  
  const {user} = useContext(AuthContext);
  
  const [amount,setamount] = useState(0) 
  const validatefornumberoramount = !isNaN(amount) && Number(amount) >= 100;
  
  const [rechargeloading,setrechargeloading] = useState(false)
  const rechargehandler = async()=>{ 
    try {
        setrechargeloading(true)
  const data = await Fetchapimethod({method:'post',data:{amount,currency:'INR'},url:'create_payment_razorpay'})
    setrechargeloading(false)
    if(!data?.success){ 
      Toast.show({type:'error',text1:data?.message})
      return false
    }
    const {key,id,currency} = data.order 
    router.push({pathname:'/home/payment',params:{amount,key,currency,id}})
    } catch (e) {
      Toast.show({type:'error',text1:e.message})
    } 
    
  }
  return (
    <ScrollableContainer style={{gap:4}}>
      <Text style={{alignSelf:'center',fontWeight:'bold',letterSpacing:2,fontSize:16}}>Recharge</Text>
      <View style={{flexDirection:'row',justifyContent:'flex-end',marginBottom:12}}>
         <TouchableOpacity onPress={()=> router.navigate('/home/rechargehistory')}><Text  style={{fontWeight:'bold',fontSize:12,paddingHorizontal:20,paddingVertical:6,backgroundColor:Colors.mainColor,color:Colors.flipkart,borderRadius:5
         }}>Records</Text></TouchableOpacity>
      </View>
      
      <BoxContainer >
       <TextInput selectionColor='#555' value={amount} onChangeText={setamount} style={{borderWidth:0.5,paddingHorizontal:12,backgroundColor: validatefornumberoramount ? Colors.mainColor:Colors.flipkart,borderRadius:5,borderColor: validatefornumberoramount
        ? Colors.flipkart : 'red',color:validatefornumberoramount ? Colors.flipkart : 'red' }} keyboardType="numeric" type="text" placeholder="Rs 0.00"  placeholderTextColor={validatefornumberoramount ? Colors.flipkart : 'red'}  />
       <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:12}}>
        <Text style={{color:Colors.mainColor}}>Your account also has</Text>
        <Text style={{color:Colors.mainColor,fontWeight:'bold'}}>{Currency(user?.wallet)}</Text>
       </View>
      </BoxContainer>
      
      <BoxContainer>
        <Text style={{color:Colors.mainColor}}>Amount must be recharge graterthan of 100 rupeese</Text>
        <Text style={{color:'red'}}>Note: The amount entered and the payment amount must be consistent</Text>
      </BoxContainer>
      
      <TouchableOpacity disabled={!validatefornumberoramount} onPress={rechargehandler} style={{opacity: validatefornumberoramount ? 1 : 0.3}} ><Text style={{backgroundColor:Colors.mainColor,marginTop:20,paddingVertical:8,color:Colors.flipkart,textAlign:'center',borderRadius:5,fontWeight:'bold'}}>Recharge</Text></TouchableOpacity>
    </ScrollableContainer>
  );
}

export default RechargeToWallete