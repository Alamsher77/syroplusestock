import {useState,useContext} from 'react';
import { View, Text, useWindowDimensions, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ScrollableContainer from '../../component/scrollableitems'
import Colors from '../../Colors/color'
import { AuthContext } from '../../context/AuthContext';
import BoxContainer from '../../component/boxcontainer'
import TeamfundItems from '../../component/teamfund'
import Simmertransaction from '../../component/simmertransaction'


const Teamfund = ()=> {
  const {alltransactionloading,alltransactiondata,alltransactiondataProduct} = useContext(AuthContext);
  
  const Product = () => {
  
  const productFilter = alltransactiondata

  return(
 <ScrollableContainer  style={{gap:8}}>
    {
      alltransactionloading ?
      <>
     <Simmertransaction />
     <Simmertransaction />
     <Simmertransaction />
     </>
      :
      productFilter.length === 0 ?
      <Text>No records</Text>
      :
      productFilter?.map((item,index)=>{
        return(
        <TeamfundItems  key={index} item={item} />
        )
      })
    }
 </ScrollableContainer>
);
}
  const Team = () => {
   const productFilter = alltransactiondataProduct

  return(
 <ScrollableContainer style={{gap:8}}>
    {
      alltransactionloading ?
      <>
     <Simmertransaction />
     <Simmertransaction />
     <Simmertransaction />
     </>
      :
      productFilter.length === 0 ?
      <Text>No records</Text>
      :
      productFilter?.map((item,index)=>{
        return(
       <TeamfundItems productname={true} key={index} item={item} />
        )
      })
    }
 </ScrollableContainer>
);
};

  const Rewords = () => {
    const productFilter = alltransactiondata.filter((item) => item?.transaction_type == "rewords")

  return(
 <ScrollableContainer style={{gap:8}}>
    {
      alltransactionloading ?
      <>
     <Simmertransaction />
     <Simmertransaction />
     <Simmertransaction />
     </>
      :
      productFilter.length === 0 ?
      <Text>No records</Text>
      :
      productFilter?.map((item,index)=>{
        return(
       <TeamfundItems key={index} item={item} />
        )
      })
    }
 </ScrollableContainer>
);
};
  
  
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'Product', title: 'Product' },
    { key: 'Team', title: 'Team' },
    { key: 'Rewords', title: 'Rewords' },
  ]);
  
  const renderScene = SceneMap({
    Product,
    Team,
    Rewords 
  });




  return (
    <SafeAreaView style={{flex: 1,
    backgroundColor: '#f2f2f2',}}>
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex} 
      initialLayout={{ width: layout.width }}
      renderTabBar={props => (
        <TabBar
          {...props}
           activeColor="blue"
          inactiveColor="gray" 
          indicatorStyle={{ backgroundColor: 'blue' }}
          style={{ backgroundColor:Colors.flipkart,color:'red' }}
        />
      )}
    />
    </SafeAreaView>
  );
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
  
});



export default Teamfund