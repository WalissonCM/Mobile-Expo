import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from "@react-navigation/native";
import Profile from '../Profile';
import TabRoutes from './Tab.Routes';
import Citacoes from '../Citacoes';


const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName='Inicio'>

                <Drawer.Screen name='Inicio' component={TabRoutes} />

                <Drawer.Screen name='Profile' component={Profile} options={{ drawerLabel: 'Profile', headerTitle: 'Profile' }} />

                <Drawer.Screen name='Citacoes' component={Citacoes} />

            </Drawer.Navigator>
        </NavigationContainer>
    )
}