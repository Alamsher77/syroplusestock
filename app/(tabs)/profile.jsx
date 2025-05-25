import { View, Text,Alert,Button,TouchableOpacity,StyleSheet,Image,Share } from 'react-native';
import {useContext} from "react"
import { useRouter,Redirect } from 'expo-router';
import { AuthContext } from '../../context/AuthContext';
import ScrollableContainer from '../../component/scrollableitems'
import BoxContainer from '../../component/boxcontainer'
import Colors from '../../Colors/color'
import Currancy from '../../currency'
import { Ionicons, FontAwesome, MaterialIcons, Entypo, FontAwesome5,AntDesign } from "@expo/vector-icons";
import DomainUrl from '../../configration/Index'
export default function Profile() {
  const { login,user,logout } = useContext(AuthContext);
  
  const router = useRouter();
  const handler = ()=>{
    try {
    logout()
    router.replace("/")
    Alert.alert("success","Logout successfully")
    } catch (e) {
      e.message
    }
  }
  const handalshare = async(text) => { 
    await Share.share({
        message:
          `My invite code  link! ${text}`,
        url:text, // For iOS
        title: 'Invitation Links',      // For iOS
      }); 
  };
  return (
    <ScrollableContainer style={{gap:3}}>
      <BoxContainer style={{alignItems:'center'}}>
       <Text style={{marginBottom:12,fontWeight:'bold',textTransform:'uppercase',letterSpacing:2,fontFamily:'Royal'}}>profile</Text>
       <Image
            source={require('../../assets/images/flipcart.png')} // Replace with your own logo 
            style={{width:50,height:50, }}
          />
        <Text style={{fontWeight:'bold',color:Colors?.flipkart, textShadowColor: 'red',textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,}}>Invest To Flipkart</Text>
      <View style={styles.textcontainer}>
        <Text style={styles?.text}>Name :</Text>
        <Text style={{color:'gray'}}>{user?.name}</Text>
      </View>
       <View style={styles.textcontainer}>
        <Text style={styles?.text}>Phone Number :</Text>
        <Text style={{color:'gray'}}>{user?.phone}</Text>
      </View>
      <View style={styles.textcontainer}>
        <Text style={styles?.text}>Invite Code :</Text>
        <Text style={{color:'gray'}}>{user?.invitecode}</Text>
      </View>
      <View style={styles.textcontainer}>
        <Text style={styles?.text}>Invite Url :</Text>
        <Text numberOfLines={1}
  ellipsizeMode="tail" style={{color:'gray',width:"65%"}}>{`${DomainUrl?.url}authe/alluser?id=${user?.invitecode}`}</Text>
    <TouchableOpacity style={styles.coppycontainer} onPress={()=>handalshare(`${DomainUrl?.url}authe/alluser?id=${user?.invitecode}`)} ><AntDesign name="sharealt" size={19} color="black" /></TouchableOpacity>
      </View>
      
   
       <View style={{marginVertical:10,width:'100%',height:0.6,backgroundColor:'gray'}} />
       
        <View style={{width:'100%',paddingHorizontal:12}}> 
         <Text style={[styles.text,{textTransform:'uppercase',}]}>Wallet Balance</Text> 
         <Text style={[styles.earningValue,{ fontSize: 22,}]}>{Currancy(user?.wallet)}</Text>
         </View>
       {   
    // AmountCard data
     <View style={{width:'90%',marginTop:12,flexDirection:'row',gap:4,flexWrap:'wrap',justifyContent:"space-between"}}>
         <AmountCard title='Total Withdrawal' price={Currancy(user?.total_withdrawal)} /> 
         <AmountCard title='Total Recharge' price={Currancy(user?.total_recharge)} /> 
         <AmountCard title='Today Income' price={Currancy(user?.today_income)} />   
         <AmountCard title='Total Income' price={Currancy(user?.total_income)} />  
         <AmountCard title='Team Size' price={user?.team_size} />  
         <AmountCard title='Team Income' price={Currancy(user?.team_income)} /> 
         </View>}
      </BoxContainer> 
      <BoxContainer>
         {
    // optionList data
     <View style={styles.optionList}>
        <OptionItem icon="users" onPress={()=>router.navigate('/profile/teamfund')} text="Team fund" />
        <OptionItem icon="file-invoice-dollar" text="Funding details" />
        <OptionItem icon="money-check-alt" text="Withdrawal Record" />
        <OptionItem icon="lock" text="Login Password" />
        <OptionItem icon="unlock-alt" text="Withdrawal Password" />
        <OptionItem icon="university" text="My bank account" />
      </View> 
     }
         <View style={styles.optionList}>
        <OptionItem icon="network-wired" text="Customer Service" />
        <OptionItem onPress={handler} icon="sign-out-alt" text="Sign Out" />
      </View>
      </BoxContainer>
    </ScrollableContainer>
  );
}

const OptionItem = ({ icon, text, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.optionItem}>
    <FontAwesome5 name={icon} size={20} color="green" />
    <Text style={styles.optionText}>{text}</Text>
    <MaterialIcons name="navigate-next" size={24} color="gray" />
  </TouchableOpacity>
);

const AmountCard = ({title,price})=>(
    <BoxContainer style={{width:'48%',shadowColor:'rgba(0,0,0,0.9)', }}>
          <Text style={[styles.text,{color:'gray'}]}>{title}</Text>
          <Text style={[styles.earningValue,{fontSize: 16},]}>{price}</Text>
      </BoxContainer>
  )

const styles = StyleSheet.create({
 text:{
   fontWeight:'bold'
 },
 textcontainer:{
   width:200,
   flexDirection: 'row',
   justifyContent: 'space-between', 
   gap:12,
   position:'relative',
 },
  optionList: { margin: 10, backgroundColor: "white", borderRadius: 10 },
  optionItem: { flexDirection: "row", alignItems: "center", padding: 15, borderBottomWidth: 1, borderColor: "#eee" },
  optionText: { flex: 1, fontSize: 16, marginLeft: 10 },
   earningValue: {
    fontWeight: 'bold',
    color: '#FBC02D',
  },
  coppycontainer:{
    position:'absolute',
    right:-25,
  }
})