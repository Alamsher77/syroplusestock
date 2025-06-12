 
import { View, Text, Button,TouchableOpacity,TextInput } from 'react-native';
import { router } from 'expo-router';
import React,{useState,useEffect,useContext} from 'react';
import ScrollableContainer from '../../component/scrollableitems'
import BoxContainer from '../../component/boxcontainer'
import { AuthContext } from '../../context/AuthContext'; 
import Currency from '../../currency'
import {MaterialCommunityIcons,Entypo,FontAwesome6} from '@expo/vector-icons';
import Colors from '../../Colors/color'
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
         <TouchableOpacity onPress={()=> router.navigate('home/withdrawalhistory')} ><Text  style={{fontWeight:'bold',fontSize:12,paddingHorizontal:20,paddingVertical:6,backgroundColor:Colors.mainColor,color:Colors.flipkart,borderRadius:5
         ,}}>Records</Text></TouchableOpacity>
      </View>
      
      <BoxContainer >
       <TextInput selectionColor='#555'  placeholderTextColor={Colors.flipkart}  onChangeText={setamount} style={{backgroundColor:Colors.mainColor,paddingHorizontal:12,borderRadius:5,color:Colors.flipkart }} type="number" placeholder="Rs 0.00" />
       <Text style={{marginTop:12,color:Colors.mainColor}}>Single fee: 6%</Text>
       <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:12}}>
        <Text style={{color:Colors.mainColor,fontWeight:'bold'}}>Account Balance</Text>
        <Text style={{color:Colors.mainColor,fontWeight:'bold'}}>{Currency(user?.withdrawal_wallet)}</Text>
       </View> 
      </BoxContainer>
      
      <BoxContainer style={{maxHeight: selectbankincresewith ? 200 : 40,overflow:'hidden'}} >
      <TouchableOpacity onPress={()=>setselectbankincresewith(!selectbankincresewith)}  style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
       <View style={{flexDirection:'row',gap:8,justifyContent:'center',alignItems:'center'}}>
        <MaterialCommunityIcons name="bank" size={20} color={Colors.mainColor} />
        <Text style={{color:Colors.mainColor}}>Select your bank</Text>
        </View>
       <Entypo name={selectbankincresewith ? "chevron-small-down" : "chevron-small-right"} size={24} color={Colors.mainColor} />
       </TouchableOpacity>
        
      {
      allbankdetails.length == 0 ?
      <TouchableOpacity onPress={()=> router.navigate('profile/mybankaccount')}><Text style={{marginTop:20, color:'white',alignSelf:'center',backgroundColor:'#999',fontWeight:'bold',padding:6,paddingHorizontal:12,borderRadius:5}}>Add Bank Account</Text></TouchableOpacity> :
        allbankdetails?.map((item,index)=>{
          return(
            <TouchableOpacity  key={index}  onPress={()=> setselectbank(selectbank ? false : item)}>
        <BoxContainer style={{borderWidth: selectbank && item.account == selectbank.account ? 2:0.5,marginTop:20,backgroundColor:Colors.mainColor }}>
        <Text style={{fontSize:12,fontWeight:'bold',color:Colors.flipkart}}>Acount Holder Name : <Text style={{ fontSize:10}}>{item.name}</Text></Text>
        <Text style={{fontSize:12,fontWeight:'bold',color:Colors.flipkart
        }}>Account No : <Text style={{fontSize:10}}>{item.accountNumber}</Text></Text> 
        <FontAwesome6 style={{position:'absolute',right:15,top:15}} name={selectbank && item.account == selectbank.account ? 'circle-check':'circle'} size={24} color={Colors.flipkart} />
       </BoxContainer>
       </TouchableOpacity>
          )
        })
      }
        
      </BoxContainer>
      
      <BoxContainer style={{gap:4}}>
       <Text style={{color:Colors.mainColor,fontSize:14}}>Withdrawal Rules:</Text>
       <Text style={{fontSize:10,color:'gray'}}>1. You can use your bank account to withdraw cash from Monday to Friday from 9 am to 6 pm!</Text>
       <Text  style={{fontSize:10,color:'gray'}}>2. The minimum daily withdrawal amount in 300 rupees. and the maximum daily withdrawal amount in 40,000 rupees!</Text>
       <Text  style={{fontSize:10,color:'gray'}}>3. Each withdrawal fee is 6%, including program development costs and tax deductions.</Text>
       <Text  style={{fontSize:10,color:'gray'}}>4. The withdrawal will be credited within 2-72 hours.</Text>
       <Text></Text>
      </BoxContainer>
      <TouchableOpacity disabled={!validatefornumberoramount} style={{opacity: validatefornumberoramount ? 1 : 0.4}} onPress={withdrawalhandler} ><Text style={{backgroundColor:Colors.mainColor,marginTop:20,paddingVertical:8,color:Colors.flipkart,textAlign:'center',borderRadius:5,fontWeight:'bold'}}>Withdraw</Text></TouchableOpacity>
    </ScrollableContainer>
  );
}

export default WithdrawalToBank