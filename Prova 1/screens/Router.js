import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Restaurante from "../screens/Restaurante";
import Detalhes from "../screens/Detalhes";

const Stack = createStackNavigator();

export default function Router() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen name="Restaurante" component={Restaurante}/>
            <Stack.Screen name="Detalhes" component={Detalhes} />
            </Stack.Navigator>
        </NavigationContainer>
   
   )
}