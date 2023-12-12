import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import FormProdutos from './FormProdutos';
import Produtos from './Produtos';

const Stack = createNativeStackNavigator();
export default function StackProdutos() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="produtos" component={Produtos} />
      <Stack.Screen name="form-produtos" component={FormProdutos} />
    </Stack.Navigator>
    
  )
}
