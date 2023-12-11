import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import StackClientes from '../Clientes/StackClientes'
import StackEquipamentos from '../Equipamentos/StackEquipamentos'


const Drawer = createDrawerNavigator()

export default function DrawerRoutes() {
    return (
        <Drawer.Navigator initialRouteName='Cadastro'>
         <Drawer.Screen name="Cliente" component={StackClientes}/>
         <Drawer.Screen name="Equipamento" component={StackEquipamentos}/>
        </Drawer.Navigator>
    )
}