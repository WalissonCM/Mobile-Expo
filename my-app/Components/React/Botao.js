import { Alert, Button, StyleSheet, View } from 'react-native'
import React from 'react'

export default function Botao() {
  return (
    <View>
      <Button title="Aperte" onPress={() => Alert.alert('----')}/>
    </View>
  )
}

const styles = StyleSheet.create({})