import QRCode from 'react-native-qrcode-svg';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator, 
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
    const {amount,key,currency,id} = useLocalSearchParams();
    console.log(id)
 const onMessage =  async(event)=>{
   
     try {
          const datares = JSON.parse(event.nativeEvent.data);
     if (datares.event === "success") {
      const alldataforres = datares.response
    const data = await Fetchapimethod({method:'post',data:{...alldataforres,amount},url:'verify_razorpay_payment'})
    
    if(!data?.success){
      Toast.show({type:'error',text1:data?.message})
      return false
    }
     Toast.show({type:'success',text1:data?.message})
      router.back();
    } else if (datares.event === "dismiss") {
      Toast.show({type:'error',text1:"Payment Cancelled"}) 
      router.back(); // or close modal
    }
     } catch (e) {
       alert(e.message)
     }
 }
 
 
 
 
 
 
 
 
 const htmlContent = `
    <html>
      <head><script src="https://checkout.razorpay.com/v1/checkout.js"></script></head>
      <body>
        <script>
          var options = {
            "key": "${key}",
            "amount": ${amount * 100},
            "currency": "${currency}",
            "name": "Syro Plus Stock",
            "order_id": "${id}",
            "description": "Test Transaction",
            "handler": function (response){
              window.ReactNativeWebView.postMessage(JSON.stringify({event:"success",response}));
            },
            "modal": {
              ondismiss: function () {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  event: "dismiss"
                }));
              }
            },
            "theme":{
           "color":"#009999"
            },
          };
          var rzp1 = new Razorpay(options);
          rzp1.open();
        </script>
      </body>
    </html>
  `;
  
  
  return(
    <View style={{flex:1,}}>
    <WebView 
    originWhitelist={['*']}
      source={{ html: htmlContent }}
      onMessage={onMessage}
    />
    </View>
    )
}

export default Payment