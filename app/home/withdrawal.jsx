 
import { View, Text, Button,TouchableOpacity,TextInput } from 'react-native';
import { router } from 'expo-router';
import React,{useState,useEffect,useContext} from 'react';
import ScrollableContainer from '../../component/scrollableitems'
import BoxContainer from '../../component/boxcontainer'
import { AuthContext } from '../../context/AuthContext'; 
import Currency from '../../currency'
import {MaterialCommunityIcons,Entypo,FontAwesome6} from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
const  WithdrawalToBank = ()=> {
  const {user,allbankdetails} = useContext(AuthContext);
  const [selectbankincresewith,setselectbankincresewith] = useState(false)
  const [selectbank,setselectbank] = useState(false)
  
  const [amount,setamount] = useState(0)
  const validatefornumberoramount = !isNaN(amount) && Number(amount) >= 300;
 const withdrawalhandler = ()=>{
    if(!validatefornumberoramount){
     Toast.show({type:'error',text1:'Please Enter the '})
      return false
    }
    if(!selectbank){
     Toast.show({type:'error',text1:'Please select your bank'}) 
      return false
    }
    Toast.show({type:'success',text1:'Withdrawal successFully'})
    // if(amount > user?.withdrawal_wallet){
    //   alert('unsufficient balance')
    //   return false
    // }
    
    
 }
  
  return (
    <ScrollableContainer style={{gap:4}}>
      <Text style={{alignSelf:'center',fontWeight:'bold',letterSpacing:2,fontSize:16}}>Withdrawal</Text>
      <View style={{flexDirection:'row',justifyContent:'flex-end',marginBottom:12}}>
         <TouchableOpacity onPress={()=> router.navigate('home/withdrawalhistory')} ><Text  style={{fontWeight:'bold',fontSize:12,paddingHorizontal:12,paddingVertical:6,backgroundColor:'#777',color:'white',borderRadius:5
         }}>Records</Text></TouchableOpacity>
      </View>
      
      <BoxContainer >
       <TextInput    onChangeText={setamount} style={{borderWidth:0.5,borderRadius:5 }} type="number" placeholder="Rs 0.00" />
       <Text style={{marginTop:12,color:'gray'}}>Single fee: 6%</Text>
       <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:12}}>
        <Text style={{color:'gray'}}>Account Balance</Text>
        <Text style={{color:'#22bB22',fontWeight:'bold'}}>{Currency(user?.withdrawal_wallet)}</Text>
       </View> 
      </BoxContainer>
      
      <BoxContainer style={{maxHeight: selectbankincresewith ? 200 : 40,overflow:'hidden'}} >
      <TouchableOpacity onPress={()=>setselectbankincresewith(!selectbankincresewith)}  style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
       <View style={{flexDirection:'row',gap:8,justifyContent:'center',alignItems:'center'}}>
        <MaterialCommunityIcons name="bank" size={20} color="#22bB22" />
        <Text style={{color:'gray'}}>Select your bank</Text>
        </View>
       <Entypo name={selectbankincresewith ? "chevron-small-down" : "chevron-small-right"} size={24} color="black" />
       </TouchableOpacity>
        
      {
      allbankdetails.length == 0 ?
      <TouchableOpacity onPress={()=> router.navigate('profile/mybankaccount')}><Text style={{marginTop:20, color:'white',alignSelf:'center',backgroundColor:'#999',fontWeight:'bold',padding:6,paddingHorizontal:12,borderRadius:5}}>Add Bank Account</Text></TouchableOpacity> :
        allbankdetails?.map((item,index)=>{
          return(
            <TouchableOpacity  key={index}  onPress={()=> setselectbank(selectbank ? false : item)}>
        <BoxContainer style={{borderWidth: selectbank && item.account == selectbank.account ? 2:0.5,marginTop:20, }}>
        <Text style={{fontSize:12,fontWeight:'bold'}}>Acount Holder Name : <Text style={{color:'gray'}}>{item.name}</Text></Text>
        <Text style={{fontSize:12,fontWeight:'bold'}}>Account No : <Text style={{color:'gray'}}>{item.accountNumber}</Text></Text> 
        <FontAwesome6 style={{position:'absolute',right:15,top:15}} name={selectbank && item.account == selectbank.account ? 'circle-check':'circle'} size={24} color="black" />
       </BoxContainer>
       </TouchableOpacity>
          )
        })
      }
        
      </BoxContainer>
      
      <BoxContainer style={{gap:4}}>
       <Text style={{color:'gray',fontSize:14}}>Withdrawal Rules:</Text>
       <Text style={{fontSize:10,color:'gray'}}>1. You can use your bank account to withdraw cash from Monday to Friday from 9 am to 6 pm!</Text>
       <Text  style={{fontSize:10,color:'gray'}}>2. The minimum daily withdrawal amount in 300 rupees. and the maximum daily withdrawal amount in 40,000 rupees!</Text>
       <Text  style={{fontSize:10,color:'gray'}}>3. Each withdrawal fee is 6%, including program development costs and tax deductions.</Text>
       <Text  style={{fontSize:10,color:'gray'}}>4. The withdrawal will be credited within 2-72 hours.</Text>
       <Text></Text>
      </BoxContainer>
      <TouchableOpacity disabled={!validatefornumberoramount} style={{opacity: validatefornumberoramount ? 1 : 0.4}} onPress={withdrawalhandler} ><Text style={{backgroundColor:'#FBC02D',marginTop:20,paddingVertical:8,color:'white',textAlign:'center',borderRadius:5,fontWeight:'bold'}}>Withdraw</Text></TouchableOpacity>
    </ScrollableContainer>
  );
}

export default WithdrawalToBank