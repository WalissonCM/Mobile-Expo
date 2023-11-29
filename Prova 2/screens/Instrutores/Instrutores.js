import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button, Card, Dialog, FAB, MD3Colors, Portal, Text } from 'react-native-paper'
import Toast from 'react-native-toast-message'


export default function Instrutores({ navigation }) {

  const [instrutores, setInstrutores] = useState([])
  const [showModalExcluirUsuario, setShowModalExcluirUsuario] = useState(false)
  const [instrutorASerExcluida, setInstrutorASerExcluida] = useState(null)


  useEffect(() => {
    loadInstrutores()
  }, [])

  async function loadInstrutores() {
    const response = await AsyncStorage.getItem('instrutores')
    const instrutoresStorage = response ? JSON.parse(response) : []
    setInstrutores(instrutoresStorage)
  }


  const showModal = () => setShowModalExcluirUsuario(true);

  const hideModal = () => setShowModalExcluirUsuario(false);

  async function adicionarInstrutor(instrutor) {
    let novaListaInstrutores = instrutores
    novaListaInstrutores.push(instrutor)
    await AsyncStorage.setItem('instrutores', JSON.stringify(novaListaInstrutores));
    setInstrutores(novaListaInstrutores)
  }

  async function editarInstrutor(instrutorAntiga, novosDados) {
   
    const novaListaInstrutores = instrutores.map(instrutor => {
      if (instrutor == instrutorAntiga) {
        return novosDados
      } else {
        return instrutor
      }
    })

    await AsyncStorage.setItem('instrutores', JSON.stringify(novaListaInstrutores))
    setInstrutores(novaListaInstrutores)

  }

  async function excluirInstrutor(instrutor) {
    const novaListaInstrutores = instrutores.filter(p => p !== instrutor)
    await AsyncStorage.setItem('instrutores', JSON.stringify(novaListaInstrutores))
    setInstrutores(novaListaInstrutores)
    Toast.show({
      type: 'success',
      text1: 'Instrutor excluida com sucesso!'
    })
  }

  function handleExluirInstrutor() {
    excluirInstrutor(instrutorASerExcluida)
    setInstrutorASerExcluida(null)
    hideModal()
  }

  
  return (
    <View style={styles.container}>

      <Text variant='titleLarge' style={styles.title} >Lista de Instrutores</Text>

      <FlatList
        style={styles.list}
        data={instrutores}
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
              <Button onPress={() => {navigation.navigate('form-instrutores', {acao : editarInstrutor, instrutor: item })}}> 
                Editar
              </Button>
              <Button onPress={() => {
                setInstrutorASerExcluida(item)
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
        onPress={() => navigation.navigate('form-instrutores', {acao : adicionarInstrutor})}
      />


      
      <Portal>
        <Dialog visible={showModalExcluirUsuario} onDismiss={hideModal}>
          <Dialog.Title>Atenção!</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Tem certeza que deseja excluir este usuário?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideModal}>Voltar</Button>
            <Button onPress={handleExluirInstrutor}>Tenho Certeza</Button>
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