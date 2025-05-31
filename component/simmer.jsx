import React, { useEffect, useRef } from 'react';
import {View, StyleSheet, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const LoadingSimarCard = () => {
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
    <Animated.View style={styles.card}>
      <Animated.View style={[styles.row,{opacity}]}>
        <Animated.View style={styles.box} />
        <Animated.View style={styles.details}>
          {[...Array(3)].map((_, i) => (
            <Animated.View key={i} style={styles.textLine} />
          ))}
        </Animated.View>
      </Animated.View>
      <Animated.View style={[styles.percentLine,{opacity}]} />
      <Animated.View style={[styles.progressBar,{opacity }]}>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  box: {
    backgroundColor: '#ccc',
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  details: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'space-around',
  },
  textLine: {
    backgroundColor: '#ddd',
    height: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  percentLine: {
    width: 40,
    height: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#eee',
    borderRadius: 5,
    overflow: 'hidden',
  },
  shimmerOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  gradient: {
    width: 100,
    height: '100%',
  },
});

export default LoadingSimarCard;
