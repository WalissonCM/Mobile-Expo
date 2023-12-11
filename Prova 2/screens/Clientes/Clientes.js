import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button, Card, Dialog, FAB, Portal, Text } from 'react-native-paper'
import Toast from 'react-native-toast-message'


export default function Clientes({ navigation}) {

  const [clientes, setClientes] = useState([])
  const [showModalExcluirUsuario, setShowModalExcluirUsuario] = useState(false)
  const [clienteASerExcluida, setClienteASerExcluida] = useState(null)


  useEffect(() => {
    loadClientes()
  }, [])

  async function loadClientes() {
    const response = await AsyncStorage.getItem('clientes')
    const clientesStorage = response ? JSON.parse(response) : []
    setClientes(clientesStorage)
  }


  const showModal = () => setShowModalExcluirUsuario(true);

  const hideModal = () => setShowModalExcluirUsuario(false);

  async function adicionarCliente(cliente) {
    let novaListaClientes = clientes
    novaListaClientes.push(cliente)
    await AsyncStorage.setItem('clientes', JSON.stringify(novaListaClientes));
    setClientes(novaListaClientes)
  }

  async function editarCliente(clienteAntiga, novosDados) {
   
    const novaListaClientes = clientes.map(cliente => {
      if (cliente == clienteAntiga) {
        return novosDados
      } else {
        return cliente
      }
    })

    await AsyncStorage.setItem('clientes', JSON.stringify(novaListaClientes))
    setClientes(novaListaClientes)

  }

  async function excluirCliente(cliente) {
    const novaListaClientes = clientes.filter(p => p !== cliente)
    await AsyncStorage.setItem('clientes', JSON.stringify(novaListaClientes))
    setClientes(novaListaClientes)
    Toast.show({
      type: 'success',
      text1: 'Cliente excluida com sucesso!'
    })
  }

  function handleExluirCliente() {
    excluirCliente(clienteASerExcluida)
    setClienteASerExcluida(null)
    hideModal()
  }

  
  return (
    <View style={styles.container}>

      <Text variant='titleLarge' style={styles.title} >Lista de Clientes</Text>

      <FlatList
        style={styles.list}
        data={clientes}
        renderItem={({ item }) => (
          <Card
            mode='outlined'
            style={styles.card}
          >
            <Card.Content
              style={styles.cardContent}
            >
              <View style={{ flex: 1 }}>
                <Text style={{color:'white'}} variant='titleLarge'>{item?.nome}</Text>
                <Text style={{color:'white'}} variant='bodyLarge'>Cpf: {item?.cpf}</Text>
                <Text style={{color:'white'}} variant='bodyLarge'>Telefone: {item?.telefone}</Text>
              </View>

            </Card.Content>
            <Card.Actions>
              <Button textColor='black' onPress={() => navigation.push('form-clientes', { acao: editarCliente, cliente: item })}>
                Editar 
              </Button>
              <Button style={{ backgroundColor: 'red'}} onPress={() => {
                setClienteASerExcluida(item)
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
        color='white'
        theme={{ colors: { primaryContainer:'#000'} }}
        style={styles.fab}
        onPress={() => navigation.push('form-clientes', { acao: adicionarCliente })}
      />

      <Portal>
        <Dialog visible={showModalExcluirUsuario} onDismiss={hideModal}>
          <Dialog.Title>Atenção!</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Tem certeza que deseja excluir este usuário?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideModal}>Voltar</Button>
            <Button onPress={handleExluirCliente}>Tenho Certeza</Button>
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
    backgroundColor: '#808080',
    borderWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 15
  }
})