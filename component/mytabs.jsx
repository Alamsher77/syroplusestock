import { Animated, View,StyleSheet, TouchableOpacity, Platform,Dimensions } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import {EvilIcons,FontAwesome6,FontAwesome5,Ionicons,MaterialCommunityIcons} from '@expo/vector-icons';
const {width} = Dimensions.get('window')
function MyTabBar({ state, descriptors, navigation, position }) {
  const { colors } = useTheme(); 
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        // const opacity = position.interpolate({
        //   inputRange,
        //   outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
        // });
 
        let tabicon 
        const iconcolor = isFocused ? '#333333' :'#003366'
        const iconsize = isFocused ? 30 : 20
        switch (route.name) {
          case 'home':
           tabicon = <MaterialCommunityIcons name="home-analytics" size={iconsize} color={iconcolor} />
            break;
          case 'invester':
           tabicon = <Ionicons name="analytics-sharp" size={iconsize} color={iconcolor} />
            break;
          
          case 'team':
           tabicon = <FontAwesome6 name="users-gear" size={iconsize} color={iconcolor} />
            break;
          case 'profile':
           tabicon = <FontAwesome5 name="user-alt" size={iconsize} color={iconcolor} />
            break;
          
          default:
            // code
        }
        return (
          <TouchableOpacity
            key={index}
            accessibilityRole={Platform.OS === 'web' ? 'link' : 'button'}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.tabBarIteam,]}
          >
          {tabicon}
          {
        /*  isFocused ?  <Animated.Text style={{color: 'white' }}>
              {label}
            </Animated.Text> : null
            */
          }
          
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer:{
    position:"absolute",
    flexDirection:'row',
    width: '86%',
    backgroundColor:'#FFD700',
    shadowWith:0,
    alignSelf:"center",  
    bottom:25,
    borderRadius:8,    
    paddingVertical:8
  },
  tabBarIteam:{ 
    flex:1,  
    justifyContent:'center',
    alignItems:'center',   
  }
})
 export default MyTabBar