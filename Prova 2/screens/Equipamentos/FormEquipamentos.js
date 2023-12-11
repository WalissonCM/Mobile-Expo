import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import { Button, Text, TextInput } from 'react-native-paper'
import Toast from 'react-native-toast-message'
import * as Yup from 'yup'


export default function FormEquipamentos({ navigation, route }) {

   

    const { acao, equipamento: equipamentoAntiga } = route.params
    const [nome, setNome] = useState('')
    const [tipo, setTipo] = useState('')
    const [data, setData ] = useState('')

    const validationSchema = Yup.object().shape({
        nome: Yup.string().required('Campo obrigatório!'),
        tipo: Yup.string().required('Campo obrigatório!'),
        data: Yup.string().required('Campo obrigatório!'),
    })

    useEffect(() => {

        if (equipamentoAntiga) {
            setNome(equipamentoAntiga.nome)
            setTipo(equipamentoAntiga.tipo)
            setData(equipamentoAntiga.data)
        }

    }, [])


    function salvar(novaEquipamento) {

        if (equipamentoAntiga) {
            acao(equipamentoAntiga, novaEquipamento)
        } else {
            acao(novaEquipamento)
        }

        Toast.show({
            type: 'success',
            text1: 'Equipamento salva com sucesso!'
        })

        navigation.goBack()
    }


    return (
        <View style={styles.container}>

            <Text variant='titleLarge' style={styles.title} >{equipamentoAntiga ? 'Editar Equipamento' : 'Adicionar Equipamento'}</Text>


            <Formik
                initialValues={{
                    nome: '' || equipamentoAntiga?.nome,
                    tipo: '' || equipamentoAntiga?.tipo,
                    data: '' || equipamentoAntiga?.data,
                }}
                validationSchema={validationSchema}
                onSubmit={values => salvar(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, touched, errors, values }) => (
                    <>

                        <View style={styles.inputContainer}>

                            
                           <TextInput
                                style={styles.input}
                                mode='outlined'
                                label='Nome'
                                value={values.nome}
                                onChangeText={handleChange('nome')}
                                onBlur={handleBlur('nome')}
                                error={touched.nome && errors.nome}
                             />
                            
                            {(touched.nome && errors.nome) && <Text style={{ color: 'red' }}>{errors.nome}</Text>}

                            
                           <TextInput
                                style={styles.input}
                                mode='outlined'
                                label='Tipo'
                                value={values.tipo}
                                onChangeText={handleChange('tipo')}
                                onBlur={handleBlur('tipo')}
                                error={touched.tipo && errors.tipo}
                             />
                            
                            {(touched.tipo && errors.tipo) && <Text style={{ color: 'red' }}>{errors.tipo}</Text>}

                            <TextInput
                                style={styles.input}
                                mode='outlined'
                                label='Data'
                                value={values.data}
                                onChangeText={handleChange('data')}
                                onBlur={handleBlur('data')}
                                error={touched.data && errors.data}
                                keyboardType='numeric'
                                render={props => <TextInputMask {...props} type={'datetime'} />}
                                    
                
                             />
                            
                            {(touched.data && errors.data) && <Text style={{ color: 'red' }}>{errors.data}</Text>}



                        </View>
                        <View style={styles.buttonContainer}>

                            <Button
                                style={styles.button}
                                mode='outlined'
                                textColor='black'
                                onPress={() => navigation.goBack()}
                            >
                                Voltar
                            </Button>

                            <Button
                                style={styles.button}
                                buttonColor='#65b307'
                                textColor='white'
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
        alignItems: 'center'
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