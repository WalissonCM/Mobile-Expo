import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Clientes from './Clientes';
import FormClientes from './FormClientes';

const Stack = createNativeStackNavigator();
export default function StackClientes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="clientes" component={Clientes} />
      <Stack.Screen name="form-clientes" component={FormClientes} />
    </Stack.Navigator>
    
  )
}
