import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import BoxContainer from './boxcontainer'
const SimarCard = () => {
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

  const ShimmerBlock = ({ style }) => (
    <Animated.View style={[styles.shimmer, style, { opacity }]} />
  );

  return (
    <BoxContainer style={{width:'100%'}}>
      <ShimmerBlock style={[styles.title,{alignSelf:'center'}]} />
      <ShimmerBlock style={styles.text} />
      <ShimmerBlock style={styles.text} />
      <ShimmerBlock style={styles.text} />
      <ShimmerBlock style={styles.text} />
      <ShimmerBlock style={styles.text} /> 
      <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
      <ShimmerBlock style={[styles.text, { width: '40%',height:15}]} />
      </View>
      <View style={styles.row}>
        <ShimmerBlock style={[styles.text, { width: '50%' }]} />
        <ShimmerBlock style={[styles.text, { width: '40%' }]} />
      </View>
    </BoxContainer>
  );
};

const styles = StyleSheet.create({ 
  shimmer: {
    backgroundColor: '#ccc',
    borderRadius: 6,
    marginVertical: 6,
  },
  title: {
    height: 15,
    width: '60%',
    marginBottom: 12,
  },
  text: {
    height: 8,
    width: '60%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
});

export default SimarCard;
