import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import api from '../services/api'
import { FlatList } from 'react-native-gesture-handler'
import { Avatar, Card, IconButton } from 'react-native-paper'

export default function Restaurante({navigation}) {
    
    

    const [restaurantes, setRestaurantes] = useState([])

    useEffect(() => {
      api.get('/restaurantes').then(resultado => {
        setRestaurantes(resultado.data)
      })
    }, [])
  
    return (
        <View style={styles.container}>

        <FlatList
            data={restaurantes}
            renderItem={({ item }) => {
              return (
                <Card style={styles.card} mode='elevated' onPress={() => navigation.navigate('Detalhes',  item)}>
                  <Card.Title
                  title={item.nome}
                  titleStyle={{ fontWeight: 'bold' }}
                  subtitle={item.tipo_cozinha}
                  left={() => <Avatar.Image size={48} source={{ uri: item.imagem }} />}
                  right={() => <IconButton icon="arrow-right" size={20} />}
                  />
                </Card>
              )
            }}
            
        />

    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderWidth: 2,
    borderRadius: 10
  }
})