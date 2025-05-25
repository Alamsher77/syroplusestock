import DomainUrl from '../configration/Index'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Fetchapimethod = async ({data,method,url,...api})=>{
    const token = await AsyncStorage.getItem("authToken"); // Or from localStorage in web
    if(method == 'get'){
      const response = await axios.get(`${DomainUrl.url}api/${url}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`
          }
        })
        return response.data
    }else if(method == 'post'){
     const response = await axios.post(`${DomainUrl.url}${api.route ? api.route : 'api'}/${url ? url : ''}`, {
      ...data
      },{
        headers: {
            Authorization: `Bearer ${JSON.parse(token)}`
          }
      });
      return response.data
    }else{
       console.log('your provided method not exist')
    }
    
}
export default Fetchapimethod