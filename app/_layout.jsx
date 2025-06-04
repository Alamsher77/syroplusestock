import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
 
import Toast from 'react-native-toast-message';
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

import {
  PanGestureHandler,
  GestureHandlerRootView
} from 'react-native-gesture-handler';
const RootLayout = ()=> {
  return (
    <GestureHandlerRootView>
    <AuthProvider> 
     <StatusBar barStyle="dark-content" backgroundColor="red" />
    <Stack screenOptions={{headerShown:false}}>
       <Stack.Screen name="index" options={{ title: 'Main' }} />
      <Stack.Screen name="signup" options={{ title: 'Signup' }} />
      <Stack.Screen name="(tabs)" options={{ title: 'tabs' }} />
      <Stack.Screen name="network_error" options={{ title: 'Network Error' }} />
      <Stack.Screen name="product/[id]" options={{ title: 'product' }} />
      {/* invest page  route  */}
      <Stack.Screen name="invest/viewhistory" options={{ title: 'viewhistory' }} />
      <Stack.Screen name="invest/transfertowithdraw" options={{ title: 'transfertowithdraw' }} />
        {/* profile  page route  */}
      <Stack.Screen name="profile/teamfund" options={{ title: 'teamfund' }} />
      <Stack.Screen name="profile/mybankaccount" options={{ title: 'mybankaccount' }} />
      <Stack.Screen name="profile/withdrawalpassword" options={{ title: 'withdrawalpassword' }} />
      <Stack.Screen name="profile/loginpassword" options={{ title: 'loginpassword' }} />
      <Stack.Screen name="profile/withdrawalrecord" options={{ title: 'withdrawalrecord' }} />
      <Stack.Screen name="profile/fundingdetails" options={{ title: 'fundingdetails' }} />
      <Stack.Screen name="profile/customerservice" options={{ title: 'customerservice' }} />
        {/* home page route  */}
      <Stack.Screen name="home/recharge" options={{ title: 'recharge' }} />
      <Stack.Screen name="home/payment" options={{ title: 'payment' }} />
      <Stack.Screen name="home/withdrawal" options={{ title: 'withdrawal' }} />
      <Stack.Screen name="home/rechargehistory" options={{ title: 'rehargehistory' }} />
      <Stack.Screen name="home/withdrawalhistory" options={{ title: 'withdrawalhistory' }} />
       
      
    </Stack>
     <Toast /> 
    </AuthProvider>
    </GestureHandlerRootView>
  );
}
export default RootLayout