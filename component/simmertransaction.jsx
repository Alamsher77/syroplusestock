import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import BoxContainer from './boxcontainer'
const Simmertransaction = ()=>{
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);
  return (
     <BoxContainer style={{gap:20}}>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <Animated.View style={[styles.header,{opacity}]} />
      <Animated.View  style={[styles.header,{opacity,width:'60%',backgroundColor:'#ccc'}]} />
      </View>
     <View style={{flexDirection:'row',justifyContent:'flex-end',gap:12}}>
      <Animated.View style={[styles.header,{opacity,width:'40%',backgroundColor:'#ccc',}]} />
      <Animated.View  style={[styles.header,{opacity,backgroundColor:'#ccc',width:'40%'}]} />
      </View>
     </BoxContainer>
    )
}

const styles = StyleSheet.create({
  item:{
    width:'6'
  },
  header:{
    width:'30%',
    height:12,
    backgroundColor:'gray',
    borderRadius:12
  }
})

export default Simmertransaction 