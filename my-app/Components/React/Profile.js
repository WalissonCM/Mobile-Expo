import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Profile() {
  
    const pessoa = {
        imgUri: 'https://www.fakepersongenerator.com/Face/male/male1084931492767.jpg',
        genero: 'Masculino',
        nome: 'Robert P Ryan',
        email: 'robert.p@gmail.com',
        telefone: '518-289-9666',
        data: '1/2/1974 (49 anos)'

    }
    
    return (
        
        <View style={styles.container}>
        
        <Image source={{ uri: pessoa.imgUri }} style={styles.img}/>

            {
                (pessoa && pessoa.nome) && (
                    <View style={styles.labelContainer}>
                        <Text style={[styles.texto, styles.textoLabel]}>Nome:</Text>
                        <Text style={styles.texto}>{pessoa.nome}</Text>
                    </View>
                )
            }

            <View style={styles.labelContainer}>
                <Text style={[styles.texto, styles.textoLabel]}>Telefone:</Text>
                <Text style={styles.texto}>{pessoa.telefone}</Text>
            </View>

            <View style={styles.labelContainer}>
                <Text style={[styles.texto, styles.textoLabel]}>Email:</Text>
                <Text style={styles.texto}>{pessoa.email}</Text>
            </View>

            <View style={styles.labelContainer}>
                <Text style={[styles.texto, styles.textoLabel]}>Data de Nascimento:</Text>
                <Text style={styles.texto}>{pessoa.data}</Text>
            </View>
        
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        backgroundColor: 'white',
        
    }, img: {
        width: 250,
        height: 250,
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 500,
        alignSelf: 'center',
        marginTop: 70
        
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        padding: 10,
        
        
    },
    texto: {
        fontSize: 19
    },
    textoLabel: {
        color: 'gray',
        fontWeight: 'bold'
    }
})
