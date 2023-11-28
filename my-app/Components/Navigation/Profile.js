import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Avatar, Card } from 'react-native-paper'

export default function Profile({ navigation, route }) {
    
    const usuarios = route.params

    return (
        <View style={styles.container}>
          <Card mode='elevated' style={styles.card}>
            <Card.Title
              title={usuarios.firstName + ' ' + usuarios.maidenName + ' ' + usuarios.lastName}
              titleStyle={{ fontWeight: 'bold', alignSelf: 'center' }}
              subtitle={usuarios.username}
              subtitleStyle={{ alignSelf: 'center' }}
              left={() => <Avatar.Image size={48} source={{ uri: usuarios.image }} />}
              />
          </Card>
        </View>
    )
}

const styles = StyleSheet.create({})