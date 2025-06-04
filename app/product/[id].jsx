
import { View, Text,Image, StyleSheet,ScrollView,SafeAreaView,TouchableOpacity,Button, ActivityIndicator} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import {useState,useContext,useEffect} from 'react';
// import products from '../../assets/data/products.json';
import { AuthContext } from '../../context/AuthContext';
import BoxContainer from '../../component/boxcontainer';
import ScrollableContainer from '../../component/scrollableitems'
import Currancy from '../../currency'
import Fetchapimethod from '../../configration/fetchapimethod'
import Toast from 'react-native-toast-message'
 
export default function ProductDetail() {
  const { id } = useLocalSearchParams();
      const {investProduct,user,loadUser} = useContext(AuthContext);
  const product = investProduct.find((item) => item._id === id); 
  const [perchaselodding,setperchaselodding] = useState(false)
  const purchaseProductHandler = async()=>{
    try {
     setperchaselodding(true)
    const data = await Fetchapimethod({data:product,url:'create_perchase_product',method:'post'})
     setperchaselodding(false)
   if(!data?.success){
     Toast.show({type:'error',text1:data?.message})
     return false
   }
     Toast.show({type:'success',text1:data?.message})
   loadUser()
    } catch (e) {
      setperchaselodding(false)
        Toast.show({type:'error',text1:e.message})
    }
   
  }
  
  
  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product not found.</Text>
      </View>
    );
  }

  return ( 
    <ScrollableContainer style={{gap:3,position:'relative'}}> 
      <View style={styles.imagecontainer}>
       <Image style={styles.image} source={{ uri:"https://res.cloudinary.com/dw6kism8o/image/upload/v1747530357/qu6kjsjxvbeyraaffqvj.jpg"}}  resizeMode="contain" />
      </View>
      <BoxContainer style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between',gap:4}}>
        <AmountCard title="Principal" price={Currancy(product?.price)} />
        <AmountCard title="Daily Income" price={Currancy(product?.dailyincome)} />
        <AmountCard title="Income Period" price={`${product?.incomeperiod} Days`} />
        <AmountCard title="Daily Income Rate" price={`${product?.percentage} %`} />
       <AmountCard title="Total Profite" price={Currancy(product?.dailyincome * product?.incomeperiod)} />
        <AmountCard title="Principal + Profite" price={Currancy(product?.totalincome)} />
        
      </BoxContainer>
      <BoxContainer style={{marginBottom:12}}>
       <Text style={{color:'#FBC02D',marginBottom:12}}>Product Information </Text>
       <Text>{product?.description}</Text>
      </BoxContainer> 
      <TouchableOpacity disabled={perchaselodding} onPress={purchaseProductHandler} style={{backgroundColor:'#FBC02D',paddingVertical:8,borderRadius:12,}}>
       <Text style={{color:'white',fontWeight:'bold',fontSize:13,alignSelf:'center'}}>{perchaselodding ?  <ActivityIndicator size="large" size={18} color="white" /> : "INVEST NOW"}</Text>
      </TouchableOpacity>
       
    </ScrollableContainer> 
  );
}
const AmountCard = ({title,price})=>(
    <BoxContainer style={{width:'48%',shadowColor:'rgba(0,0,0,0.9)', }}>
          <Text style={{fontWeight:'bold',color:'gray'}}>{title}</Text>
          <Text style={[styles.earningValue,{fontSize: 16},]}>{price}</Text>
      </BoxContainer>
  )
const styles = StyleSheet.create({
  imagecontainer:{
   width:300,
   height:250, 
   alignSelf:'center'
  },
  container: {flex:1},
  image: {borderRadius: 10, height:'100%',width:'100%' },
  name: { fontSize: 24, fontWeight: 'bold' },
  price: { fontSize: 20, color: '#777', marginVertical: 10 },
  description: { fontSize: 16,fontFamily: '', },
  earningValue: {
    fontWeight: 'bold',
    color: '#FBC02D',
  },  
});
