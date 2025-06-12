import { View, Text, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import {useState,useContext,useEffect} from 'react';
import { useRouter } from 'expo-router';
import ScrollableContainer from '../../component/scrollableitems'
import { AuthContext } from '../../context/AuthContext';
import BoxContainer from '../../component/boxcontainer'
import Colors from '../../Colors/color'
import Currancy from '../../currency'
import { Picker } from '@react-native-picker/picker';  
import Investproductiteam from '../../component/investproductiteam'
import LoadingSimarCard from '../../component/simmer'
export default function Invester() {
  const router = useRouter();
    const [selectedValue, setSelectedValue] = useState('name');
    const {investProduct,productlodding,user} = useContext(AuthContext); 
    
  return (
   <ScrollableContainer style={{gap:3}}>
     <BoxContainer>
      <View style={styles.header}>
          <Text style={styles.title}>Total investment amount</Text>
          <TouchableOpacity onPress={()=>router.push("/invest/transfertowithdraw")} style={styles.button}>
            <Text style={styles.buttonText}>Transfer to Balance</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.amount}>Rs <Text style={styles.amountValue}>{user?.total_investment}</Text></Text>

        <View style={styles.earningsContainer}>
          <View style={styles.earningBlock}>
            <Text style={styles.earningValue}>{Currancy(user?.total_income)}</Text>
            <Text style={styles.earningLabel}>Total Income</Text>
          </View>
          <View style={styles.earningBlock}>
            <Text style={styles.earningValue}>{Currancy(user?.today_income)}</Text>
            <Text style={styles.earningLabel}>Today Earnings</Text>
          </View>
        </View>
     </BoxContainer>
     <BoxContainer style={{flexDirection:'row',gap:4}}>
       <TouchableOpacity onPress={()=>router.push("/invest/viewhistory")} style={styles.transactionhistory}><Text style={styles.transactionhistorytext
       }>View History</Text></TouchableOpacity>
         <TouchableOpacity style={styles.transactionhistory}>
          <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
        style={{ height: 'auto',color:'white', width: '100%' }}
      >
        <Picker.Item label="electronics" value="java" />
        <Picker.Item label="furniture" value="js" />
        <Picker.Item label="cofee" value="python" />
      </Picker>
         </TouchableOpacity>
     </BoxContainer>
     <View style={{gap:3}}>
     {
      productlodding ?
      <>
      <LoadingSimarCard />
      <LoadingSimarCard />
      <LoadingSimarCard />
      </>
      :
      investProduct?.length == 0 ?
      <Text>no product</Text>
      :
      investProduct?.map((item,index)=>{
        return(
         <Investproductiteam key={index} item={item} />
        )
      })
     }
    
     </View>
   </ScrollableContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  button: {
    backgroundColor: Colors.mainColor,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  amount: {
    marginTop: 20,
    fontSize: 18,
    color: '#444',
  },
  amountValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.mainColor,
  },
  earningsContainer: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-around',
  },
  earningBlock: {
    alignItems: 'center',
  },
  earningValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.mainColor,
  },
  earningLabel: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  transactionhistory:{
    paddingHorizontal:12,
    backgroundColor: Colors.mainColor,
    width:'48%',
    borderRadius:4,
    justifyContent:'center',
    alignItems:'center',
  },
  transactionhistorytext:{
    color:'white',
    fontSize:16,
  },
  
});
