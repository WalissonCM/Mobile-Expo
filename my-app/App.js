import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { View } from 'react-native';
import Tarefas from './Components/React/Tarefas';


export default function App() {
  return (
      
      <View>
         <Tarefas/>
      </View>
      
  );
}
