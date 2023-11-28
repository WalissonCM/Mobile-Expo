import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import Clientes from '../Clientes/Clientes'
import Instrutores from '../Instrutores/Instrutores'
import Equipamentos from '../Equipamentos/Equipamentos'
import Fornecedores from '../Fornecedores/Fornecedores'
import Planos from '../Planos/Planos'

const Drawer = createDrawerNavigator()

export default function DrawerRoutes() {
    return (
        <Drawer.Navigator initialRouteName='Cadastro'>
         <Drawer.Screen name="Cliente" component={Clientes} />
         <Drawer.Screen name="Instrutores" component={Instrutores} />
         <Drawer.Screen name="Equipamentos" component={Equipamentos} />
         <Drawer.Screen name="Fornecedores" component={Fornecedores} />
         <Drawer.Screen name="Planos" component={Planos} />
        </Drawer.Navigator>

    )
}