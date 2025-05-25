import {Tabs} from 'expo-router'
import {Image,Dimensions,StyleSheet,Text,View,useColorScheme} from 'react-native'
import {FontAwesome6,MaterialCommunityIcons,Ionicons,EvilIcons} from '@expo/vector-icons';
import MyTabBar from '../../component/mytabs'
const {width} = Dimensions.get('window');
const TabLayout = ()=>{
  return (
    <>
     <Tabs tabBar={(props)=> <MyTabBar {...props} />} screenOptions={{screenOptions:false}}>
       <Tabs.Screen name="home" 
        options={{
          title:'Home',
          headerShown:false,
          tabBarIcon:({color,size})=>{
            return  <MaterialCommunityIcons name="home-analytics" size={18} color={color} />
          }
        }}
       />
       <Tabs.Screen name="invester"
       options={{
          title:'Invest',
          headerShown:false,
           tabBarIcon:({color})=>{
            return <Ionicons name="analytics-outline" size={18} color={color} />
          }
        }}
       />
       <Tabs.Screen name="team"
       options={{
          title:'Team',
          headerShown:false,
           tabBarIcon:({color,size})=>{
            return <FontAwesome6 name="users-gear" size={16} color={color} />
          }
        }}
       />
       
        <Tabs.Screen name="profile"
       options={{
          title:'Me',
          headerShown:false,
           tabBarIcon:({color,size})=>{
            return <EvilIcons name="user" size={18} color={color} />
          }, 
        }}
       />
     
     </Tabs>
    
     </>
    )
}

const styles = StyleSheet.create({
  icon:{
    width:28,
    height:28
  }
})
export default TabLayout