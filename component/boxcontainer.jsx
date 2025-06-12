import { View, Text, TouchableOpacity, StyleSheet, ScrollView,StatusBar } from 'react-native';
import Colors from '../Colors/color'
const BoxContainer = ({children,style})=>{
  return (
     <View style={[styles.container,style]}>{children}</View>
    )
}

const styles = StyleSheet.create({
  container:{ 
    borderRadius:5,
    elevation:5,
    shadowColor:Colors.mainColor, 
    backgroundColor:"#fff",
    padding:10,
  }
})
export default BoxContainer