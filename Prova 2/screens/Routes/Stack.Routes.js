import { createStackNavigator } from '@react-navigation/stack'
import Clientes from '../Clientes/Clientes'
import FormClientes from '../Clientes/FormClientes'
import Equipamentos from '../Equipamentos/Equipamentos'
import FormEquipamentos from '../Equipamentos/FormEquipamentos'
import Fornecedores from '../Fornecedores/Fornecedores'
import FormFornecedores from '../Fornecedores/FormFornecedores'
import Instrutores from '../Instrutores/Instrutores'
import FormInstrutores from '../Instrutores/FormInstrutores'
import Planos from '../Planos/Planos'
import FormPlanos from '../Planos/FormPlanos'

const Stack = createStackNavigator()

export default function StackRoutes() {
    return (

        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Formulario'>
            <Stack.Screen name="clientes" component={Clientes}/>
            <Stack.Screen name="form-clientes" component={FormClientes}/>
            <Stack.Screen name="equipamentos" component={Equipamentos}/>
            <Stack.Screen name="form-equipamentos" component={FormEquipamentos}/>
            <Stack.Screen name="fornecedores" component={Fornecedores}/>
            <Stack.Screen name="form-fornecedores" component={FormFornecedores}/>
            <Stack.Screen name="instrutores" component={Instrutores}/>
            <Stack.Screen name="form-instrutores" component={FormInstrutores}/>
            <Stack.Screen name="planos" component={Planos}/>
            <Stack.Screen name="form-planos" component={FormPlanos}/> 
        </Stack.Navigator>

    )
}