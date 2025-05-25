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
const RootLayout = ()=> {
  return (
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
       
      
    </Stack>
    </AuthProvider>
  );
}
export default RootLayout