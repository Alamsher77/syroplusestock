
import React, { useState,useLayoutEffect } from 'react';
import { View, Text, Dimensions, StyleSheet,ScrollView,Image } from 'react-native';
const { width } = Dimensions.get('window');
const size = width * 0.7
import Carousalitems from './carousalitems'
export default function Swipablebanner({bannerdata}) {

  return (
    <ScrollView horizontal
    showsHorizontalScrollIndicator={false} 
    bounces={false}
    scrollEventThrottle={16}
    snapToInterval={width}
    decelerationRate={'fast'}
    > 
        {
        bannerdata &&
        bannerdata.map((item, i) => { 

        return(
          <View key={i} style={styles.container}>
             <Image style={{width:'100%',height:'100%'}} resizeMode="contain" source={{uri:item?.bannerimage?.img}}/>
          </View>
        )
        })
        }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexDirection: 'row',
    height:160,
    width,
    justifyContent:"center"
  },
});
