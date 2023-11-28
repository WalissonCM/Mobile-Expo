import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import api from '../services/api'
import { FlatList } from 'react-native'
import { Avatar, Card, IconButton } from 'react-native-paper'



export default function Home(props) {

   const navigation = props.navigation
       
   const [usuarios, setUsuarios] = useState([])

    useEffect(() => {
      api.get('/users').then(resultado => {
        setUsuarios(resultado.data.users)
      })
    }, [])


    return (
        <View style={styles.container}>

        <Text style={{ fontSize: 30, marginTop: 50 }}>Usuarios</Text>


        <FlatList
            style={styles.listPessoas}
            data={usuarios}
            renderItem={({ item }) => {
              return (
                <Card onPress={() => {navigation.navigate('Usuario', {id: item.id})}}>
                  <Card.Title
                  title={item.username}
                  subtitle={item.email}
                  left={() => <Avatar.Image size={48} source={{ uri: item.image }} />}
                  right={() => <IconButton icon="chevron-right" />}
                  />
                </Card>
              )
            }}
            showsVerticalScrollIndicator={false}
        />

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    listPessoas: {
        width: '90%'
    }
})