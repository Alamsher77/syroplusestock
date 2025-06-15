import { View, Text, StyleSheet, Image, TurboModuleRegistry } from 'react-native'
import Colors from '../Colors/color';
import Animated,{useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import { useEffect } from 'react';

export default function SplashCustomeScreen() {

  // Animation logic can be added here if needed
  const scale = useSharedValue(3) // Set initial scale to 0.5 if true, otherwise 1
  const opacity = useSharedValue(0) // Set initial opacity to 0 if true, otherwise 1

  useEffect(() => {
   
      opacity.value = withTiming(1, {
        duration: 1000,
      })
      scale.value = withTiming(1, {
        duration: 1000,
      }); 
  }, []);



  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });
  return (
    <Animated.View style={styles.container}>
       <Animated.Image style={[styles.image, animatedStyle]} source={require('../assets/images/04.png') } />
      <Text style={styles.text}>splash_screen</Text>
       
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.flipkart,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: Colors.flipkart,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain', 
  },
})