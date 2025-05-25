import { View, Text, TouchableOpacity, StyleSheet, ScrollView,StatusBar,RefreshControl} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useCallback,useState,useEffect,useContext} from 'react'
//import { StatusBar } from 'expo-status-bar';
import { AuthContext } from '../context/AuthContext';
const ScrollableContainer = ({children,style,refreshhandler})=>{
  const [refreshing,setRefreshing] = useState(false)
   const {laodInvestProduct,loadUser,loadAllTransaction,loadAllTransactionProduct} = useContext(AuthContext);
  const onRefresh = useCallback(()=>{
     setRefreshing(true)
     setTimeout(()=>{
       setRefreshing(false)
      laodInvestProduct()
      loadUser()
      loadAllTransaction() 
      loadAllTransactionProduct()
      if(refreshhandler){
        refreshhandler()
      }
     },2000)
   },[])
  return(
    <SafeAreaView style={{flex: 1,
    backgroundColor: '#f2f2f2',}}>
      <ScrollView 
      refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        }
      contentContainerStyle={[styles.scrollContent,style]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
   
        {children}
      </ScrollView>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
 scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 12,
    paddingBottom: 80,
  }, 
});
export default ScrollableContainer