import { View, Text, Button,StyleSheet,TouchableOpacity,ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import ScrollableContainer from '../../component/scrollableitems'
import { AuthContext } from '../../context/AuthContext';
import React,{useState,useEffect,useContext} from 'react';
import BoxContainer from '../../component/boxcontainer' 
import Currency from '../../currency'
import Fetchapimethod from '../../configration/fetchapimethod'
import Toast from 'react-native-toast-message'
const  TransferToWithdrawal = ()=> {
  const router = useRouter();
   const {user} = useContext(AuthContext);
   const [convertloading,setconvertloading] = useState(false)
   const converthandler = async ()=>{
     try {
        setconvertloading(true)
    const data = await Fetchapimethod({method:'post',data:{amount:user?.total_withdrawal},url:'convert_to_withdrawal_wallete'})
    setconvertloading(false)
    if(!data?.success){
     Toast.show({type:'error',text1:data?.message})
      return false
    }
     Toast.show({type:'success',text1:data?.message})
     } catch (e) {
       setconvertloading(false)
       Toast.show({type:'error',text1:e?.message})
     }
    
   }
  return (
    <ScrollableContainer style={{gap:12}}>
       <Text style={{alignSelf:'center',fontWeight:'bold',letterSpacing:2,fontSize:16}}>Transfer To Withdrawal</Text>
      <BoxContainer style={{marginTop:20}}>
       <View style={{marginLeft:30,}}>
        <Text style={{fontWeight:'bold',fontSize:14}}>Total Available Balance</Text>
        <Text style={{color:'#22bB22',paddingTop:8,fontSize:25}}>{Currency(user?.total_withdrawal)}</Text>
       </View>
       <View style={{flexDirection:'row',marginTop:12,justifyContent:'space-evenly'}}>
        <BoxContainer style={{}}>
         <Text style={{fontWeight:'bold'}}>Today Income</Text>
         <Text style={{color:'#22bB22',paddingTop:8,fontSize:17}} >{Currency(user?.today_income)}</Text>
        </BoxContainer>
         <BoxContainer style={{}}>
         <Text style={{fontWeight:'bold'}}>Total Income</Text>
         <Text style={{color:'#22bB22',paddingTop:8,fontSize:17}} >{Currency(user?.total_income)}</Text>
        </BoxContainer>
       </View>
      </BoxContainer>
      
      <BoxContainer style={{gap:12}}>
       <Text style={styles.text}>1. Total Available Balance: This is the total amount currently available in your account, but not yet eligible for withdrawal.</Text>
       <Text style={styles.text}>2. Convert Button: A button that allows you to transfer your available balance to your withdrawal balance.</Text>
       <Text style={styles.text}>3. On Click Convert: When you click the "Convert" button, your Total Available Balance is transferred to your Withdrawal Balance.</Text>
       <Text style={styles.text}>4. 👉 "Please note: After clicking the 'Convert' button, your Total Available Balance will be converted into your Withdrawal Balance."</Text>
      </BoxContainer>
      
      <TouchableOpacity disabled={convertloading} onPress={converthandler}>
       <Text style={{backgroundColor:'#FBC02D',marginTop:20,paddingVertical:8,color:'white',textAlign:'center',borderRadius:5,fontWeight:'bold'}}>{convertloading ? <ActivityIndicator size="large" size={18} color="white" /> : "Convert"}</Text>
      </TouchableOpacity>
    </ScrollableContainer>
  );
}

const styles = StyleSheet.create({
  text:{
    fontSize:14,
    color:'gray', 
  }
})
export default TransferToWithdrawal