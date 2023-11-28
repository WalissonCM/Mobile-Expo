import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Filho from './Filho'


export default function Pai() {

    const [numero,setNumero] = useState(0)

    function alterarNumero(valor) {
        setNumero(valor)
    }

  return (
    <View>
      <Text>O numero aleatorio é?</Text>
      <Text>{numero}</Text>

      <Filho min={1} max={50} funcao={alterarNumero}/>
    </View>
  )
}

const styles = StyleSheet.create({})