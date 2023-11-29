import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button, Card, Dialog, FAB, MD3Colors, Portal, Text } from 'react-native-paper'
import Toast from 'react-native-toast-message'


export default function Fornecedores({ navigation }) {

  const [fornecedores, setFornecedores] = useState([])
  const [showModalExcluirUsuario, setShowModalExcluirUsuario] = useState(false)
  const [fornecedorASerExcluida, setFornecedorASerExcluida] = useState(null)


  useEffect(() => {
    loadFornecedores()
  }, [])

  async function loadFornecedores() {
    const response = await AsyncStorage.getItem('fornecedores')
    const fornecedoresStorage = response ? JSON.parse(response) : []
    setFornecedores(fornecedoresStorage)
  }


  const showModal = () => setShowModalExcluirUsuario(true);

  const hideModal = () => setShowModalExcluirUsuario(false);

  async function adicionarFornecedor(fornecedor) {
    let novaListaFornecedores = fornecedores
    novaListaFornecedores.push(fornecedor)
    await AsyncStorage.setItem('fornecedores', JSON.stringify(novaListaFornecedores));
    setFornecedores(novaListaFornecedores)
  }

  async function editarFornecedor(fornecedorAntiga, novosDados) {
   
    const novaListaFornecedores = fornecedores.map(fornecedor => {
      if (fornecedor == fornecedorAntiga) {
        return novosDados
      } else {
        return fornecedor
      }
    })

    await AsyncStorage.setItem('fornecedores', JSON.stringify(novaListaFornecedores))
    setFornecedores(novaListaFornecedores)

  }

  async function excluirFornecedor(fornecedor) {
    const novaListaFornecedores = fornecedores.filter(p => p !== fornecedor)
    await AsyncStorage.setItem('fornecedores', JSON.stringify(novaListaFornecedores))
    setFornecedores(novaListaFornecedores)
    Toast.show({
      type: 'success',
      text1: 'Fornecedor excluida com sucesso!'
    })
  }

  function handleExluirFornecedor() {
    excluirFornecedor(fornecedorASerExcluida)
    setFornecedorASerExcluida(null)
    hideModal()
  }

  
  return (
    <View style={styles.container}>

      <Text variant='titleLarge' style={styles.title} >Lista de Fornecedores</Text>

      <FlatList
        style={styles.list}
        data={fornecedores}
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
              <Button onPress={() => {navigation.navigate('form-fornecedores', {acao : editarFornecedor, fornecedor: item })}}> 
                Editar
              </Button>
              <Button onPress={() => {
                setFornecedorASerExcluida(item)
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
        onPress={() => navigation.navigate('form-fornecedores', {acao : adicionarFornecedor})}
      />


      
      <Portal>
        <Dialog visible={showModalExcluirUsuario} onDismiss={hideModal}>
          <Dialog.Title>Atenção!</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Tem certeza que deseja excluir este usuário?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideModal}>Voltar</Button>
            <Button onPress={handleExluirFornecedor}>Tenho Certeza</Button>
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