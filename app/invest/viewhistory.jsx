
import { View, Text, Button,StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import ScrollableContainer from '../../component/scrollableitems'
import BoxContainer from '../../component/boxcontainer'
import SimarCard from '../../component/purchasesimmer'
import {useState,useContext,useEffect} from 'react';
import Fetchapimethod from '../../configration/fetchapimethod'

const  Viewhistory = ()=> {
  const router = useRouter();
  const [perchaseloading,setperchaseloading] = useState(false)
  const [perchasedata,setperchasedata] = useState([])
  const perchasehistoryfetch = async()=>{
    try {
     setperchaseloading(true)
    const data = await Fetchapimethod({method:'get',url:'create_perchase_product_fetch'})
    setperchaseloading(false)
    const reversdata = data.reverse(-1)
    setperchasedata(reversdata)
    } catch (e) {
    setperchaseloading(false) 
    }
    
  }
  useEffect(()=>{
    perchasehistoryfetch()
  },[])
  return (
    <ScrollableContainer refreshhandler={perchasehistoryfetch} style={{alignItems:'center',gap:3}}>
      <Text style={{padding:12,textTransform:'uppercase',fontWeight:'bold',letterSpacing:1,backgroundColor:'#ccc',marginBottom:8}}>All Purchase Product Records</Text>
      {
        perchaseloading ? 
        <>
        <SimarCard />
        <SimarCard />
        <SimarCard />
        </>
        :
        perchasedata.length == 0 ?
        <Text>No Record Found</Text>
        :
        <View style={{gap:3}}>
        {
        perchasedata?.map((item,index)=>{
          return(
          <BoxContainer key={index}>
           <Text style={{alignSelf:'center',fontWeight:'bold',marginBottom:12}}>{`${item?.categary} : ${item?.name}`}</Text>
          <Text style={styles.title}>Product Price: <Text style={styles.text}>{item?.price}</Text></Text> 
          <Text style={styles.title}>Income Period : <Text style={styles.text}>{item?.incomeperiod}</Text></Text> 
           <Text style={styles.title}>Daily Income : <Text style={styles.text}>{item?.dailyincome}</Text></Text>
           <Text style={styles.title}>Current Obtain :<Text style={styles.text}> {item?.currentObtain}</Text></Text>
           <Text style={styles.title}>Total Available Obtain : <Text style={styles.text}>{item?.availbleObtain}</Text></Text>
           <Text style={styles.title}>Income Period Left : <Text style={styles.text}>{item?.incomeperiod - item?.totalcount}</Text></Text>
           
          <Text style={{position:'absolute',bottom:35,right:5}}>Status : <Text style={{color:item?.status == "complete" ? 'green' : "red"}}>{item?.status} </Text></Text>
           <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:20,gap:12}}>
           <Text style={styles.date}>Purchase Date : {new Date(item?.createdAt).toLocaleDateString()}</Text>
           <Text style={styles.date}>Purchase Time : {new Date(item?.createdAt).toLocaleTimeString()}</Text>
           </View>
           </BoxContainer>
          )
        })
        }
        </View>
      }
      
    </ScrollableContainer>
  );
}

const styles = StyleSheet.create({
  title:{
    fontSize:14,
    fontWeight:'bold'
  },
  date:{
    fontSize:12,
    fontWeight:'bold',
    color:'gray'
  },
  text:{
    color:'gray',
    fontWeight:''
  }
})

export default Viewhistory