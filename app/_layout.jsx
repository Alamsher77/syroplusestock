import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
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
     <StatusBar barStyle="dark-content" backgroundColor="green" />
    <Stack screenOptions={{headerShown:false}}>
       <Stack.Screen name="index" options={{ title: 'Main' }} />
      <Stack.Screen name="signup" options={{ title: 'Signup' }} />
      <Stack.Screen name="(tabs)" options={{ title: 'tabs' }} />
      <Stack.Screen name="product/[id]" options={{ title: 'product' }} />
      <Stack.Screen name="invest/viewhistory" options={{ title: 'viewhistory' }} />
      <Stack.Screen name="invest/transfertowithdraw" options={{ title: 'transfertowithdraw' }} />
      <Stack.Screen name="profile/teamfund" options={{ title: 'teamfund' }} />
      <Stack.Screen name="home/recharge" options={{ title: 'recharge' }} />
      <Stack.Screen name="home/payment" options={{ title: 'payment' }} />
      <Stack.Screen name="home/withdrawal" options={{ title: 'withdrawal' }} />
      <Stack.Screen name="home/rechargehistory" options={{ title: 'rehargehistory' }} />
       
      
    </Stack>
    </AuthProvider>
    </GestureHandlerRootView>
  );
}
export default RootLayout