import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

export default function Contador() {
    
    const [valor, setValor] = useState (0)

    function incrementar() {
        setValor (valor + 1)
    } 
    function decrementar() {
        setValor (valor - 1)
    }
  
    return (
    <View>
      <Text>Volume</Text>
      <Text>{valor}</Text>
      <Button title='+ incrementar' onPress={incrementar}/>
      <Button title='- decrementar' onPress={decrementar}/>
    </View>
      
    
  )
}

const styles = StyleSheet.create({})

