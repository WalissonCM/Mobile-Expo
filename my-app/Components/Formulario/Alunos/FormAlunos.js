import { Formik } from 'formik'
import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import Toast from 'react-native-toast-message'

export default function FormAlunos({ navigation, route }) {

    const { acao, aluno: alunoAntigo } = route.params

    useEffect(() => {

        if (alunoAntigo) {
            setNome(alunoAntigo.nome)
            setMatricula(alunoAntigo.matricula)
            setTurno(alunoAntigo.turno )
            setCurso(alunoAntigo.curso)
        }

    }, [])

    function salvar(novoAluno) {

        if (alunoAntigo) {
            acao(alunoAntigo, novoAluno)
        } else {
            acao(novoAluno)
        }

        Toast.show({
            type: 'success',
            text1: 'Aluno salvo com sucesso!'
        })

        navigation.goBack()
    }

  return (
    <View style={styles.container}>

            <Text variant='titleLarge' style={styles.title} >{alunoAntigo ? 'Editar Aluno' : 'Adicionar Aluno'}</Text>


            <Formik
                initialValues={{
                    nome: '',
                    matricula: '',
                    turno: '',
                    curso: ''
                }}
                
                onSubmit={values => salvar(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <>

                        <View style={styles.inputContainer}>


                            <TextInput
                                style={styles.input}
                                mode='outlined'
                                label='Nome'
                                value={values.nome}
                                onChangeText={handleChange('nome')}
                                onBlur={handleBlur('nome')}  
                            />

                            <TextInput
                                style={styles.input}
                                mode='outlined'
                                label='Matrícula'
                                value={values.matricula}
                                onChangeText={handleChange('matricula')}
                                onBlur={handleBlur('matricula')}
                            />

                            <TextInput
                                style={styles.input}
                                mode='outlined'
                                label='Turno'
                                value={values.turno}
                                onChangeText={handleChange('turno')}
                                onBlur={handleBlur('turno')}
                            />

                            <TextInput
                                style={styles.input}
                                mode='outlined'
                                label='Curso'
                                value={values.curso}
                                onChangeText={handleChange('curso')}
                                onBlur={handleBlur('curso')}
                            />

                        </View>
                        <View style={styles.buttonContainer}>

                            <Button
                                style={styles.button}
                                mode='contained-tonal'
                                onPress={() => navigation.goBack()}
                            >
                                Voltar
                            </Button>

                            <Button
                                style={styles.button}
                                mode='contained'
                                onPress={handleSubmit}
                            >
                                Salvar
                            </Button>

                        </View>

                    </>

                )}
            </Formik>


        </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    title: {
        fontWeight: 'bold',
        margin: 10
    },
    inputContainer: {
        width: '90%',
        flex: 1
    },
    input: {
        margin: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '90%',
        gap: 10,
        marginBottom: 10
    },
    button: {
        flex: 1
    }
})
