import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import api from '../services/api'
import { Avatar, Card, IconButton } from 'react-native-paper'
import { FlatList } from 'react-native-gesture-handler'
export default function Post(props) {
  
    const navigation = props.navigation
    const usuario = props.route.params
    const[poste, setposte] = useState([])

    useEffect(() => {
        api.get(`/users/`+ usuario.id + '/posts/').then(resultado => {
            setposte(resultado.data.posts)
        })
    }, [])
  
    return (
        <View>
                    <Card onPress={ ()=>{navigation.navigate('Postes', usuario)}}>
                        <Card.Title
                            title={usuario?.username}
                            subtitle={usuario?.email}
                            left={() => <Avatar.Image size={48} source={{ uri: usuario.image }} />}
                            right={() => <IconButton  icon='chevron-right'/>}
                        />

                        <Card.Content>
                            <FlatList
                            data={poste}
                            renderItem={({item}) =>{
                                return(
                                    <View>
                                    <Text variant='titleLarge'>{item.title}</Text>
                                    <Text>{item.body}</Text>
                                    </View>
                                )
                            }}/>
                        </Card.Content>
                    </Card>
    </View>
  )
}

const styles = StyleSheet.create({})