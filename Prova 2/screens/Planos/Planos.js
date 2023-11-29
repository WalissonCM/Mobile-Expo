import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button, Card, Dialog, FAB, MD3Colors, Portal, Text } from 'react-native-paper'
import Toast from 'react-native-toast-message'


export default function Planos({ navigation }) {

  const [planos, setPlanos] = useState([])
  const [showModalExcluirUsuario, setShowModalExcluirUsuario] = useState(false)
  const [planoASerExcluida, setPlanoASerExcluida] = useState(null)


  useEffect(() => {
    loadPlanos()
  }, [])

  async function loadPlanos() {
    const response = await AsyncStorage.getItem('planos')
    const planosStorage = response ? JSON.parse(response) : []
    setPlanos(planosStorage)
  }


  const showModal = () => setShowModalExcluirUsuario(true);

  const hideModal = () => setShowModalExcluirUsuario(false);

  async function adicionarPlano(plano) {
    let novaListaPlanos = planos
    novaListaPlanos.push(plano)
    await AsyncStorage.setItem('planos', JSON.stringify(novaListaPlanos));
    setPlanos(novaListaPlanos)
  }

  async function editarPlano(planoAntiga, novosDados) {
   
    const novaListaPlanos = planos.map(plano => {
      if (plano == planoAntiga) {
        return novosDados
      } else {
        return plano
      }
    })

    await AsyncStorage.setItem('planos', JSON.stringify(novaListaPlanos))
    setPlanos(novaListaPlanos)

  }

  async function excluirPlano(plano) {
    const novaListaPlanos = planos.filter(p => p !== plano)
    await AsyncStorage.setItem('planos', JSON.stringify(novaListaPlanos))
    setPlanos(novaListaPlanos)
    Toast.show({
      type: 'success',
      text1: 'Plano excluida com sucesso!'
    })
  }

  function handleExluirPlano() {
    excluirPlano(planoASerExcluida)
    setPlanoASerExcluida(null)
    hideModal()
  }

  
  return (
    <View style={styles.container}>

      <Text variant='titleLarge' style={styles.title} >Lista de Planos</Text>

      <FlatList
        style={styles.list}
        data={planos}
        renderItem={({ item }) => (
          <Card
            mode='outlined'
            style={styles.card}
          >
            <Card.Content
              style={styles.cardContent}
            >
              <View style={{ flex: 1 }}>
                <Text variant='titleMedium'>{item?.nome}</Text>
                <Text variant='bodyLarge'>Idade: {item?.idade}</Text>
                <Text variant='bodyLarge'>Altura: {item?.altura} cm</Text>
                <Text variant='bodyLarge'>Peso: {item.peso} kg</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text variant='titleMedium'>IMC</Text>
                <Text variant='bodyLarge'>{getImc(item)}</Text>
              </View>


            </Card.Content>
            <Card.Actions>
              <Button onPress={() => {navigation.navigate('form-planos', { acao: editarPlano, plano: item })}}> 
                Editar
              </Button>
              <Button onPress={() => {
                setPlanoASerExcluida(item)
                showModal()
              }}>
                Excluir
              </Button>
            </Card.Actions>
          </Card>
        )}
      />

      
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('form-planos', { acao: adicionarPlano })}
      />


      
      <Portal>
        <Dialog visible={showModalExcluirUsuario} onDismiss={hideModal}>
          <Dialog.Title>Atenção!</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Tem certeza que deseja excluir este usuário?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideModal}>Voltar</Button>
            <Button onPress={handleExluirPlano}>Tenho Certeza</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    margin: 10
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  list: {
    width: '90%',
  },
  card: {
    marginTop: 15
  },
  cardContent: {
    flexDirection: 'row',
    backgroundColor: MD3Colors.primary80,
    borderWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 15
  }
})