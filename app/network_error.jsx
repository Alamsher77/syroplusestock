import {View,Text,Image} from 'react-native'
const NetworkError = ()=>{
  return (
     <View style={{justifyContent:'center',flex:1,alignItems:'center',paddingHorizontal:60,backgroundColor:'white'}}>
     <Image source={require('../assets/images/networkerror.jpeg')} />
      <Text style={{color:'red',textAlign:'center'}}>Please Cheque Your Internet Connection or Restart the app</Text>
     </View>
    )
}

export default NetworkError