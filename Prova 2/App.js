import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import StackProdutos from './screens/Produtos/StackProdutos';


export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <StackProdutos/>
      </NavigationContainer>
      <Toast />
    </PaperProvider>
  );
}