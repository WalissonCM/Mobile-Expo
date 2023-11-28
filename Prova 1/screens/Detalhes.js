import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import api from '../services/api'
import { Card, Divider } from 'react-native-paper'
import { FlatList, ScrollView } from 'react-native-gesture-handler'

export default function Detalhes({navigation, route}) {

    const restaurante = route.params
    const [pratos, setPratos] = useState([])
    const [bebidas, setBebidas] = useState([])
    
    
    useEffect(() => {
        api.get('pratos?restaurante_id=' + restaurante.id).then(resultado => {
            setPratos(resultado.data)
        })
      }, [])

      useEffect(() => {
        api.get('bebidas?restaurante_id=' + restaurante.id).then(resultado => {
            setBebidas(resultado.data)
        })
      }, [])


  return (
    <ScrollView>
    
    <Text variant='titleLarge' style={{ fontWeight: 'bold', textAlign: 'center', paddingTop: 10 }}>Restaurante</Text>

       <Card style={styles.card}  mode='elevated'>
         
         <Card.Title  style={{ margin: 5 }}
          title={restaurante.nome}
          titleStyle={{ fontWeight: 'bold' }}
          subtitle={restaurante.descricao}
          subtitleNumberOfLines={2} />
         
         <Card.Cover source={{ uri: restaurante.imagem }} style={{margin:12}} />       
        
                <Card.Content>
                    <View style={styles.labelArea}>
                        <Text variant='bodyMedium' style={{ fontWeight: 'bold' }}>Nome:</Text>
                        <Text variant='bodyMedium' >{restaurante.nome}</Text>
                    </View>
                    <View style={styles.labelArea}>
                        <Text variant='bodyMedium' style={{ fontWeight: 'bold' }}>Tipo de Cozinha:</Text>
                        <Text variant='bodyMedium' >{restaurante.tipo_cozinha}</Text>
                    </View>
                    <View style={styles.labelArea}>
                        <Text variant='bodyMedium' style={{ fontWeight: 'bold' }}>Endereço:</Text>
                    </View>   
                    <View style={styles.labelArea}>
                         <Text variant="bodyMedium">{restaurante.endereco}</Text>
                    </View>             
                    <View>
                        <Text variant='bodyMedium' style={{ fontWeight: 'bold' }}>Horario de Funcionamento:</Text>
                    </View>
                    <View style={styles.labelArea}>
                        <Text variant="bodyMedium">{restaurante.horario_funcionamento}</Text>
                    </View>
                </Card.Content>
         </Card>
           
         <Text variant='titleLarge' style={{ fontWeight: 'bold', textAlign: 'center', paddingTop: 10 }}>Cardapio</Text>

         <Card style={styles.card}  mode='elevated'>
         
         <Card.Content> 
         
         <Text variant='bodyMedium' style={{ fontWeight: 'bold', textAlign: 'center' }}>Pratos</Text>

         <FlatList
            data={pratos}
            renderItem={({ item }) => (
              <View style={styles.labelArea}>
                <Text variant="bodyMedium">{item.nome}</Text>
                <Text variant="bodyMedium">R$ {item.preco}</Text>
              </View>
            )}
          />

          <Divider />

          <Text variant='bodyMedium' style={{ fontWeight: 'bold', textAlign: 'center', paddingTop: 10 }}>Bebidas</Text>

          <FlatList
            data={bebidas}
            renderItem={({ item }) => (
              <View style={styles.labelArea}>
                <Text variant="bodyMedium">{item.nome}</Text>
                <Text variant="bodyMedium">R$ {item.preco}</Text>
              </View>
            )}
          />
         </Card.Content>
         </Card>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    card: {
        margin: 10,
        borderWidth: 2,
        borderRadius: 10
      },
      labelArea: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }
})