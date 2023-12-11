import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import FormEquipamentos from './FormEquipamentos';
import Equipamentos from './Equipamentos';


const Stack = createNativeStackNavigator();
export default function StackEquipamentos() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="equipamentos" component={Equipamentos} />
      <Stack.Screen name="form-equipamentos" component={FormEquipamentos} />
    </Stack.Navigator>
    
  )
}
