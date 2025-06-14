import React,{useState,useEffect,useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StatusBar
} from 'react-native';
import { useRouter,Redirect } from 'expo-router';
import { AuthContext } from '../context/AuthContext'; 
import Colors from '../Colors/color'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Entypo} from '@expo/vector-icons/';
import DomainUrl from '../configration/Index'
import Toast from 'react-native-toast-message'
export default function App() { 
  const router = useRouter()
  
  const [showpassword, setshowpassword] = useState(true);
  const [loading, setLoading] = useState(false);
 const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  
const { login,user,logout,loadUser,userfetchlodding } = useContext(AuthContext);
  
console.log(user);

  if(userfetchlodding){
    return(
    <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:Colors.mainColor}}>
    
    <ActivityIndicator size="large" color="#fff" />
    </View>
    ) 
  }
  if(user){
    return <Redirect href="/home" />
  }
  
  const handleLogin = async () => {
    // Normally you would send a request to your backend here
  try { 
        setLoading(true)
      const response = await axios.post(`${DomainUrl.url}api/userlogin`, {
      phone,
      password,
      });
      setLoading(false)
      const data = response.data
      
      if(!data?.success){
      Toast.show({type:'error',text1:data?.message})
        return false
      }
    Toast.show({type:'success',text1:data?.message})  
    await AsyncStorage.setItem('authToken', JSON.stringify(data?.token));
    loadUser() 
  } catch (e) {
    setLoading(false)
    Toast.show({text1:e.message,type:'error'})
  }
  };
  
  
  return (
    <SafeAreaView style={styles.container}>
    
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}  contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          {/* Logo */}
          <Image
            source={require('../assets/images/03.jpg')} // Replace with your own logo
            style={styles.logo}
          />

        
          {/* Phone Number Input */}
          <TextInput
            style={styles.inputs}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            placeholderTextColor="#fff"
            onChangeText={setPhone}
            selectionColor="#555"
          />

          {/* Password Input */}
          <View style={styles.inputcontainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Password"
            secureTextEntry={showpassword}
            onChangeText={setPassword}
            placeholderTextColor="#fff"
            selectionColor="#555"
          />
          <TouchableOpacity onPress={()=>setshowpassword(!showpassword)} style={styles.eyecontainer}><Entypo name={showpassword ? "eye-with-line":"eye"} size={24} color="#fff" /></TouchableOpacity>
          </View>
          {/* Login Button */}
          <TouchableOpacity disabled={loading} onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginText}>{loading ?  <ActivityIndicator size="large" size={18} color="white" /> : "Login"}</Text>
          </TouchableOpacity>

          {/* Footer Links */}
          <View style={styles.footerLinks}>
            <TouchableOpacity>
              <Text style={styles.link}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> router.navigate('/signup') }>
              <Text style={styles.link}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Purple background
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 150, 
    height:150,
    marginBottom: 20,
    resizeMode:'contain',
    borderRadius:20,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 30,
    fontWeight: 'bold',
  },
  inputcontainer:{
    width:"100%",
    position:"relative"
  },
  eyecontainer:{
    position:"absolute",
    width:30,
    height:30,
    top:"40%",
    right:0,
    transform:"translate(-20% -50%)",
    justifyContent:"center",
    alignItems:"center"
  },
  inputs: {
    width: '100%',
    backgroundColor: Colors.mainColor,
    color:"#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
    selectionColor:"#fff"
  },
  loginButton: {
    width: '100%',
    backgroundColor: Colors.mainColor,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerLinks: {
    marginTop: 25,
    alignItems: 'center',
  },
  link: {
    color: Colors.mainColor,
    fontSize: 14,
    marginVertical: 5,
    textDecorationLine: 'underline',
  },
});
