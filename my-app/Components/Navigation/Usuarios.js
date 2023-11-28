import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Avatar, Card } from 'react-native-paper'
import Api from '../../service/api'

export default function Usuarios({ navigation }) {
   
    const [usuarios, setUsuarios] = useState([])

    useEffect(() => {
        Api.get('/users')
        .then((response) => {
            setUsuarios(response.data.users)
        })
    }, [])
   
    return (
      <View>
      <FlatList
        data={usuarios}
        renderItem={({ item }) => (
          <Card mode='elevated' style={styles.card}
            onPress={() => navigation.navigate('Profile', item)}>
            <Card.Title
              title={item.firstName + ' ' + item.maidenName + ' ' + item.lastName}
              subtitle={item.username}
              left={() => <Avatar.Image size={48} source={{ uri: item.image }} />}
            />
          </Card>
        )}
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