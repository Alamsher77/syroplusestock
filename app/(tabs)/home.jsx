import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView,StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import ScrollableContainer from '../../component/scrollableitems'
export default function Home() {
  const router = useRouter();
  return (
   <ScrollableContainer> 
      {/* Fast Banner Section */}
      <View style={styles.bannerSection}>
        <Text style={styles.bannerText}>🔥 Fast Transactions | Safe & Secure 🔒</Text>
      </View>

      {/* Recharge & Withdrawal Section */}
      <View style={styles.rechargeWithdrawSection}>
        <TouchableOpacity style={styles.rechargeButton}>
          <Text style={styles.buttonText}>Recharge</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.withdrawButton}>
          <Text style={styles.buttonText}>Withdraw</Text>
        </TouchableOpacity>
      </View>

      {/* Service Section */}
      <View style={styles.serviceSection}>
        <Text style={styles.serviceTitle}>Our Services</Text>
        <View style={styles.serviceItem}>
          <Text style={styles.serviceText}>📲 Mobile Recharge</Text>
        </View>
        <View style={styles.serviceItem}>
          <Text style={styles.serviceText}>🏦 Bank Withdrawals</Text>
        </View>
        <View style={styles.serviceItem}>
          <Text style={styles.serviceText}>🧾 Bill Payments</Text>
        </View>
      </View> 
    </ScrollableContainer>
  );
}

const styles = StyleSheet.create({ 
  bannerSection: {
    backgroundColor: '#ffe600',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rechargeWithdrawSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  rechargeButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  withdrawButton: {
    backgroundColor: '#f44336',
    padding: 16,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  serviceSection: {
    backgroundColor: '#6a1b9a',
    padding: 20,
    borderRadius: 10,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  serviceItem: {
    marginBottom: 10,
  },
  serviceText: {
    color: '#fff',
    fontSize: 16,
  },
});