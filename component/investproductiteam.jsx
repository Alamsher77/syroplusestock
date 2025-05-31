import { View, Text, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import BoxContainer from './boxcontainer'
import { ProgressBar } from 'react-native-paper';
import { useRouter } from 'expo-router';
const Investproductiteam = ({item,sample})=>{
  const router = useRouter()
 const randomNumber = Math.floor(Math.random() * (100 - 10 + 1)) + 10; 
  return (
    <BoxContainer >
   <TouchableOpacity onPress={()=>router.push(`/product/${item?._id}`)}>
    <Text style={[styles.title,{fontSize:sample ? 12 : 16 }]}>{item?.categary}: <Text style={styles.agent}>{item?.name}</Text></Text>
      
      <View style={{flexDirection:"row",gap: sample ? 4 : 8}}>
      {/* Yellow Placeholder Box instead of image */}
      <View style={[styles.placeholderBox,{width: sample ? 50:80,height: sample ? 50 :80,}]}>
        <Text style={[styles.placeholderText,{fontSize:sample ? 18 : 24}]}>{item?.name}</Text>
      </View>
 
      {/* Info Section */}
      <View>
      <View style={[styles.infoRow,{marginBottom:sample ? 1 : 6}]}>
        <Text style={[styles.label,{fontSize: sample ? 8 : 14}]}>Product price</Text>
        <Text style={[styles.value,{fontSize: sample ? 8 : 14}]}>{item?.price} Rs</Text>
      </View>
      <View style={[styles.infoRow,{marginBottom:sample ? 1 : 6}]}>
        <Text style={[styles.label,{fontSize: sample ? 8 : 14}]}>Daily income</Text>
        <Text style={[styles.value,{fontSize: sample ? 8 : 14}]}>{item?.dailyincome} Rs</Text>
      </View>
      <View style={[styles.infoRow,{marginBottom:sample ? 1 : 6}]}>
        <Text style={[styles.label,{fontSize: sample ? 8 : 14}]}>Income period</Text>
        <Text style={[styles.value,{fontSize: sample ? 8 : 14}]}>{item?.incomeperiod} Day</Text>
      </View>
      </View>
      {/* Progress Bar */}
    
      </View>
        <View style={{marginTop: sample ? 1 : 6,position:'relative'}}>
        <ProgressBar progress={randomNumber / 100} color="#4CAF50" style={{height: sample ? 2 : 6 ,borderRadius: 4}} />
        <Text style={[styles.progressText,{fontSize: sample ? 6 : 12 ,position: sample ? 'absolute' :'relative',top: sample ? -15 : 0}]}>{randomNumber}%</Text>
      </View>
     </TouchableOpacity>
    </BoxContainer>
    )
}

const styles = StyleSheet.create({
   title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  agent: {
    color: '#000',
  },
  placeholderBox: {
    backgroundColor: '#FFD700',
    width: 80,
    height: 80,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  placeholderText: { 
    fontWeight: 'bold',
    color: '#fff',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    width:"83%"
  },
  label: {
    color: '#888',
    fontSize: 14,
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  progressText: {
    textAlign: 'right',
    marginTop: 4,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
})

export default Investproductiteam