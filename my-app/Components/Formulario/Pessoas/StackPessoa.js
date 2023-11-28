import { createStackNavigator } from '@react-navigation/stack'
import ListaPessoa from './ListaPessoa'
import FormPessoa from './FormPessoa'


const Stack = createStackNavigator()

export default function StackPessoa() {
    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='ListaPessoas'
        >
            <Stack.Screen name='ListaPessoa' component={ListaPessoa} />

            <Stack.Screen name='FormPessoa' component={FormPessoa} />

        </Stack.Navigator>

    )
}
