import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated'; 
import { View, Text, Dimensions, StyleSheet,ScrollView,Image } from 'react-native';
const { width } = Dimensions.get('window');
const Carousalitems = ({x,index,item,size=60})=> {
  const style = useAnimatedStyle(()=> {
    const translateX = interpolate(x.value,
      [(index -2) * size, (index -1) * size, index * size],
      [width * index,10,index]
    );
    return {
      transform: [{
        translateX
      }]
    }
  })


  return (
    <Animated.View   style={[styles.card, style]}>
       <Image source={ { uri: item?.bannerimage?.img }} style={styles.image} />
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  container: { 
    flexDirection: 'row',
    height:160,
    justifyContent:"center", 
  },
  card: {
    width, 
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center', 
  },
  image: {
     width:'100%',
     height:'100%',  
  },
});
export default Carousalitems