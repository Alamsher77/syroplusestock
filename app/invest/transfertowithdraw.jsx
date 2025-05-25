

import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import ScrollableContainer from '../../component/scrollableitems'
const  TransferToWithdrawal = ()=> {
  const router = useRouter();
  return (
    <ScrollableContainer>
      <Text>transfer to withdrawal</Text>
      <Button title="Back" onPress={() => router.back()} />
    </ScrollableContainer>
  );
}

export default TransferToWithdrawal