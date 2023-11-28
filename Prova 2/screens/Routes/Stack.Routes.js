import { createStackNavigator } from '@react-navigation/stack'
import Clientes from '../Clientes/Clientes'
import FormClientes from '../Clientes/FormClientes'

const Stack = createStackNavigator()

export default function StackRoutes() {
    return (

        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Formulario'>
            <Stack.Screen name="Clientes" component={Clientes}/>
            <Stack.Screen name="FormClientes" component={FormClientes}/>
            <Stack.Screen name="Equipamentos" component={Equipamentos}/>
            <Stack.Screen name="FormEquipamentos" component={FormEquipamentos}/>
            <Stack.Screen name="Fornecedores" component={Fornecedores}/>
            <Stack.Screen name="FormFornecedores" component={FormFornecedores}/>
            <Stack.Screen name="Instrutores" component={Instrutores}/>
            <Stack.Screen name="FormInstrutores" component={FormInstrutores}/>
            <Stack.Screen name="Planos" component={Planos}/>
            <Stack.Screen name="FormPlanos" component={FormPlanos}/> 
        </Stack.Navigator>

    )
}