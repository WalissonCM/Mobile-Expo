import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Home from './Home'
import Carros from './Carros'


const Drawer = createDrawerNavigator()

export default function DrawerRoutes() {
    return (
        <Drawer.Navigator initialRouteName='Carros'>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Carros" component={Carros} />
        </Drawer.Navigator>

    )
}