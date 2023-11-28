import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Card, IconButton } from 'react-native-paper';
import api from '../services/api';



export default function Usuario(props) {
     
    const navigation = props.navigation
    const[usuario, setUsuarios] = useState([])
    const usuarioId = props.route.params.id
    

    useEffect(() => {
        
        api.get(`/users/`+ usuarioId).then(resultado => {
            setUsuarios(resultado.data)
        })
    }, [])

    return (
        <View>
            <Card onPress={ ()=>{navigation.navigate('Post', usuario)}}>
            <Card.Title
                            title={usuario?.username}
                            subtitle={usuario?.email}
                            left={() => <Avatar.Image size={48} source={{ uri: usuario.image }} />}
                            right={() => <IconButton  icon='chevron-right'/>}
                        />
                        <Card.Cover source={{uri:usuario?.image}}></Card.Cover>
                </Card>    
        </View>
    )
}

const styles = StyleSheet.create({});
        
    