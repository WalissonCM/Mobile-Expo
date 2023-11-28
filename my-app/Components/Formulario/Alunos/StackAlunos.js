import { createStackNavigator } from '@react-navigation/stack'
import ListAlunos from './ListAlunos'
import FormAlunos from './FormAlunos'


const Stack = createStackNavigator()

export default function StackAlunos() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Lista de Alunos'>
    <Stack.Screen name='Lista de Alunos' component={ListAlunos} />
    <Stack.Screen name='Formulário de Alunos' component={FormAlunos} />
    </Stack.Navigator>
  )
}
