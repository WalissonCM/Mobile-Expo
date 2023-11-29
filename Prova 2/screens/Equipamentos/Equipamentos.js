import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button, Card, Dialog, FAB, MD3Colors, Portal, Text } from 'react-native-paper'
import Toast from 'react-native-toast-message'


export default function Equipamentos({ navigation }) {

  const [equipamentos, setEquipamentos] = useState([])
  const [showModalExcluirUsuario, setShowModalExcluirUsuario] = useState(false)
  const [equipamentoASerExcluida, setEquipamentoASerExcluida] = useState(null)


  useEffect(() => {
    loadEquipamentos()
  }, [])

  async function loadEquipamentos() {
    const response = await AsyncStorage.getItem('equipamentos')
    const equipamentosStorage = response ? JSON.parse(response) : []
    setEquipamentos(equipamentosStorage)
  }


  const showModal = () => setShowModalExcluirUsuario(true);

  const hideModal = () => setShowModalExcluirUsuario(false);

  async function adicionarEquipamento(equipamento) {
    let novaListaEquipamentos = equipamentos
    novaListaEquipamentos.push(equipamento)
    await AsyncStorage.setItem('equipamentos', JSON.stringify(novaListaEquipamentos));
    setEquipamentos(novaListaEquipamentos)
  }

  async function editarEquipamento(equipamentoAntiga, novosDados) {
   
    const novaListaEquipamentos = equipamentos.map(equipamento => {
      if (equipamento == equipamentoAntiga) {
        return novosDados
      } else {
        return equipamento
      }
    })

    await AsyncStorage.setItem('equipamentos', JSON.stringify(novaListaEquipamentos))
    setEquipamentos(novaListaEquipamentos)

  }

  async function excluirEquipamento(equipamento) {
    const novaListaEquipamentos = equipamentos.filter(p => p !== equipamento)
    await AsyncStorage.setItem('equipamentos', JSON.stringify(novaListaEquipamentos))
    setEquipamentos(novaListaEquipamentos)
    Toast.show({
      type: 'success',
      text1: 'Equipamento excluida com sucesso!'
    })
  }

  function handleExluirEquipamento() {
    excluirEquipamento(equipamentoASerExcluida)
    setEquipamentoASerExcluida(null)
    hideModal()
  }

  
  return (
    <View style={styles.container}>

      <Text variant='titleLarge' style={styles.title} >Lista de Equipamentos</Text>

      <FlatList
        style={styles.list}
        data={equipamentos}
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
              <Button onPress={() => {navigation.navigate('form-equipamentos', { acao: editarEquipamento, equipamento: item })}}> 
                Editar
              </Button>
              <Button onPress={() => {
                setEquipamentoASerExcluida(item)
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
        onPress={() => navigation.navigate('form-equipamentos', { acao: adicionarEquipamento })}
      />


      
      <Portal>
        <Dialog visible={showModalExcluirUsuario} onDismiss={hideModal}>
          <Dialog.Title>Atenção!</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Tem certeza que deseja excluir este usuário?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideModal}>Voltar</Button>
            <Button onPress={handleExluirEquipamento}>Tenho Certeza</Button>
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