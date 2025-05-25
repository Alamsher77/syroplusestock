import { View, Text, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import BoxContainer from './boxcontainer'
import { ProgressBar } from 'react-native-paper';
import { useRouter } from 'expo-router';
const Investproductiteam = ({item})=>{
  const router = useRouter()
 const randomNumber = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
  return (
    <BoxContainer >
   <TouchableOpacity onPress={()=>router.push(`/product/${item?._id}`)}>
    <Text style={styles.title}>{item?.categary}: <Text style={styles.agent}>{item?.name}</Text></Text>
      
      <View style={{flexDirection:"row",gap:8 }}>
      {/* Yellow Placeholder Box instead of image */}
      <View style={styles.placeholderBox}>
        <Text style={styles.placeholderText}>{item?.name}</Text>
      </View>
 
      {/* Info Section */}
      <View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Product price</Text>
        <Text style={styles.value}>{item?.price} Rs</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Daily income</Text>
        <Text style={styles.value}>{item?.dailyincome} Rs</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Income period</Text>
        <Text style={styles.value}>{item?.incomeperiod} Day</Text>
      </View>
      </View>
      {/* Progress Bar */}
    
      </View>
        <View style={styles.progressContainer}>
        <ProgressBar progress={randomNumber / 100} color="#4CAF50" style={styles.progressBar} />
        <Text style={styles.progressText}>{randomNumber}%</Text>
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
    fontSize: 24,
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
  progressContainer: {
    marginTop: 6,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
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