
import { View, Text, Button,TouchableOpacity,TextInput,Alert } from 'react-native';
import { router } from 'expo-router';
import React,{useState,useEffect,useContext} from 'react';
import ScrollableContainer from '../../component/scrollableitems'
import BoxContainer from '../../component/boxcontainer' 
import SimarCard from '../../component/purchasesimmer' 
import Currency from '../../currency'
import Fetchapimethod from '../../configration/fetchapimethod'
const  RechargeHistory = ()=> {
  const [fetchtaransactionloading,setfetchtransactionloading] = useState(false)
  const [fetchtransactiondata,setfetchtrasactiondata] = useState([])
  const fetchtransaction = async ()=>{
    try {
      setfetchtransactionloading(true)
         const data = await Fetchapimethod({method:'get',url:'fetch_recharge_transaction'})
         setfetchtransactionloading(false)
         setfetchtrasactiondata(data.reverse(-1))
    } catch (e) {
      setfetchtransactionloading(false)
      console.log(e.message)
    }
  
  }
  
  useEffect(()=>{
    fetchtransaction()
  },[])
  return (
    <ScrollableContainer refreshhandler={fetchtransaction} style={{gap:4}}>
      <Text style={{alignSelf:'center',fontWeight:'bold',letterSpacing:2,fontSize:16}}>Recharge History</Text>
      
      {
        fetchtaransactionloading ?  
        <>
       <SimarCard />
       <SimarCard />
       <SimarCard />
       </>
       :
       fetchtransactiondata?.length == 0 ? 
       <Text>No Records</Text>
       :
       fetchtransactiondata?.map((item,index)=>{
         return (
          <BoxContainer key={index} style={{gap:4}}>
           <Text style={{color:'black',fontWeight:'bold'}}>Name :
           <Text style={{color:'gray',fontWeight:'',fontSize:12}}> {item?.name}</Text>
           </Text>
           <Text style={{color:'black',fontWeight:'bold'}}>UTR Number :
           <Text style={{color:'gray',fontWeight:'',fontSize:12}}> {item?.utrnumber}</Text>
           </Text>
           <Text style={{color:'black',fontWeight:'bold'}}>Recharge amount :
           <Text style={{color:'#22bB22',fontWeight:'',fontSize:12}}>  {Currency(item?.recharge_amount)}</Text>
           </Text> 
           <Text style={{color:'black',fontWeight:'bold'}} >Payment Status  : <Text style={{color:item?.status == 'completed' ? '#22bB22': item?.status == 'Proccess' ? 'blue' : 'red' ,fontWeight:'bold',textTransform:'uppercase',fontSize:12}}>{item?.status}</Text></Text>
           <View style={{flexDirection:'row',gap:'5',justifyContent:'flex-end',marginTop:12}}>
           <Text style={{color:'black',fontWeight:'bold'}}>Date :  
            <Text style={{fontSize:12,color:'gray'}}> {new Date(item?.createdAt).toLocaleDateString()}</Text>
           </Text>
           <Text style={{color:'black',fontWeight:'bold'}}>Time :  
            <Text style={{fontSize:12,color:'gray'}}> {new Date(item?.createdAt).toLocaleTimeString()}</Text>
           </Text>
          
           </View>
          </BoxContainer>
         )
       })
      }
    </ScrollableContainer>
  );
}

export default RechargeHistory