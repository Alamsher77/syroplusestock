import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React,{useState,useEffect,useContext} from 'react';
import { useRouter } from 'expo-router';
import Colors from '../Colors/color'
import {Entypo} from '@expo/vector-icons/';
import Fetchapimethod from '../configration/fetchapimethod'
export default function Signup() {
  const [showpassword, setshowpassword] = useState(true);
  const [userData,setUserData] = useState({
    name:'',
    phone:'',
    password:'',
    confirmPassword:'',
    otp:'',
    whoinvitecode:'',
  })
  const router = useRouter();
  
  const [signuploading,setsignuploading] = useState(false)
  const signuphandler = async ()=>{
    try {
      setsignuploading(true)
    const data = await Fetchapimethod({route:'authe/alluser',data:userData,method:'post'})
    setsignuploading(false)
     if(!data?.success){
       Alert.alert('Error',data.message)
       return false
     }
     Alert.alert('success',data?.message)
    } catch (e) {
      setsignuploading(false)
      Alert.alert('error',e.message)
    }
   
  }
  return (
   <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
            <Image
            source={require('../assets/images/flipcart.png')} // Replace with your own logo
            style={styles.logo}
          />

          <TextInput value={userData?.name}  onChangeText={(text)=>setUserData({...userData,name:text})}   style={styles.input} placeholder="Name" placeholderTextColor="#ccc" />
          
          <TextInput
          onChangeText={(text)=>setUserData({...userData,phone:text})}
            style={styles.input}
            value={userData?.phone}
            placeholder="Mobile Number"
            keyboardType="phone-pad"
            placeholderTextColor="#ccc"
          />
          <TextInput
          onChangeText={(text)=>setUserData({...userData,password:text})}
            style={styles.input}
            value={userData.password}
            placeholder="Password"
            secureTextEntry
            placeholderTextColor="#ccc"
          />
          <View style={styles.inputcontainer}>
          <TextInput
          onChangeText={(text)=>setUserData({...userData,confirmPassword:text})}
            style={styles.input}
            value={userData?.confirmPassword}
            placeholder="Conform password"
            secureTextEntry={showpassword} 
            placeholderTextColor="#ccc"
          />
          <TouchableOpacity onPress={()=>setshowpassword(!showpassword)} style={styles.eyecontainer}><Entypo name={showpassword ? "eye-with-line":"eye"} size={24} color="black" /></TouchableOpacity>
          </View>
          <TextInput
          value={userData?.otp}
          onChangeText={(text)=>setUserData({...userData,otp:text})}
            style={styles.input}
            placeholder="OTP"
            keyboardType="numeric"
            placeholderTextColor="#ccc"
          />
          <TextInput
          value={userData?.whoinvitecode}
            onChangeText={(text)=>setUserData({...userData,whoinvitecode:text})}
            style={styles.input}
            placeholder="Invite Code (optional)"
            placeholderTextColor="#ccc"
          />

          <TouchableOpacity disabled={signuploading} onPress={signuphandler} style={styles.createButton}>
            <Text style={styles.buttonText}>{signuploading ?  <ActivityIndicator size="large" size={18} color="white" /> : "Create Account"}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router?.replace('/')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.flipkart,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
    alignSelf:'center',
    borderRadius:20,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
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
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  createButton: {
    backgroundColor: '#0041C2',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: '#0041C2',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});