import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {router} from 'expo-router'
import DomainUrl from '../configration/Index'
import Fetchapimethod from '../configration/fetchapimethod'
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user info or token
  const [token,setToken] = useState(null)
  const [userfetchlodding, setuserfetchlodding] = useState(true);
  const [investProduct,setInvestProduct] = useState([])
 const loadUser = async () => {
      try {
         const token = await AsyncStorage.getItem("authToken"); // Or from localStorage in web
        const response = await axios.get(`${DomainUrl.url}api/userfetch`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`
          }
        })
        setuserfetchlodding(false)
        const data = response.data 
        if (data?.success) {
          setUser(data?.getuserdata);
        }
      } catch (e) {
        setuserfetchlodding(false)
        if(e.message == 'Network Error'){
         router.replace('network_error')
        }else if(e.response.status == 500){
          alert('Server Error or Login tocken expire')
        } 
      }
    };
const [productlodding,setproductlodding] = useState(true) 
const laodInvestProduct = async ()=>{
  try {
        setproductlodding(true)
         const data =  await Fetchapimethod({method:'get',url:'investproduct'})
        setproductlodding(false)
        setInvestProduct(data)
      } catch (e) {
        console.log('faild to load invest product ')
      } finally {
      setproductlodding(false);
      }
}
  // Fetch user data from storage on app start
const [alltransactionloading,setalltransactionloading] = useState(false)
const [alltransactiondata,setalltransactiondata] = useState([])
const [alltransactiondataProduct,setalltransactiondataProduct] = useState([])
const loadAllTransaction = async ()=>{
  try {
    setalltransactionloading(true)
  const data = await Fetchapimethod({url:'fetch_all_transaction',method:'get'})
  setalltransactionloading(false)
  setalltransactiondata(data.reverse(-1))
  } catch (e) {
    setalltransactionloading(false)
    console.log('all transaction catch ',e.message)
  }
}
const loadAllTransactionProduct = async ()=>{
  try {
    setalltransactionloading(true)
  const data = await Fetchapimethod({url:'fetch_all_transaction_product',method:'get'})
  setalltransactionloading(false)
  setalltransactiondataProduct(data.reverse(-1))
  } catch (e) {
    setalltransactionloading(false)
    console.log('all transaction catch ',e.message)
  }
}
  useEffect(() => { 
    loadUser();
    laodInvestProduct();
    loadAllTransaction()
    loadAllTransactionProduct()
    fetchBankDetails()
  }, []);

  const login = async (userInfo) => {

    await AsyncStorage.setItem('user', JSON.stringify(userInfo));
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('authToken');
  };
  
  
 const [allbankdetails,setallbankdetails] = useState([])
 const [allbankdetailsloadin,setallbankdetailsloading] = useState(false)
 const fetchBankDetails = async ()=>{
   try {
      setallbankdetailsloading(true)
   const data = await Fetchapimethod({url:'fetch_bank_account_details',method:'get'})
   setallbankdetailsloading(false)
   setallbankdetails(data) 
   } catch (e) {
    console.log(e.message)
   }
   
 }

const contextdata = {
  user, login, logout, userfetchlodding,loadUser,investProduct,setInvestProduct,productlodding,laodInvestProduct,alltransactionloading,loadAllTransaction,alltransactiondata,alltransactiondataProduct,loadAllTransactionProduct,fetchBankDetails,allbankdetails,allbankdetailsloadin
}
  return (
    <AuthContext.Provider value={contextdata}>
      {children}
    </AuthContext.Provider>
  );
};
