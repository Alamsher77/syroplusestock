import BoxContainer from './boxcontainer'
import { View, Text, useWindowDimensions, StyleSheet } from 'react-native';
import Currancy from '../currency'
const TeamfundItems = ({item,productname=false})=>{
  const masknumber = (number)=>{
    return `XXXXXX${number.slice(-4)}`
  }
  return (
     <BoxContainer  style={{gap:8,}}>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{fontWeight:'bold',color:'#22bB22'}}>+ {Currancy(item?.transaction_amount)}</Text>
        <Text style={{fontWeight:'bold',color:'gray'}}>{productname ? masknumber(String(item?.phone || 9771575438)) : `${item?.categary || ""} : ${item?.name || ""}`}</Text>
        </View>
        <View style={{flexDirection:'row',gap:12,justifyContent:'flex-end'}}>
           <Text style={styles.date}>Date : {new Date(item?.createdAt).toLocaleDateString()}</Text>
      <Text style={styles.date}>Time : {new Date(item?.createdAt).toLocaleTimeString()}</Text>
        </View>
        </BoxContainer>
    )
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  date:{
    color:'#777',
    fontSize:12
  }
});

export default TeamfundItems