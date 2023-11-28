import { createStackNavigator } from "@react-navigation/stack"
import Configuracoes from "../Configuracoes";
import Profile from "../Profile";
import TabRoutes from "./Tab.Routes";

const Stack = createStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Inicio" component={TabRoutes} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Configuração" component={Configuracoes} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})