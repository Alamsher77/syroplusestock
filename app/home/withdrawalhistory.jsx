

import { View, Text, Button,TouchableOpacity,TextInput,Alert } from 'react-native';
import { router } from 'expo-router';
import React,{useState,useEffect,useContext} from 'react';
import ScrollableContainer from '../../component/scrollableitems'
import BoxContainer from '../../component/boxcontainer' 
import SimarCard from '../../component/purchasesimmer' 
import Currency from '../../currency'
import Fetchapimethod from '../../configration/fetchapimethod'
import Toast from 'react-native-toast-message';
const  withdrawalhistory = ()=> {
 
  const [withdrawalhistoryloading,setwithdrawalhistoryloading] = useState(false)
  const [withdrawalhistorydata,setwithdrawalhistorydata] = useState([])

  const fetchwithdrawalhistory = async ()=>{
    try {
      setwithdrawalhistoryloading(true)
      const data = await Fetchapimethod({method:'get',url:'all_withdrawal_history'})
      setwithdrawalhistoryloading(false)
      if(!data?.success){
       Toast.show({type:'error',text1:data?.message || 'Something went wrong'})
       return;
      }
      setwithdrawalhistorydata(data.data)
    } catch (e) {
      setwithdrawalhistoryloading(false)
      console.log(e.message)
    }
  } 
console.log(withdrawalhistorydata)
  useEffect(()=>{
    fetchwithdrawalhistory()
  },[])

  console.log(withdrawalhistorydata)
  return (
    <ScrollableContainer refreshhandler={fetchwithdrawalhistory}  style={{gap:4}}>
      <Text style={{alignSelf:'center',fontWeight:'bold',letterSpacing:2,fontSize:16}}>Withdrawal History</Text>
       {withdrawalhistoryloading ?  
       <>
       <SimarCard />
       <SimarCard />
       <SimarCard />
       </>
        : 
          withdrawalhistorydata.length === 0 ? 
            <Text style={{alignSelf:'center',fontWeight:'bold',letterSpacing:2,fontSize:16}}>No Withdrawal History Found</Text>
          :
            withdrawalhistorydata.map((item, index) => {
              return (<BoxContainer key={index} style={{gap:4}}>
                 <Text style={{color:'black',fontWeight:'bold'}}>Withdrawal ID :
                   <Text style={{color:'gray',fontWeight:'',fontSize:12}}> {item?._id}</Text>
                 </Text>
                 <Text style={{color:'black',fontWeight:'bold'}}>Bank Name :
                   <Text style={{color:'gray',fontWeight:'',fontSize:12}}> {item?.bankdetails?.bankName}</Text>
                 </Text>
                 <Text style={{color:'black',fontWeight:'bold'}}>Account Number :
                    <Text style={{color:'gray',fontWeight:'',fontSize:12}}> {item?.bankdetails?.accountNumber}</Text>
              </Text>
                <Text style={{color:'black',fontWeight:'bold'}}>Requested Amount :
                <Text style={{color:'#22bB22',fontWeight:'',fontSize:12}}>  {Currency(item?.amount)}</Text>
              </Text> 
              <Text style={{color:'black',fontWeight:'bold'}}>Withdrawal Amount :
                <Text style={{color:'#22bB22',fontWeight:'',fontSize:12}}>  {Currency(item?.withdrawalAmount)}</Text>
              </Text> 
              
              <Text style={{color:'black',fontWeight:'bold'}} >Status  : 
                <Text style={{color:  '#22bB22',fontWeight:'bold',textTransform:'uppercase',fontSize:12}}>{item?.status}</Text>
              </Text>
              <View style={{flexDirection:'row',gap:5,justifyContent:'flex-end',marginTop:12}}>
                <Text style={{color:'black',fontWeight:'bold'}}>Date :  
                  <Text style={{fontSize:12,color:'gray'}}> {new Date(item?.createdAt).toLocaleDateString()}</Text>
                </Text>
              </View>
            </BoxContainer>
           )
         })
       }
    </ScrollableContainer>
  );
}

export default withdrawalhistory