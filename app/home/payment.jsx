import QRCode from 'react-native-qrcode-svg';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator
} from 'react-native';
import {
  useRouter,
  useLocalSearchParams
} from 'expo-router';
import React, {
  useState,
  useEffect,
  useContext
} from 'react';
import ScrollableContainer from '../../component/scrollableitems'
import BoxContainer from '../../component/boxcontainer'
import Currancy from '../../currency'
import Fetchapimethod from '../../configration/fetchapimethod'
import {WebView} from 'react-native-webview'
import Toast from 'react-native-toast-message'
const  Payment = ()=> {
  const router = useRouter();
    const {amount} = useLocalSearchParams(); 
  const generateUpiUrl = (upiId, name, amount) =>{
  return `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR`;}

  const upiUrl = generateUpiUrl("easyshop760904.rzp@rxairtel", "Invest flipkar", amount);
  const [time,settime] = useState(600)
  useEffect(() => {
    const interval = setInterval(() => {
      if (time >  0 ) {
        settime(prev => prev - 1);
      }

      }, 1000); // runs every 1 second
      // Cleanup
      return () => clearInterval(interval);
    },[time]);
    const [paymentloading,setpaymentloading] = useState(false)
    const [utrnumber,setutrnumber] = useState(null)
    const rgex =/^\d{12}$/.test(utrnumber)
    const paymentHandler = async()=>{
      try {
        /* code */
        if(!rgex){
       Toast.show({text1:"Enter the 12 digist of UTR number",type:'error'})
        return false
      }
      setpaymentloading(true)
        const data = await Fetchapimethod({route:'admin-invest',method:'post',url:'createrechargetransation',data:{utrnumber,recharge_amount:amount}})
        setpaymentloading(false)
        if(!data?.success){
          Toast.show({text1:data?.message,type:'error'})
          return false
        }
        Toast.show({text1:data?.message,type:'success'})
        router.navigate('/')
      } catch (e) {
        setpaymentloading(false)
        Toast.show({text1:e?.message,type:'error'})
      }



    }
  return (
    <ScrollableContainer style={{gap:4,justifyContent:"center"}}>
      <Text style={{alignSelf:'center',fontWeight:'bold',letterSpacing:2,fontSize:16}}>Payment Mode</Text>
      <BoxContainer style={{justifyContent:'center',paddingBottom:40,alignItems:'center',gap:12}}>
      <Text style={{color:'gray'}}>Payble Amount :  <Text style={{fontWeight:'bold',color:'#22bB22'}}>{Currancy(amount)}</Text></Text>
      <Text style={{width:240,color:'red',textAlign:'center'}}>Scan the Qr code and payment After the payment please Enter the UTR number to conform your payment !</Text>
      <Text>Payment expire : {time}s</Text>
      <QRCode value={upiUrl} size={200} />
      <TextInput style={{borderWidth:0.5,width:200,paddingHorizontal:23,borderRadius:5}} type="text" placeholder="UTR : 123456789012" onChangeText={setutrnumber} keyboardType="numeric"  />
        <TouchableOpacity disabled={paymentloading} onPress={paymentHandler} style={{backgroundColor:'#22bB22',paddingHorizontal:40,paddingVertical:4,borderRadius:5}}><Text style={{color:'white'}}>{paymentloading ? <ActivityIndicator size="large" size={18} color="white" /> : "Submit"}</Text></TouchableOpacity>
      </BoxContainer>
    </ScrollableContainer>
  );
}

export default Payment