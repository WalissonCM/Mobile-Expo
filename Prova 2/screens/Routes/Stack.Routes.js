import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Clientes from '../Clientes/Clientes';
import FormClientes from '../Clientes/FormClientes';

const Stack = createNativeStackNavigator();
export default function StackRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="clientes" component={Clientes} />
      <Stack.Screen name="form-clientes" component={FormClientes} />
    </Stack.Navigator>
    
  )
}
