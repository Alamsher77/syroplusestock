import { View, Text, Button,TouchableOpacity,TextInput,Alert,ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import React,{useState,useEffect,useContext} from 'react';
import ScrollableContainer from '../../component/scrollableitems'
import BoxContainer from '../../component/boxcontainer' 
import SimarCard from '../../component/purchasesimmer' 
import Currency from '../../currency'
import { AuthContext } from '../../context/AuthContext'; 
import Fetchapimethod from '../../configration/fetchapimethod'
import Toast from 'react-native-toast-message'
const  Mybankaccount = ()=> {
    const {allbankdetails,allbankdetailsloadin} = useContext(AuthContext);
 const [openaddbankform,setopenaddbankform] = useState(false)
 const [bankdetails,setbankdetails] = useState({
   name:'',
   bankName:'',
   accountNumber:'',
   conformAccountNumber:'',
   ifscCode:''
 })
 
 const changehandler = (key,value)=>{
   setbankdetails((prev)=>({...prev,[key]:value}))
 }
 
 const [submitloading,setsubmitloading] = useState(false)
 const submithandler = async()=>{
   try {
     setsubmitloading(true)
     const data = await Fetchapimethod({data:bankdetails,url:'add_bank_account_details',method:'post'})
     setsubmitloading(false)
     if(!data.success){
      Toast.show({type:'error',text1:data?.message})
       return false
     }
     Toast.show({type:'success',text1:data.message})
     router.back()
   } catch (e) {
     setsubmitloading(false)
     Toast.show({type:'error',text1:e.message})
   }
 }
 

 
  return (
    <ScrollableContainer  style={{gap:4}}>
      <Text style={{alignSelf:'center',fontWeight:'bold',letterSpacing:2,fontSize:16}}>Bank Account Details</Text>
      <TouchableOpacity onPress={()=> setopenaddbankform(true)} style={{backgroundColor:'#22bB22',alignSelf:'flex-end',paddingHorizontal:12,paddingVertical:4,borderRadius:5,marginTop:12}}>
       <Text style={{color:'white',fontWeight:'bold',fontSize:12}}>+ Add more bank account</Text>
      </TouchableOpacity>
      
      {
        openaddbankform &&
        <BoxContainer style={{width:'75%',alignSelf:'center',marginTop:12,gap:8}}>
        <Text style={{textAlign:'center',backgroundColor:'gray',color:'white',fontWeight:'bold',paddingVertical:6}}>Add bank account form </Text>
        
        
         <TextInput onChangeText={(text)=> changehandler('name',text)} placeholderTextColor='gray'  placeholder='Account Holder Name' style={{borderBottomWidth:0.5,paddingHorizontal:12,borderRadius:5,fontSize:14,color:'gray'}} /> 
         <TextInput onChangeText={(text)=> changehandler('bankName',text)} placeholderTextColor='gray'  placeholder='Bank Name' style={{borderBottomWidth:0.5,paddingHorizontal:12,borderRadius:5,fontSize:14,color:'gray'}} /> 
         <TextInput 
         
         onChangeText={(text)=> changehandler('accountNumber',text)}   
         placeholderTextColor='gray'      
         secureTextEntry
          keyboardType="numeric"
         placeholder='Account Number' 
         style={{borderBottomWidth:0.5,paddingHorizontal:12,borderRadius:5,fontSize:14,color:'gray'}} /> 
         <TextInput onChangeText={(text)=> changehandler('conformAccountNumber',text)} keyboardType="numeric" placeholderTextColor='gray'   placeholder='Conform Account Number' style={{borderBottomWidth:0.5,paddingHorizontal:12,borderRadius:5,fontSize:14,color:'gray'}} /> 
         <TextInput onChangeText={(text)=> changehandler('ifscCode',text.toUpperCase())} value={bankdetails.ifscCode}   placeholderTextColor='gray'   placeholder='IFSC CODE' style={{borderBottomWidth:0.5,paddingHorizontal:12,borderRadius:5,fontSize:14,color:'gray',}} /> 
         
         <Text style={{marginTop:12,fontWeight:'bold',}}>Note : <Text style={{fontWeight:'',fontSize:12,color:'red',letterSpacing:1,}}>Your information will be kept strictly confidential and used only for the purpose of transferring the amount. It will not be used for any other purpose. 
            We appreciate your cooperation.
            Thank you. </Text> </Text>
          
         <TouchableOpacity disabled={submitloading} onPress={submithandler}  style={{backgroundColor:'#22bB22',paddingHorizontal:40,paddingVertical:4,borderRadius:5,}}><Text style={{color:'white',textAlign:'center'}}>{submitloading ? <ActivityIndicator size="large" size={18} color="white" /> : "Submit"}</Text></TouchableOpacity>
   
      </BoxContainer>
      }
       
       <View style={{justifyContent:'center',alignItems:'center',marginTop:12}}>
       
         {
           allbankdetailsloadin ?
          <Text>Loading...</Text>
          :
           allbankdetails.length === 0 ?
           <Text style={{fontWeight:'bold',backgroundColor:'#999',padding:12,color:'white',borderTopLeftRadius:12,borderBottomRightRadius:12}}>No Bank Accounts Added</Text>
           :
           allbankdetails?.map((items,index)=>{
             return(
             <BoxContainer key={index} >
              <Text style={{fontWeight:'bold',fontSize:13,color:'#22bB22'}}>Account Holder Name : <Text style={{color:'gray',fontSize:12}}>{items?.name}</Text></Text>
              <Text style={{fontWeight:'bold',fontSize:13,color:'#22bB22'}}>Bank Name : <Text style={{color:'gray',fontSize:12}}>{items?.bankName}</Text></Text>
              <Text style={{fontWeight:'bold',fontSize:13,color:'#22bB22'}}>Account Number : <Text style={{color:'gray',fontSize:12}}>{items?.accountNumber}</Text></Text>
              <Text style={{fontWeight:'bold',fontSize:13,color:'#22bB22'}}>IFSC Code : <Text style={{color:'gray',fontSize:12}}>{items?.ifscCode}</Text></Text>
             </BoxContainer>
             )
           })
         }
       </View>
    </ScrollableContainer>
  );
}

export default Mybankaccount