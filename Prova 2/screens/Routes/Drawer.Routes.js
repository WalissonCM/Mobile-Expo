import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import StackRoutes from './Stack.Routes'

const Drawer = createDrawerNavigator()

export default function DrawerRoutes() {
    return (
        <Drawer.Navigator initialRouteName='Cadastro'>
         <Drawer.Screen name="Cliente" component={StackRoutes}/>
        </Drawer.Navigator>
    )
}