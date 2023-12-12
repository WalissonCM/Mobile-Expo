import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button, Card, Dialog, FAB, Portal, Text } from 'react-native-paper'
import Toast from 'react-native-toast-message'


export default function Produtos({ navigation}) {

  const [produtos, setProdutos] = useState([])
  const [showModalExcluir, setShowModalExcluir] = useState(false)
  const [produtoASerExcluido, setProdutoASerExcluido] = useState(null)


  useEffect(() => {
    loadProdutos()
  }, [])

  async function loadProdutos() {
    const response = await AsyncStorage.getItem('produtos')
    const produtosStorage = response ? JSON.parse(response) : []
    setProdutos(produtosStorage)
  }


  const showModal = () => setShowModalExcluir(true);

  const hideModal = () => setShowModalExcluir(false);

  async function adicionarProduto(produto) {
    let novaListaProdutos = produtos
    novaListaProdutos.push(produto)
    await AsyncStorage.setItem('produtos', JSON.stringify(novaListaProdutos));
    setProdutos(novaListaProdutos)
  }

  async function editarProduto(produtoAntigo, novosDados) {
   
    const novaListaProdutos = produtos.map(produto => {
      if (produto == produtoAntigo) {
        return novosDados
      } else {
        return produto
      }
    })

    await AsyncStorage.setItem('produtos', JSON.stringify(novaListaProdutos))
    setProdutos(novaListaProdutos)

  }

  async function excluirProduto(produto) {
    const novaListaProdutos = produtos.filter(p => p !== produto)
    await AsyncStorage.setItem('produtos', JSON.stringify(novaListaProdutos))
    setProdutos(novaListaProdutos)
    Toast.show({
      type: 'success',
      text1: 'Produto excluido com sucesso!'
    })
  }

  function handleExluirProduto() {
    excluirProduto(produtoASerExcluido)
    setProdutoASerExcluido(null)
    hideModal()
  }

  
  return (
    <View style={styles.container}>

      <Text variant='titleLarge' style={styles.title} >Lista de Produtos</Text>

      <FlatList
        style={styles.list}
        data={produtos}
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
                <Text style={{color:'white'}} variant='bodyLarge'>Data de Validade: {item?.data}</Text>
                <Text style={{color:'white'}} variant='bodyLarge'>Descricao: {item?.descricao}</Text>
                <Text style={{color:'white'}} variant='bodyLarge'>Tipo: {item?.tipo}</Text>
              </View>

            </Card.Content>
            <Card.Actions>
              <Button textColor='black' onPress={() => navigation.push('form-produtos', { acao: editarProduto, produto: item })}>
                Editar 
              </Button>
              <Button style={{ backgroundColor: 'red'}} onPress={() => {
                setProdutoASerExcluido(item)
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
        onPress={() => navigation.push('form-produtos', { acao: adicionarProduto })}
      />

      <Portal>
        <Dialog visible={showModalExcluir} onDismiss={hideModal}>
          <Dialog.Title>Atenção!</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Tem certeza que deseja excluir este produto?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideModal}>Voltar</Button>
            <Button onPress={handleExluirProduto}>Sim</Button>
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
    margin: 50
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