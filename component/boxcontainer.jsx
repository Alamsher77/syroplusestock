import { View, Text, TouchableOpacity, StyleSheet, ScrollView,StatusBar } from 'react-native';

const BoxContainer = ({children,style})=>{
  return (
     <View style={[styles.container,style]}>{children}</View>
    )
}

const styles = StyleSheet.create({
  container:{ 
    borderRadius:5,
    elevation:5,
    shadowColor:'rgba(0,0,0,0.3)', 
    backgroundColor:'#fff',
    padding:10,
  }
})
export default BoxContainer