import {useContext,useState,useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView,StatusBar,Image,FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import ScrollableContainer from '../../component/scrollableitems'
import { FontAwesome6,MaterialIcons,MaterialCommunityIcons,Fontisto } from "@expo/vector-icons";
import { AuthContext } from '../../context/AuthContext';
import BoxContainer from '../../component/boxcontainer'
import Investproductiteam from '../../component/investproductiteam'
import axios from 'axios'
import LoadingSimarCard from '../../component/simmer'
import Swipablebanner from '../../component/swipablebanner'
export default function Home() {
  const {investProduct,productlodding, login,user,logout } = useContext(AuthContext);
  const router = useRouter();  
  const [randomProducts,setRandomProducts] = useState([])
  
   function getRandomObjects(array) {
    let shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0,3);
}

useEffect(()=>{
  setRandomProducts(getRandomObjects(investProduct))
},[productlodding])

const [bannerdata,setbannerdata] = useState(null)

const fetchbannerdatafromapi = async ()=>{
 const response = await axios.get("https://backend-alamsher-ansari-s-projects.vercel.app/api/showallbanners")
  setbannerdata(response.data)
}

useEffect(()=>{
  fetchbannerdatafromapi()
},[])
  return (
   <ScrollableContainer style={{gap:6}}> 
      {/* Fast Banner Section */}
      <View style={styles.header}>
        <View style={{width:40,height:40,padding:2,borderWidth:1,borderColor:'green',borderRadius:50}}><Image style={{width:'100%',height:'100%'}} source={require('../../assets/images/flipcart.png')} /></View>
        <TouchableOpacity onPress={()=>router.navigate('/profile')} style={{width:35,height:35,padding:2,borderRadius:"50%",justifyContent:'center',alignItems:'center',backgroundColor:'#000'}}>
        {
          user ? <Text style={{color:'white',fontSize:21,fontWeight:'bold'}}>{user.name.charAt(0)}</Text>: <FontAwesome6 name='user-circle' color="white" size={27} />
        }
       </TouchableOpacity>
      </View>
      
      <BoxContainer  style={styles.bannerSection}>
        <Text style={styles.bannerText}>🔥 Fast Transactions | Safe & Secure 🔒</Text>
          <Swipablebanner bannerdata={bannerdata} />
          <View >
          
          </View>
      </BoxContainer>
      

      {/* Recharge & Withdrawal Section */}
      <BoxContainer style={styles.rechargeWithdrawSection}>
        <TouchableOpacity onPress={()=>router.navigate('home/recharge')} style={[styles.actionbtn,{ backgroundColor: '#f44336', width: '48%',}]}>
          <Fontisto name="wallet" size={18} color="white" />
          <Text style={styles.buttonText}>Recharge</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> router.navigate('home/withdrawal')} style={[styles.actionbtn,{ backgroundColor: '#4CAF50', width: '48%',}]}>
         <MaterialCommunityIcons name="bank" size={24} color="white" />
         <Text style={styles.buttonText}>Withdraw</Text>
        </TouchableOpacity>
      </BoxContainer>

      {/* Service Section */}
      <BoxContainer style={{gap:5}} >
        <BoxContainer style={styles.header} >
          <Text  style={{color:'gray'}} >Investment Product</Text> 
        <TouchableOpacity onPress={()=>router.navigate('/invester')} style={{flexDirection:'row'}}>
        <Text style={{color:'gray'}}>See more</Text>
        <MaterialIcons name="navigate-next" size={24} color="black" />
        </TouchableOpacity>
        </BoxContainer> 
        {
          productlodding ?
          <>
          <LoadingSimarCard />
          <LoadingSimarCard />
          <LoadingSimarCard />
          </>
          :
          investProduct.length == 0 ?
          <Text>No Records</Text>
          :
          randomProducts?.map((item,index)=>{
            return <Investproductiteam key={index} item={item} sample={true} />
          })
           
        }
          
      </BoxContainer> 
    </ScrollableContainer>
  );
}

const styles = StyleSheet.create({ 
  bannerSection: {
    // backgroundColor: '#ffe600',
    padding:5,
    borderRadius: 10, 
    alignItems: 'center',
    overflow:'hidden'
  },
  header:{
    paddingBottom:10,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  bannerText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical:8
  },
  rechargeWithdrawSection: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
  },
  actionbtn: {
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    elevation:5,
    shadowColor:'black', 
    borderWidth:2,
    borderColor:'white',
    flexDirection:'row',
    gap:6,
    justifyContent:'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
 
});