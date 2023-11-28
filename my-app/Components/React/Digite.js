import { Button, StyleSheet, Text, TextInput, View} from 'react-native'
import React from 'react'

export default function Digite() {

    const [nome, setNome] = React.useState()
    const [valorDigitado, setValorDigitado] = React.useState('')

  return (
    <View>
      <Text>Digite seu Nome</Text>
      <Text>{nome}</Text>
      <TextInput style={styles.input} textAlign='center' placeholder='digite' onChangeText={(e) => setValorDigitado(e)}/>
      <Button title='Enviar' onPress={() => setNome(valorDigitado)}/>
    </View>
  )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 3,
        margin: 10,
        width:100
    },
    
})