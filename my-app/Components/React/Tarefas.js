import { FlatList, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { Card, IconButton, TextInput } from 'react-native-paper'
import { Text } from 'react-native';


export default function Tarefas() {
    const [tarefa, setTarefa] = useState('')
    const [tarefas, setTarefas] = useState([])
    const [editando, setEditando] = useState(false)
    const [tarefaEditada, setTarefaEditada] = useState('')
    const [showButton, setShowButton] = useState(false)

    const adicionarTarefa = () => {
      if (tarefa) {
        const novaTarefa = {
          id: Math.random().toString(),
          title: tarefa
        }
        setTarefas([...tarefas, novaTarefa])
        setTarefa('');
      }
    }
  
    const excluirTarefa = (tarefaId) => {
      const novalistaTarefa = tarefas.filter((tarefa) => tarefa.id !== tarefaId);
      setTarefas(novalistaTarefa);
    }

    const editandoTarefa = (tarefaId, tarefa) => {
      setEditando(true)
      setTarefaEditada(tarefaId) 
      setTarefa(tarefa)
      setShowButton(true)
    }

    const salvarTarefa = () => {
      const novasTarefas = tarefas.map((tarefa) => {
        if (tarefa.id === tarefaEditada) {
          return { ...tarefa, title: tarefa }
        }
        return tarefa
      })
      setTarefas(novasTarefas)
      setEditando(false)
      setTarefa('')
      setShowButton(false)   
    }

    return (


<View style={styles.container}>
        <Text style={styles.title}>Lista de Tarefas</Text>
      <View style={styles.input}>
        <TextInput style={styles.label}
          mode='outlined'
          placeholder="Digite uma tarefa"
          value={tarefa}
          onChangeText={(text) => setTarefa(text)}
        />
        {showButton && (<IconButton style={{position: 'absolute', right: 20,}} icon="check-bold" onPress={salvarTarefa} />)}
        <IconButton style={{right: -20}} icon="plus" mode="outlined" onPress={adicionarTarefa} />    
      </View>
      
      <FlatList
      style={styles.list}
      data={tarefas}
      renderItem={({ item }) => (
      <Card style={{marginTop: 10, padding: 10}}>
        <Card.Content style={styles.card}>
          <Text style={{ fontSize: 15, marginRight: 60 }}>{item.title}</Text>
          <IconButton style={{position: 'absolute', right: 25}} icon="pen" onPress= {() => editandoTarefa(item.id, item.title)}/>
          <IconButton style={{position: 'absolute', right: 0}} icon="delete" onPress={() => excluirTarefa(item.id)} />
        </Card.Content>
      </Card>
)}   
      keyExtractor={(item) => item.id}
    />
</View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      marginTop: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 20,
    },
    input: {
      flexDirection: 'row', 
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    label: {
        width: '70%',
        marginRight: 10,
    },
    card: {
        flexDirection: 'row',
    },
    list: {
        width: '95%',
        marginTop: 10,
        
    }
  });