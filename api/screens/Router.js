import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import Post from "./Post";
import Usuario from "./Usuario";

const Stack = createStackNavigator();

export default function Router() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
            <Stack.Screen name="Usuario" component={Usuario} />
            <Stack.Screen name="Post" component={Post} />
            </Stack.Navigator>
        </NavigationContainer>
   
   )
}